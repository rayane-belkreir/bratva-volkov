export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-off-black/95 backdrop-blur-sm z-50">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent mb-4"></div>
        <p className="text-cream-white/80 text-lg">Chargement de la page...</p>
      </div>
    </div>
  );
}

