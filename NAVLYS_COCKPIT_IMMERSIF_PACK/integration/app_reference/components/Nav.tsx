import Link from 'next/link';

export default function Nav() {
  return (
    <header className="flex items-center justify-between gap-6 px-5 py-3 rounded-3xl card">
      <Link href="/" className="flex items-center gap-3 no-underline">
        <div
          className="w-11 h-11 rounded-xl relative shadow-[0_0_24px_rgba(232,24,137,0.55)]"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, var(--pink), var(--fuchsia) 40%, var(--purple-deep) 80%)'
          }}
        >
          <span
            className="absolute inset-0 grid place-items-center font-italic text-white text-xl"
            style={{ fontFamily: '"Fraunces", serif', fontStyle: 'italic', fontWeight: 600 }}
          >
            N
          </span>
        </div>
        <div>
          <div
            className="font-display text-2xl tracking-widest"
            style={{ color: 'var(--champagne)' }}
          >
            NAVLYS
          </div>
          <span
            className="block -mt-1 text-xs italic"
            style={{ fontFamily: '"Fraunces", serif', color: 'var(--lavender)', opacity: 0.8 }}
          >
            veille stratégique &amp; éducation
          </span>
        </div>
      </Link>
      <nav>
        <ul className="hidden md:flex gap-4 list-none m-0 p-0 text-sm">
          <li><Link href="/cockpit">Cockpit</Link></li>
          <li><Link href="/objectif">Objectif</Link></li>
          <li><Link href="/marge">Marge</Link></li>
          <li><Link href="/methode">Méthode</Link></li>
          <li><Link href="/veille">Veille</Link></li>
          <li><Link href="/education">Éducation</Link></li>
          <li><Link href="/partenaires">Partenaires</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/login">Connexion</Link></li>
        </ul>
      </nav>
    </header>
  );
}
