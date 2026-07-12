export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-ink/10 px-6 py-4">
        <span className="font-display text-lg font-medium text-ink">
          Inmobiliaria.com.py
        </span>
        <a
          href="https://wa.me/595"
          className="rounded-full bg-gold px-5 py-2 text-sm font-medium text-ink-deep transition-colors hover:bg-gold-deep"
        >
          Escribinos
        </a>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-ink px-6 py-24 text-center text-text-on-dark">
        <h1 className="max-w-2xl font-display text-4xl font-medium sm:text-5xl">
          Encontrá tu próxima propiedad en Asunción
        </h1>
        <p className="max-w-md text-text-on-dark/80">
          Departamentos, villas y proyectos en las mejores zonas.
        </p>
        <a
          href="https://wa.me/595"
          className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink-deep transition-colors hover:bg-gold-deep"
        >
          Escribinos por WhatsApp
        </a>
      </main>

      <section className="px-6 py-16">
        <h2 className="font-display text-2xl font-medium text-ink">
          Propiedades destacadas
        </h2>
      </section>
    </div>
  );
}
