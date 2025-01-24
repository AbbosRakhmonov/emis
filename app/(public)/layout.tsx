import AuthLayout from '@/src/shared/layouts/auth';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
