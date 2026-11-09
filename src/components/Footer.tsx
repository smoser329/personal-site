export default function Footer() {
  return (
    <footer className="py-12 border-t border-stone-100">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-stone-400 text-sm">© 2026 Samuel Moser</p>
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/samuel-moser-4737aa12b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-stone-700 transition-colors text-sm"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/smoser329"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-stone-700 transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            href="mailto:smoser329@gmail.com"
            className="text-stone-400 hover:text-stone-700 transition-colors text-sm"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
