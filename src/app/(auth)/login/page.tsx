"use client";

import React, { useState, FormEvent, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, TextField, Container, Typography, Box, CircularProgress, Alert } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";

// Componente separado para o formulário de login
function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("cliente@engecare.com");
  const [password, setPassword] = useState("senha123");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Validação de campos
  const validateFields = (): boolean => {
    let isValid = true;
    
    // Validar email
    if (!email) {
      setEmailError("O e-mail é obrigatório");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Digite um e-mail válido");
      isValid = false;
    } else {
      setEmailError(null);
    }
    
    // Validar senha
    if (!password) {
      setPasswordError("A senha é obrigatória");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres");
      isValid = false;
    } else {
      setPasswordError(null);
    }
    
    return isValid;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    // Validar campos antes de enviar
    if (!validateFields()) {
      return;
    }
    
    setLoading(true);
    setLoginError(null);
    
    console.log("Tentando login com:", { email, password });

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/dashboard",
      });

      console.log("Resultado do login:", result);

      if (result?.error) {
        setLoginError("E-mail ou senha inválidos. Tente novamente.");
        console.error("Erro de login:", result.error);
      } else if (result?.url) {
        console.log("Login bem-sucedido, redirecionando para:", result.url);
        router.push(result.url);
      } else {
        console.log("Login bem-sucedido, redirecionando para dashboard");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Erro ao tentar login:", error);
      setLoginError("Erro ao tentar login. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
      {loginError && (
        <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
          {loginError}
        </Alert>
      )}
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Endereço de E-mail"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Senha"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        error={!!passwordError}
        helperText={passwordError}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
      </Button>
    </Box>
  );
}

// Componente de fallback para o Suspense
function LoginFormFallback() {
  return (
    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  );
}

export default function LoginPage() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Acessar Portal Engecare
        </Typography>
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
      </Box>
    </Container>
  );
}
