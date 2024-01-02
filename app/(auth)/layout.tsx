export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex h-screen">
        <section className="md:flex-1 "></section>
        <section className="flex flex-1 items-center justify-center">
          {children}
        </section>
      </main>
    </>
  );
}
