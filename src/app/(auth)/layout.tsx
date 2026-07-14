export default function AuthLayout({ children }: { children: React.ReactNode;  }) {
  return (
    <main className="relative flex w-full items-center justify-center bg-web-bg">
      <div className="flex w-full flex-col md:max-w-md">
        {children}
      </div>
    </main>
  );
}
