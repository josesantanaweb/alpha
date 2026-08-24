export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-web-bg relative flex w-full items-center justify-center">
      <div className="flex w-full flex-col md:max-w-md">{children}</div>
    </main>
  );
}
