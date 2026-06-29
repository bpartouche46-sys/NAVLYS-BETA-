// app/(onboarding)/questionnaire/[step]/page.tsx — Écran 2, questionnaire 12 questions
// Reconstitué VERBATIM depuis _APP_CLIENT_ONBOARDING_7_SCREENS.md §3.
import { notFound } from 'next/navigation';
import { QuestionStep } from '@/components/onboarding/QuestionStep';

const QUESTIONS = [
  /* Q1 */  { id: 'q1_age', kind: 'slider', min: 18, max: 90, label: 'Quel âge as-tu ?', unit: ' ans' },
  /* Q2 */  { id: 'q2_situation', kind: 'single', label: 'Quelle est ta situation professionnelle ?',
              options: [
                { v: 'etudiant',     l: 'Étudiant·e' },
                { v: 'salarie',      l: 'Salarié·e (CDI/CDD)' },
                { v: 'freelance',    l: 'Freelance / Auto-entrepreneur' },
                { v: 'entrepreneur', l: 'Entrepreneur / Dirigeant' },
                { v: 'retraite',     l: 'Retraité·e' },
                { v: 'sans_emploi',  l: 'Sans emploi actuellement' },
              ] },
  /* Q3 */  { id: 'q3_capital', kind: 'log-slider', min: 100, max: 1_000_000,
              label: 'Quel est ton capital disponible aujourd\'hui ?', unit: ' €' },
  /* Q4 */  { id: 'q4_dca_mensuel', kind: 'slider', min: 0, max: 5_000,
              label: 'Combien peux-tu épargner par mois ?', unit: ' € / mois' },
  /* Q5 */  { id: 'q5_objectif', kind: 'single', label: 'Quel est ton objectif principal ?',
              options: [
                { v: 'securiser',    l: 'Sécuriser ce que j\'ai (préserver le capital)' },
                { v: 'grandir',      l: 'Faire grandir mon capital sur le long terme' },
                { v: 'projet_court', l: 'Acheter un projet précis dans 2-5 ans' },
                { v: 'retraite',     l: 'Préparer ma retraite / transmettre' },
                { v: 'apprendre',    l: 'Apprendre, comprendre, ne pas perdre' },
              ] },
  /* Q6 */  { id: 'q6_horizon', kind: 'single', label: 'À quel horizon ?',
              options: [
                { v: '<2ans',    l: '< 2 ans (besoin rapide de l\'argent)' },
                { v: '2-5ans',   l: '2 à 5 ans' },
                { v: '5-10ans',  l: '5 à 10 ans' },
                { v: '10-20ans', l: '10 à 20 ans' },
                { v: '20+ans',   l: '20 ans + / retraite' },
              ] },
  /* Q7 */  { id: 'q7_reaction_perte', kind: 'single',
              label: 'Tu perds 20 % en 1 mois. Tu fais quoi ?',
              options: [
                { v: 'panique',     l: 'Je vends tout immédiatement' },
                { v: 'inquiet',     l: 'Je veux comprendre ce qui se passe' },
                { v: 'accepte',     l: 'Je ne touche à rien, ça fait partie du jeu' },
                { v: 'opportunite', l: 'Je vois une opportunité d\'acheter à prix bas' },
                { v: 'indifferent', l: 'Je ne regarde pas mes positions au quotidien' },
              ] },
  /* Q8 */  { id: 'q8_experience', kind: 'single',
              label: 'Ton expérience en investissement ?',
              options: [
                { v: 'zero',     l: 'Zéro, je découvre' },
                { v: 'qq_mois',  l: 'Quelques mois' },
                { v: '1-3ans',   l: '1 à 3 ans (ETF, PEA, AV)' },
                { v: '3-10ans',  l: '3 à 10 ans (Donchian, Sharpe, drawdown)' },
                { v: '10+ans',   l: '10 ans +' },
                { v: 'pro',      l: 'Professionnel·le du secteur' },
              ] },
  /* Q9 */  { id: 'q9_temps_semaine', kind: 'single',
              label: 'Combien de temps par semaine ?',
              options: [
                { v: '0min',  l: '0 minute (passif total)' },
                { v: '15min', l: '15 min / semaine' },
                { v: '1h',    l: '1 h / semaine' },
                { v: '3-5h',  l: '3 à 5 h / semaine' },
                { v: '10h+',  l: '10 h + / semaine' },
              ] },
  /* Q10 */ { id: 'q10_interdits_perso', kind: 'multi',
              label: 'Qu\'est-ce que tu refuses par principe ?',
              options: [
                { v: 'crypto',        l: 'Crypto-monnaies' },
                { v: 'actions_indiv', l: 'Actions individuelles (préfère ETF)' },
                { v: 'derives',       l: 'Produits dérivés / Options / Futures' },
                { v: 'leverage',      l: 'Effet de levier' },
                { v: 'quotidien',     l: 'Stratégies actives quotidiennes' },
              ] },
  /* Q11 */ { id: 'q11_perte_totale_tactique', kind: 'single',
              label: 'Es-tu prêt·e à perdre la totalité de ta poche tactique ?',
              options: [
                { v: 'oui',     l: 'Oui, je sais que c\'est possible et j\'accepte' },
                { v: 'partiel', l: 'Partiellement (jusqu\'à −50 %)' },
                { v: 'non',     l: 'Non, pas un euro' },
              ] },
  /* Q12 */ { id: 'q12_accepte_education_seule', kind: 'binary',
              label: '⚖️ NAVLYS = éducation, pas conseil personnalisé. Tu acceptes ?',
              options: [
                { v: true,  l: 'Oui, j\'ai compris. NAVLYS m\'éduque, je décide.' },
                { v: false, l: 'Non, je voulais un conseiller.' },
              ] },
];

export default function QPage({ params }: { params: { step: string } }) {
  const i = parseInt(params.step, 10);
  if (Number.isNaN(i) || i < 1 || i > 12) notFound();
  return <QuestionStep stepIndex={i} total={12} question={QUESTIONS[i - 1]} />;
}
