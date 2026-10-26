import { Link } from "react-router-dom";

export default function AuthLayout({ title, subtitle, footer, children }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 block text-center text-2xl font-bold">
          Meet<span className="text-terracotta">Sphere</span>
        </Link>

        <div className="rounded-2xl border border-sand bg-surface p-8 shadow-sm">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-1 text-muted">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>

        <p className="mt-6 text-center text-sm text-muted">{footer}</p>
      </div>
    </main>
  );
}