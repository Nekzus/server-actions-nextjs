interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div className="grid min-h-screen place-items-center">{children}</div>;
};
export default AuthLayout;
