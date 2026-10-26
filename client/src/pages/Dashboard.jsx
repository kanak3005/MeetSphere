import Button from "../components/Button";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-coral">
        Dashboard
      </p>
      <h1 className="mt-1 text-3xl font-bold">Hi, {user.name}</h1>
      <p className="mt-2 text-muted">{user.email}</p>

      <div className="mt-8 rounded-2xl border border-sand bg-surface p-6">
        <p>
          Auth kaam kar raha hai. Asli dashboard (sidebar, meeting cards, create/join
          meeting) Frontend Foundation phase mein banega.
        </p>
      </div>

      <Button variant="secondary" onClick={logout} className="mt-6">
        Log out
      </Button>
    </main>
  );
}