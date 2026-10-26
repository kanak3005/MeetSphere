export default function Input({ label, name, error, ...props }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={`w-full rounded-xl border bg-surface px-4 py-2.5 outline-none transition focus:ring-2 focus:ring-coral/40 ${
          error ? "border-terracotta" : "border-sand focus:border-coral"
        }`}
        {...props}
      />
      {error && <p className="text-sm text-terracotta">{error}</p>}
    </div>
  );
}