export function CornerHoverCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative group border border-neutral-800 p-6 rounded-lg transition-all duration-300">
      <span
        className="pointer-events-none absolute top-0 left-0 w-0 h-[2px] bg-emerald-400

        transition-all duration-300 group-hover:w-10"
      ></span>
      <span
        className="pointer-events-none absolute top-0 left-0 h-0 w-[2px] bg-emerald-400

        transition-all duration-300 group-hover:h-10"
      ></span>

      <span
        className="pointer-events-none absolute top-0 right-0 w-0 h-[2px] bg-emerald-400

        transition-all duration-300 group-hover:w-10"
      ></span>
      <span
        className="pointer-events-none absolute top-0 right-0 h-0 w-[2px] bg-emerald-400

        transition-all duration-300 group-hover:h-10"
      ></span>

      <span
        className="pointer-events-none absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-400

        transition-all duration-300 group-hover:w-10"
      ></span>
      <span
        className="pointer-events-none absolute bottom-0 left-0 h-0 w-[2px] bg-emerald-400

        transition-all duration-300 group-hover:h-10"
      ></span>

      <span
        className="pointer-events-none absolute bottom-0 right-0 w-0 h-[2px] bg-emerald-400

        transition-all duration-300 group-hover:w-10"
      ></span>
      <span
        className="pointer-events-none absolute bottom-0 right-0 h-0 w-[2px] bg-emerald-400

        transition-all duration-300 group-hover:h-10"
      ></span>

      {children}
    </div>
  );
}
