import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export default async function Home() {
  // Verifica se o usuário está autenticado
  const session = await getServerSession(authOptions);
  
  // Redireciona para o dashboard se estiver autenticado, ou para o login se não estiver
  if (session) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
  
  // Este return nunca será executado devido ao redirecionamento,
  // mas é necessário para satisfazer o TypeScript
  return null;
}
