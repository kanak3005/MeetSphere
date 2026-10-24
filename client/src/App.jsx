import { useEffect, useState } from "react";
import api from "./api/axios";
import { socket } from "./socket/socket";

function StatusRow({ label, ok, detail }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-ivory px-4 py-3">
      <span className="font-medium">{label}</span>
      <span className={`text-sm ${ok ? "text-teal" : "text-terracotta"}`}>
        {ok ? "● " : "○ "}
        {detail}
      </span>
    </div>
  );
}

export default function App() {
  const [rest, setRest] = useState({ ok: false, detail: "checking..." });
  const [db, setDb] = useState({ ok: false, detail: "checking..." });
  const [sock, setSock] = useState({ ok: false, detail: "connecting..." });

  useEffect(() => {
    api
      .get("/health")
      .then(({ data }) => {
        setRest({ ok: true, detail: "reachable" });
        setDb({ ok: data.db === "connected", detail: data.db });
      })
      .catch(() => {
        setRest({ ok: false, detail: "not reachable" });
        setDb({ ok: false, detail: "unknown" });
      });

    socket.on("connect", () => setSock({ ok: true, detail: `id: ${socket.id}` }));
    socket.on("disconnect", () => setSock({ ok: false, detail: "disconnected" }));
    socket.on("connect_error", () => setSock({ ok: false, detail: "connection error" }));
    socket.connect();

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, []);

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-6 px-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-widest text-coral">
          Phase 0
        </p>
        <h1 className="mt-1 text-4xl font-bold">MeetSphere</h1>
        <p className="mt-2 text-muted">Connectivity check: foundation ready hai ya nahi.</p>
      </header>

      <section className="space-y-3 rounded-2xl border border-sand bg-surface p-5 shadow-sm">
        <StatusRow label="REST API" {...rest} />
        <StatusRow label="MongoDB" {...db} />
        <StatusRow label="Socket.IO" {...sock} />
      </section>

      <div className="flex gap-2">
        {["bg-ivory", "bg-coral", "bg-terracotta", "bg-teal", "bg-sage", "bg-amber", "bg-charcoal"].map(
          (c) => (
            <div key={c} className={`h-8 w-8 rounded-full border border-sand ${c}`} title={c} />
          )
        )}
      </div>
    </main>
  );
}