export default function Loading() {
  return (
    <div className="min-h-screen bg-washi flex items-center justify-center">
      <div className="text-center animate-slowfade">
        <p className="font-serif text-ink/70 text-lg tracking-[0.5em] mb-4">KANAE</p>
        <span className="block mx-auto w-16 h-px bg-ink/20 relative overflow-hidden">
          <span className="absolute inset-y-0 left-0 w-1/3 bg-ink/60 animate-[loadslide_1.4s_ease-in-out_infinite]" />
        </span>
        <style>{`@keyframes loadslide { 0% { transform: translateX(-100%); } 100% { transform: translateX(400%); } }`}</style>
      </div>
    </div>
  )
}
