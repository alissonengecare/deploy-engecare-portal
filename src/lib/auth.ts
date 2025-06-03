import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Dados mockados de usuários
const users = [
  {
    id: "1",
    name: "Administrador",
    email: "admin@engecare.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "2",
    name: "Cliente",
    email: "cliente@engecare.com",
    password: "senha123",
    role: "client",
  },
  {
    id: "3",
    name: "Gerente de Projeto",
    email: "gerente@engecare.com",
    password: "gerente123",
    role: "manager",
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Verificar credenciais com os dados mockados
        const user = users.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password
        );

        if (!user) {
          console.log("Credenciais inválidas:", credentials.email);
          return null;
        }

        console.log("Usuário autenticado:", user.email, "com perfil:", user.role);
        
        // Retornar o usuário sem a senha
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Adicionar role ao token JWT
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Adicionar role à sessão
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  secret: process.env.NEXTAUTH_SECRET || "seu-segredo-aqui",
  debug: process.env.NODE_ENV === "development",
};

// Estender os tipos para incluir role
declare module "next-auth" {
  interface User {
    role?: string;
    id: string;
  }
  
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    id: string;
  }
}
