export default function Home  (){

  return(
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.25),transparent_40%)]" />

      {/* Pull Instruction */}
      <div className="absolute bottom-10 text-center">
        <p className="animate-pulse text-sm uppercase tracking-[0.4em] text-zinc-500">
          Pull the ribbon
        </p>
      </div>

      {/* Ribbon Wrapper */}
      <div className="group relative flex flex-col items-center">

        {/* Pin */}
        <div className="z-20 h-5 w-5 rounded-full border border-zinc-700 bg-zinc-300 shadow-[0_0_20px_rgba(255,255,255,0.4)]" />

        {/* String */}
        <div className="h-32 w-[2px] bg-gradient-to-b from-zinc-300 to-zinc-700 transition-all duration-300 group-hover:h-40" />

        {/* Ribbon */}
        <button
          className="
            relative
            flex
            h-44
            w-28
            cursor-grab
            items-center
            justify-center
            bg-gradient-to-b
            from-violet-500
            via-fuchsia-600
            to-rose-500
            shadow-[0_20px_60px_rgba(168,85,247,0.45)]
            transition-all
            duration-500
            active:translate-y-10
            active:scale-95
          "
        >

          {/* Ribbon Bottom Cut */}
          <div className="absolute -bottom-1 left-0 h-8 w-full bg-black [clip-path:polygon(0_0,50%_100%,100%_0)]" />

          {/* Ribbon Text */}
          <span className="rotate-90 text-2xl font-black uppercase tracking-[0.6em] text-white">
            Portfolio
          </span>

          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </button>
      </div>

      {/* Decorative Blur */}
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl" />
    </main>
  )
}