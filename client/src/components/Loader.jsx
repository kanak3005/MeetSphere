export default function Loader({ fullScreen = false }) {
  const spinner = (
    <div
      className="h-8 w-8 animate-spin rounded-full border-4 border-sand border-t-terracotta"
      role="status"
      aria-label="Loading"
    />
  );

  if (!fullScreen) return spinner;

  return <div className="flex min-h-screen items-center justify-center">{spinner}</div>;
}