import { Logo } from "@futrob/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-3">
          <Logo className="h-9 w-auto" />
          <span className="type-title tracking-wide">Futrob</span>
        </div>
        <span className="type-label text-muted-foreground">Competition OS</span>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-16 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
        <div className="max-w-xl">
          <p className="type-label mb-5 text-primary">Del partido EA al resultado oficial</p>
          <h1 className="type-hero">
            Tu competición,
            <br />
            bajo control.
          </h1>
          <p className="type-body mt-6 max-w-[60ch] text-muted-foreground sm:text-lg">
            Opera ligas y copas de FC Clubs con datos reales, resultados auditables y una
            experiencia clara para organizadores, capitanes y espectadores.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 font-semibold text-primary-foreground transition-[background-color,transform] duration-180 hover:bg-primary-hover active:scale-[0.96]"
              href="#match-center"
            >
              Ver Match Center
            </a>
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-secondary px-5 font-semibold text-secondary-foreground transition-[background-color,transform] duration-180 hover:bg-secondary-hover active:scale-[0.96]"
              href="#principios"
            >
              Conocer el sistema
            </a>
          </div>
        </div>

        <div
          className="overflow-hidden rounded-[var(--radius-xl)] bg-surface shadow-[0_0_0_1px_var(--border)]"
          id="match-center"
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
            <div>
              <p className="type-label text-muted-foreground">Jornada 08 · Partido oficial</p>
              <h2 className="type-title mt-1">Match Center</h2>
            </div>
            <span className="type-label rounded-full bg-accent px-3 py-1 text-accent-foreground">
              Aprobado
            </span>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-10 sm:px-8">
            <div>
              <span className="block text-sm text-muted-foreground">Local</span>
              <strong className="mt-1 block text-base sm:text-lg">Barrio FC</strong>
            </div>
            <div className="type-score text-center">
              3<span className="px-2 text-muted-foreground">:</span>1
            </div>
            <div className="text-end">
              <span className="block text-sm text-muted-foreground">Visitante</span>
              <strong className="mt-1 block text-base sm:text-lg">Norte XI</strong>
            </div>
          </div>

          <div className="border-t border-border bg-muted px-5 py-4 sm:px-6">
            <div className="grid gap-2 text-sm sm:grid-cols-[1fr_auto] sm:items-center">
              <p>
                <span className="font-semibold">2 partidos EA</span>
                <span className="text-muted-foreground"> seleccionados y confirmados</span>
              </p>
              <span className="type-label text-muted-foreground">EA SYNC · 00:42</span>
            </div>
          </div>
        </div>
      </section>

      <footer
        className="mx-auto flex max-w-7xl items-center gap-2 px-5 py-8 text-muted-foreground sm:px-8"
        id="principios"
      >
        <Logo className="h-5 w-auto" monochrome />
        <span className="text-sm">Preciso para operar. Claro para competir.</span>
      </footer>
    </main>
  );
}
