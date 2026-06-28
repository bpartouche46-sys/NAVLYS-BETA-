# NAVLYS — Correspondances symboliques

> Le dictionnaire du cockpit : pour chaque élément du voilier, son sens NAVLYS et la donnée qu'il porte.
> Règle absolue : **aucun élément à l'écran sans entrée dans ce tableau.**

---

## Le grand tableau

| Élément du voilier | Sens NAVLYS | Donnée pilotée | Où, dans le cockpit |
|---|---|---|---|
| **Cockpit central** | Ton poste de barre, ton calme | — (cadre immersif) | toute la scène |
| **Avant / proue** | Le cap, l'objectif, le futur | objectif visé, cap du jour | vue AVANT |
| **Arrière / poupe** | Le sillage, les résultats, le passé | historique, courbe d'equity | vue ARRIÈRE |
| **Étoile-objectif** (polaire) | Ton but personnel | l'objectif fixé | halo haut, vue avant |
| **Grand mât (avant)** | La Forteresse | part sécurisée du capital | mât principal |
| **Grande voile + génois (grands)** | 90 % sécurisés, stables (~5 %/an) | capital Forteresse | voiles du grand mât |
| **Artimon (arrière)** | Le Jeu Actif | part réactive du capital | mât arrière |
| **Voiles d'artimon (petites)** | 10 % ultra-réactifs | capital + perf du Jeu Actif | voiles de l'artimon |
| **Gonflement des voiles** | Le vent qui porte | état du marché × voilure | `scaleX` des voiles |
| **Voile qui faseye** | Mollesse / risque | vent faible / baisse | animation `luff` |
| **Rotor Flettner** | La curation, l'œil aiguisé | signal du jour (un seul) | au vent, vue avant |
| **Winch « Allocation »** | Régler le partage 90/10 | ratio Forteresse / Actif | curseur 1 |
| **Winch « Réaffectation »** | Reverser les gains au coffre | % des plus-values → Forteresse | curseur 2 |
| **Winch « Voilure »** | Choisir son exposition | prudent / équilibré / agressif | segment 3 crans |
| **Cordages à portée** | Tout se règle d'une main | accessibilité des commandes | embases + curseurs |
| **Cadran météo** | Le grand vent global | tendance marché mondial | instrument gauche |
| **Aiguille météo qui oscille** | Le marché qui tourne | état marché (−1…+1) | aiguille bronze |
| **Compas « Ta route »** | Ton cap tenu | constante (ne bouge pas) | instrument droit |
| **Aiguille de route fixe** | La main qui ne tremble pas | stabilité de ta méthode | aiguille ICE BLUE |
| **Compas central + médaillon** | Le cap du jour, la marque | ticker · entrée · sortie | instrument central |
| **Pièce bronze qui tourne** | La signature NAVLYS | identité, le logo vivant | médaillon, 8 s/tour |
| **Stries de vent** | Le bruit du monde | agitation ambiante du marché | overlay vue avant |
| **Sillage en V** | Le chemin parcouru | profondeur de l'historique | vue arrière |
| **Courbe sur le sillage** | Tes résultats réels (démo) | total au fil des jours | equity line |
| **Boiseries bronze** | Le soin, le métier, le premier | qualité, premium | premier plan |
| **Fond nuit (noir → bleu)** | Le calme, la concentration | ambiance de fond | scène entière |

---

## La mécanique du jour (en clair)

1. Chaque **« nouveau jour »**, le **vent du marché** tourne (aléa borné).
2. La **Forteresse** avance doucement, comme une grand-voile qui tient le cap (~5 %/an lissé).
3. Le **Jeu Actif** prend ce que le vent du jour lui donne (gain ou perte, borné).
4. Sur un gain, le **winch Réaffectation** décide quelle part part au coffre (Forteresse) et quelle part reste dans les vifs (Jeu Actif) — c'est le moteur de la croissance exponentielle.
5. Le **winch Voilure** dit si tu pousses fort (agressif) ou si tu réduis la toile (prudent).
6. Le **winch Allocation** redéfinit, à tout moment, le partage 90/10 entre coffre et jeu.

Le tout, tenu à une main, depuis ton cockpit. *Le vent change. Ton cap, non.*
