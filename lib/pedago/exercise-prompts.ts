export interface ExercisePromptConfig {
  moduleId: string;
  objective: string;
  checklist: string[];
  rejectionHints: string[];
  prompt: string;
}

const DEFAULT_CONFIG: ExercisePromptConfig = {
  moduleId: "*",
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
  prompt:
    "Tu es correcteur photo. Evalue strictement l'image selon l'objectif et la checklist. Retourne un JSON court.",
};

const EXERCISE_PROMPTS: Record<string, ExercisePromptConfig> = {
  "0.1": {
    moduleId: "0.1",
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
    prompt:
      "Corrige l'exercice 0.1 (stenope). Valide seulement si la trace optique est visible et pedagogiquement demonstrable.",
  },
  "1.1": {
    moduleId: "1.1",
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
    prompt:
      "Corrige l'exercice 1.1 (triangle d'exposition). Verifie l'intention technique et la coherence du rendu.",
  },
  "1.2": {
    moduleId: "1.2",
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
    prompt:
      "Corrige l'exercice 1.2 (composition). Sois exigeant sur la lisibilite et la structure visuelle.",
  },
  "1.3": {
    moduleId: "1.3",
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
    prompt:
      "Corrige l'exercice 1.3 (couleur). Verifie harmonie chromatique et intention emotionnelle.",
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
