export default function Footer() {
  return (
    <footer className="bg-white text-black text-center py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col justify-center items-center gap-2">
        <p className="text-sm">
          © {new Date().getFullYear()} ETAR S.A. — Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

