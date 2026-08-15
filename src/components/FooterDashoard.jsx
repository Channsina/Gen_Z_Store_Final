export default function Footer() {
  return (
    <footer className="mt-auto px-4 sm:px-6 py-5 border-t border-black/10">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
        <p className="text-xs text-black/40">
          © {new Date().getFullYear()} GenZ Store · Admin Dashboard
        </p>
      </div>
    </footer>
  );
}