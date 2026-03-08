export interface ExercisePromptConfig {
  moduleId: string;
  moduleTitle: string;
  exerciseTitle: string;
  objective: string;
  checklist: string[];
  rejectionHints: string[];
  expectedEvidence: string[];
  minAssets: number;
  prompt: string;
}

const DEFAULT_CONFIG: ExercisePromptConfig = {
  moduleId: "*",
  moduleTitle: "Module libre",
  exerciseTitle: "Exercice libre",
  objective: "Evaluer une image d'exercice selon les objectifs du module.",
  checklist: [
    "L'image est techniquement lisible (exposition, nettete, sujet discernable).",
    "La consigne du module est respectee.",
    "La proposition montre une intention visuelle claire.",
  ],
  rejectionHints: [
    "Indiquer 2 corrections concretes et actionnables.",
    "Suggérer un reshoot precis plutot qu'un conseil vague.",
  ],
  expectedEvidence: [
    "Le sujet principal est clairement identifiable.",
    "La preuve visuelle permet de verifier la consigne sans ambiguite.",
  ],
  minAssets: 1,
  prompt:
    "Tu es correcteur photo. Evalue strictement l'image selon l'objectif et la checklist. Retourne un JSON court.",
};

const EXERCISE_PROMPTS: Record<string, ExercisePromptConfig> = {
  "0.1": {
    moduleId: "0.1",
    moduleTitle: "La Lumiere Captive",
    exerciseTitle: "Le Stenope Domestique",
    objective: "Verifier la comprehension camera obscura et trace lumineuse.",
    checklist: [
      "Presence d'une projection lumineuse ou d'un resultat de stenope.",
      "Inversion/trace optique perceptible ou clairement documentee.",
      "Image exploitable: sujet visible, exposition suffisante.",
    ],
    rejectionHints: [
      "Demander de renforcer la projection lumineuse (contraste + obscurite).",
      "Demander un cadre plus lisible du dispositif stenope.",
    ],
    expectedEvidence: [
      "Une image montre clairement le dispositif physique de stenope.",
      "Une autre image montre la projection lumineuse ou la trace optique renversee.",
    ],
    minAssets: 2,
    prompt:
      "Corrige l'exercice 0.1 (stenope). Deux images sont attendues: le dispositif physique puis la trace lumineuse. Valide seulement si les deux preuves sont presentes et pedagogiquement demonstrables.",
  },
  "0.2": {
    moduleId: "0.2",
    moduleTitle: "La Particule et l'Onde",
    exerciseTitle: "Le Prisme du Quotidien",
    objective: "Verifier la creation volontaire d'une diffraction chromatique visible.",
    checklist: [
      "Un spectre colore identifiable est visible dans l'image.",
      "L'effet semble produit par la lumiere et non ajoute artificiellement en post-production.",
      "Le cadre reste lisible malgre l'experimentation optique.",
    ],
    rejectionHints: [
      "Demander une source lumineuse plus directe et un fond plus neutre.",
      "Refuser si le spectre est trop faible, confus ou absent.",
    ],
    expectedEvidence: [
      "Presence d'un arc chromatique ou d'une separation nette des couleurs.",
      "La scene montre une experience physique credible: prisme, CD, verre ou autre dispositif lumineux.",
    ],
    minAssets: 1,
    prompt:
      "Corrige l'exercice 0.2. Valide uniquement si la diffraction chromatique est reellement visible et pedagogiquement exploitable.",
  },
  "0.3": {
    moduleId: "0.3",
    moduleTitle: "Philosophie de l'Image",
    exerciseTitle: "Analyse de Punctum",
    objective: "Verifier qu'une image porte une charge emotive ou narrative singuliere perceptible.",
    checklist: [
      "Le sujet ou le detail marquant est clairement perceptible.",
      "L'image produit une impression de presence, de memoire ou de tension.",
      "La composition sert cette charge sensible au lieu de la diluer.",
    ],
    rejectionHints: [
      "Demander un cadre plus concentre autour du detail signifiant.",
      "Refuser les images trop generiques ou purement descriptives.",
    ],
    expectedEvidence: [
      "Un detail, geste, regard ou accident visuel agit comme point d'accroche emotif.",
      "L'image ne repose pas uniquement sur un sujet banal sans tension visuelle.",
    ],
    minAssets: 1,
    prompt:
      "Corrige l'exercice 0.3. Ne valide pas une image simplement correcte: il faut un punctum ou une tension sensible lisible.",
  },
  "1.1": {
    moduleId: "1.1",
    moduleTitle: "La Trinite de l'Exposition",
    exerciseTitle: "L'Epreuve du Triangle",
    objective: "Verifier la maitrise du triangle d'exposition.",
    checklist: [
      "Image correctement exposee (ni cramee ni bouchee).",
      "Intention claire sur ouverture/vitesse/ISO.",
      "Niveau de bruit ou flou coherent avec le choix technique.",
    ],
    rejectionHints: [
      "Proposer un reglages cibles (ISO/vitesse/ouverture).",
      "Demander une seconde prise dans une scene controlee.",
    ],
    expectedEvidence: [
      "L'exposition globale est coherent avec l'intention de prise de vue.",
      "Le rendu de bruit, flou ou profondeur de champ semble choisi et non subi.",
    ],
    minAssets: 1,
    prompt:
      "Corrige l'exercice 1.1 (triangle d'exposition). Verifie l'intention technique et la coherence du rendu.",
  },
  "1.2": {
    moduleId: "1.2",
    moduleTitle: "L'Ordre dans le Chaos",
    exerciseTitle: "La Geometrie du Reel",
    objective: "Verifier l'usage de la composition.",
    checklist: [
      "Au moins une structure de composition identifiable (lignes, tiers, profondeur).",
      "Sujet principal lisible sans ambiguite.",
      "Cohesion globale du cadre.",
    ],
    rejectionHints: [
      "Indiquer ce qui parasite la lecture du sujet.",
      "Donner une consigne de recadrage concrete.",
    ],
    expectedEvidence: [
      "Des lignes, masses ou plans organisent clairement le cadre.",
      "Le regard sait ou se poser sans confusion.",
    ],
    minAssets: 1,
    prompt:
      "Corrige l'exercice 1.2 (composition). Sois exigeant sur la lisibilite et la structure visuelle.",
  },
  "1.3": {
    moduleId: "1.3",
    moduleTitle: "Le Spectre des Emotions",
    exerciseTitle: "L'Harmonie des Opposes",
    objective: "Verifier harmonie/couleur et intention emotionnelle.",
    checklist: [
      "Palette couleur coherent avec l'intention.",
      "Balance des blancs globalement maitrisée.",
      "Contraste couleur utilisable pour guider l'oeil.",
    ],
    rejectionHints: [
      "Signaler dominante couleur problematique.",
      "Proposer ajustement concret de temperature/teinte.",
    ],
    expectedEvidence: [
      "La palette dominante parait intentionnelle.",
      "Les couleurs orientent la lecture ou l'emotion plutot que de brouiller l'image.",
    ],
    minAssets: 1,
    prompt:
      "Corrige l'exercice 1.3 (couleur). Verifie harmonie chromatique et intention emotionnelle.",
  },
  "1.4": {
    moduleId: "1.4",
    moduleTitle: "L'Oeil de Verre",
    exerciseTitle: "L'Echelle des Perspectives",
    objective: "Verifier la comprehension des focales, de la perspective et de la distorsion.",
    checklist: [
      "La perspective ou la compression de l'espace est perceptible.",
      "Le choix de focale sert le sujet.",
      "La distorsion eventuelle semble comprise et exploitee.",
    ],
    rejectionHints: [
      "Demander une distance sujet/appareil plus franche pour rendre la focale lisible.",
      "Refuser si la perspective reste banale ou impossible a distinguer.",
    ],
    expectedEvidence: [
      "Le rendu spatial traduit un vrai choix optique.",
      "Le cadre montre clairement une deformation, compression ou expansion de l'espace.",
    ],
    minAssets: 1,
    prompt:
      "Corrige l'exercice 1.4. Valide seulement si le comportement de la focale est visiblement compréhensible dans l'image.",
  },
  "1.5": {
    moduleId: "1.5",
    moduleTitle: "L'Alchimie du Pixel",
    exerciseTitle: "Le Revelateur Numerique",
    objective: "Verifier une post-production lisible et une intention colorimetrique ou tonale coherente.",
    checklist: [
      "Le developpement numerique ameliore ou transforme clairement l'image.",
      "Les tonalites restent credibles ou volontairement stylisees avec coherence.",
      "L'histogramme implicite du rendu n'ecrase pas les details importants.",
    ],
    rejectionHints: [
      "Demander de proteger les hautes lumieres ou de deboucher les ombres avec mesure.",
      "Refuser si le traitement semble arbitraire ou destructif.",
    ],
    expectedEvidence: [
      "Une ambiance colorimetrique ou tonale nette se degage du rendu final.",
      "Les contrastes et la densite paraissent maitrises.",
    ],
    minAssets: 1,
    prompt:
      "Corrige l'exercice 1.5. Verifie que la retouche sert une intention visuelle et ne degrade pas la lisibilite.",
  },
  "2.A.1": {
    moduleId: "2.A.1",
    moduleTitle: "L'Ame du Grain",
    exerciseTitle: "L'Epreuve du Grain",
    objective: "Verifier la credibilite d'un rendu argentique granuleux et dense.",
    checklist: [
      "Le grain participe a l'esthetique sans detruire le sujet.",
      "Les noirs et demi-teintes gardent une structure lisible.",
      "Le rendu evoque une sensibilite argentique plutot qu'un simple filtre.",
    ],
    rejectionHints: [
      "Demander un grain moins uniforme ou moins numerique.",
      "Refuser si la texture masque tout detail essentiel.",
    ],
    expectedEvidence: [
      "Texture granuleuse credible.",
      "Densite tonale organique et sujet encore lisible.",
    ],
    minAssets: 1,
    prompt:
      "Corrige l'exercice 2.A.1. Sois strict sur l'authenticite percue du grain et la qualite tonale.",
  },
  "2.A.2": {
    moduleId: "2.A.2",
    moduleTitle: "La Memoire des Sels",
    exerciseTitle: "L'Image Latente",
    objective: "Verifier un rendu de negatif/developpement avec densite et structure organiques.",
    checklist: [
      "La gamme tonale montre de la matiere dans les ombres et hautes lumieres.",
      "Le rendu evoque un processus chimique ou analogique plausible.",
      "L'intention est lisible au-dela de l'effet vintage.",
    ],
    rejectionHints: [
      "Demander une separation tonale plus nette.",
      "Refuser les effets decoratifs sans preuve de matiere.",
    ],
    expectedEvidence: [
      "Noirs riches ou tons intermediaires travailles.",
      "Texture qui rappelle un developpement photo plutot qu'un preset superficiel.",
    ],
    minAssets: 1,
    prompt:
      "Corrige l'exercice 2.A.2. Valide seulement si l'image porte une vraie sensation de developpement materiel.",
  },
  "2.A.3": {
    moduleId: "2.A.3",
    moduleTitle: "L'Empreinte Materielle",
    exerciseTitle: "L'Objet Sacre",
    objective: "Verifier l'authenticite materielle d'un tirage ou procede alternatif.",
    checklist: [
      "La texture de surface parait physique et credible.",
      "La gamme tonale correspond a un procede ancien ou artisanal.",
      "L'image conserve une presence d'objet, pas seulement de fichier.",
    ],
    rejectionHints: [
      "Demander une texture plus tangible et moins numerique.",
      "Refuser si l'aspect materiel n'est pas perceptible.",
    ],
    expectedEvidence: [
      "Presence de fibre, relief, irregularite ou autre indice de support.",
      "Tonalites compatibles avec cyanotype, photogramme ou tirage artisanal.",
    ],
    minAssets: 1,
    prompt:
      "Corrige l'exercice 2.A.3. Cherche des preuves de matiere et de support physique, pas une simple image propre.",
  },
  "2.C.1": {
    moduleId: "2.C.1",
    moduleTitle: "La Mutation du Pixel",
    exerciseTitle: "La Chimere Reelle",
    objective: "Verifier une augmentation IA coherente a partir d'une base photographique.",
    checklist: [
      "La fusion entre photo d'origine et ajout IA reste credible.",
      "La lumiere et les textures sont globalement coherentes.",
      "L'image garde une intention photographique plutot qu'un collage arbitraire.",
    ],
    rejectionHints: [
      "Demander d'aligner direction de lumiere et texture de surface.",
      "Refuser si l'ajout IA semble plaque ou hors echelle.",
    ],
    expectedEvidence: [
      "Une hybridation visible mais coherent entre reel et genere.",
      "Pas de rupture grossiere de perspective ou d'eclairage.",
    ],
    minAssets: 1,
    prompt:
      "Corrige l'exercice 2.C.1. La validation exige une fusion convaincante entre capture reelle et transformation IA.",
  },
  "2.C.2": {
    moduleId: "2.C.2",
    moduleTitle: "Les Projecteurs du Code",
    exerciseTitle: "L'Invention du Passe",
    objective: "Verifier une image synthetique capable de simuler un passe photographique credible.",
    checklist: [
      "La texture argentique ou d'epoque semble plausible.",
      "Les anachronismes visuels majeurs sont absents.",
      "La lumiere et les details servent l'illusion temporelle.",
    ],
    rejectionHints: [
      "Demander de supprimer objets ou details modernes incoherents.",
      "Refuser si le rendu parait trop lisse ou trop contemporain.",
    ],
    expectedEvidence: [
      "Grain, rendu des matieres et lumiere compatibles avec l'epoque invoquee.",
      "Aucun element evident ne casse l'illusion.",
    ],
    minAssets: 1,
    prompt:
      "Corrige l'exercice 2.C.2. Sois strict sur les anachronismes et la credibilite historique du rendu.",
  },
  "2.C.3": {
    moduleId: "2.C.3",
    moduleTitle: "L'Ame dans la Machine",
    exerciseTitle: "L'Empreinte de l'Invisible",
    objective: "Verifier la coherence entre intention emotionnelle, source et expansion esthetique.",
    checklist: [
      "L'image semble porter une direction emotionnelle lisible.",
      "L'hybridation ou transformation reste fine et maitrisee.",
      "La proposition depasse l'effet gratuit pour produire une signature visuelle.",
    ],
    rejectionHints: [
      "Demander une relation plus nette entre intention et choix esthetiques.",
      "Refuser si l'image est spectaculaire mais vide de direction.",
    ],
    expectedEvidence: [
      "Le spectateur peut percevoir une emotion ou idee centrale.",
      "L'esthetique post-reelle reste cohérente dans tout le cadre.",
    ],
    minAssets: 1,
    prompt:
      "Corrige l'exercice 2.C.3. Ne valide que si l'image exprime une intention emotionnelle claire avec une hybridation fine.",
  },
  "2.U.1": {
    moduleId: "2.U.1",
    moduleTitle: "L'Instinct de la Rue",
    exerciseTitle: "L'Epreuve de l'Instant",
    objective: "Verifier un instant de rue pris sur le vif, sans mise en scene.",
    checklist: [
      "La scene parait spontanee et non dirigee.",
      "Le timing produit un instant signifiant.",
      "La composition soutient la lecture rapide de la scene.",
    ],
    rejectionHints: [
      "Demander un instant plus decisif ou plus net.",
      "Refuser les images trop posees ou statiques.",
    ],
    expectedEvidence: [
      "Geste, regard ou interaction saisis au bon moment.",
      "Cadrage de rue authentique, sans impression de mise en scene.",
    ],
    minAssets: 1,
    prompt:
      "Corrige l'exercice 2.U.1. Valide seulement si l'instant decisif et la spontaneite urbaine sont perceptibles.",
  },
  "2.U.2": {
    moduleId: "2.U.2",
    moduleTitle: "Sociologie du Regard",
    exerciseTitle: "L'Epreuve Sociale",
    objective: "Verifier un portrait ou cadrage de rue qui conserve contexte et presence humaine.",
    checklist: [
      "Le sujet humain est lisible sans effacer le contexte.",
      "Le cadre raconte une situation sociale ou urbaine.",
      "La distance photographe/sujet semble assumee.",
    ],
    rejectionHints: [
      "Demander un contexte plus lisible autour du sujet.",
      "Refuser si le portrait est decorrelé de son environnement.",
    ],
    expectedEvidence: [
      "Equilibre entre personne et environnement.",
      "Indices contextuels suffisants pour comprendre la scene.",
    ],
    minAssets: 1,
    prompt:
      "Corrige l'exercice 2.U.2. La validation demande un portrait de rue contextualise, pas un simple gros plan.",
  },
  "2.U.3": {
    moduleId: "2.U.3",
    moduleTitle: "La Ville Fantome",
    exerciseTitle: "Le Silence Urbain",
    objective: "Verifier une image d'architecture ou pose longue rigoureuse, geometrique et silencieuse.",
    checklist: [
      "Les verticales et lignes de structure sont bien tenues.",
      "La composition architecturale est rigoureuse.",
      "Le contraste et la lumiere servent une impression de vide ou de silence.",
    ],
    rejectionHints: [
      "Demander de redresser les perspectives et nettoyer le cadre.",
      "Refuser si la geometrie reste approximative.",
    ],
    expectedEvidence: [
      "Architecture dominante avec lignes fortes.",
      "Ambiance depouillee ou urbaine silencieuse clairement perceptible.",
    ],
    minAssets: 1,
    prompt:
      "Corrige l'exercice 2.U.3. Sois strict sur la precision geometrique et l'atmosphere de vide urbain.",
  },
  "2.N.1": {
    moduleId: "2.N.1",
    moduleTitle: "La Lumiere Sauvage",
    exerciseTitle: "L'Instant Tellurique",
    objective: "Verifier une image de paysage ou lumiere, contraste et profondeur sont maitrises.",
    checklist: [
      "La lumiere naturelle structure la scene.",
      "Le paysage a une profondeur lisible.",
      "Le contraste entre ombre et lumiere renforce la composition.",
    ],
    rejectionHints: [
      "Demander une meilleure heure de prise de vue ou un point de vue plus engage.",
      "Refuser si la lumiere ne fait pas sens dans l'image.",
    ],
    expectedEvidence: [
      "Scene naturelle ou tellurique avec hierarchie claire des plans.",
      "Usage volontaire de la lumiere sauvage.",
    ],
    minAssets: 1,
    prompt:
      "Corrige l'exercice 2.N.1. La validation exige une vraie lecture de lumiere et d'espace dans le paysage.",
  },
  "2.N.2": {
    moduleId: "2.N.2",
    moduleTitle: "Le Monde Miniature",
    exerciseTitle: "Le Regard de l'Insecte",
    objective: "Verifier la precision macro, le point et la richesse texturale.",
    checklist: [
      "Le point de focus principal est precis.",
      "La faible profondeur de champ sert le sujet.",
      "Les textures fines sont exploitables et riches.",
    ],
    rejectionHints: [
      "Demander un point plus ferme sur la zone cruciale.",
      "Refuser si le bokeh ou le flou noient le sujet.",
    ],
    expectedEvidence: [
      "Un detail miniature clairement isole.",
      "Textures ou micro-contrastes bien rendus.",
    ],
    minAssets: 1,
    prompt:
      "Corrige l'exercice 2.N.2. Sois strict sur la nettete utile, le focus et la valeur texturale.",
  },
  "2.N.3": {
    moduleId: "2.N.3",
    moduleTitle: "L'Ethique du Vivant",
    exerciseTitle: "L'Invisibilite Sacree",
    objective: "Verifier une photographie animaliere nette, respectueuse et non intrusive.",
    checklist: [
      "L'oeil ou la zone expressive de l'animal est suffisamment nette.",
      "La scene ne suggere pas de derangement ou de mise sous pression.",
      "Le cadrage laisse sentir une rencontre respectueuse avec le vivant.",
    ],
    rejectionHints: [
      "Demander plus de distance, de patience ou une vitesse mieux adaptee.",
      "Refuser les images qui semblent perturber l'animal.",
    ],
    expectedEvidence: [
      "Animal protagoniste clairement lisible.",
      "Preuve implicite de discretion et de respect du sujet.",
    ],
    minAssets: 1,
    prompt:
      "Corrige l'exercice 2.N.3. N'approuve pas une image techniquement forte si l'ethique ou le non-derangement sont douteux.",
  },
};

function normalizeId(moduleId: string): string {
  return moduleId.trim().toLowerCase();
}

export function getExercisePromptConfig(moduleId: string): ExercisePromptConfig {
  const normalized = normalizeId(moduleId);
  const match = Object.values(EXERCISE_PROMPTS).find((entry) => normalizeId(entry.moduleId) === normalized);
  return match || { ...DEFAULT_CONFIG, moduleId };
}
