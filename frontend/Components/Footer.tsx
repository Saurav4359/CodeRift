export function Footer() {
  return (
    <>
      <footer
        className="w-full font-serif border-t border-white/20 
                   text-white/80 text-sm 
                   py-6 px-6 bg-linear-to-bl from-[#0a0a0a] to-[#080808]"
      >
        <div className="flex justify-between items-center">
  <p className="hover:text-white cursor-pointer transition">© 2026 CodeRift. Made with ❤️ by Saurav.</p>

  <div className="flex gap-6">
    <span className="hover:text-white cursor-pointer transition">Terms</span>
    <span className="hover:text-white cursor-pointer transition">Privacy</span>
    <span className="hover:text-white cursor-pointer transition">Careers</span>
    <span className="hover:text-white cursor-pointer transition">Contact</span>
  </div>
</div>
      </footer>
    </>
  );
}

 
