const variants = {
  primary: "bg-terracotta text-white hover:brightness-95",
  secondary: "bg-sand text-charcoal hover:brightness-95",
};

export default function Button({
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  children,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`rounded-xl px-5 py-2.5 font-semibold transition focus:outline-none focus:ring-2 focus:ring-coral/50 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}