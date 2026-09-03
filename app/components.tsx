export function Fixture({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px" }}>
      {children}
    </main>
  );
}

export function CategoryHeader({
  title,
  ruleCount,
}: {
  title: string;
  ruleCount: number;
}) {
  return (
    <header style={{ marginBottom: 24 }}>
      <p style={{ fontSize: 13, color: "#666" }}>
        Broken Fixture Co — QA test fixture. This page violates {ruleCount}{" "}
        rule(s) in this category. See the full list at{" "}
        <a href="/rules">/rules</a>.
      </p>
      <h1>{title}</h1>
    </header>
  );
}
