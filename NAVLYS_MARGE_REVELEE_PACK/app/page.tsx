import MargeRevelee from "../components/MargeRevelee";

export default function MargeReveleePage() {
  return (
    <main className="mx-auto max-w-3xl space-y-8 p-6">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          NAVLYS · Marge Révélée
        </h1>
        <p className="mt-2 text-slate-500">
          Le calculateur public qui révèle ce que votre banque gagne sur vous.
        </p>
      </header>

      <MargeRevelee />

      <footer className="pt-8 text-center text-xs text-slate-400">
        NAVLYS INFINITE · Pilier 3 · Cheval de Troie · v1.0
      </footer>
    </main>
  );
}
