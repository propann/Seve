export interface Module {
  id: string;
  slug: string; // Utilisé pour les dossiers /courses/m[slug]
  title: string;
  objective: string;
  masters: string[];
  exercises: string[];
}

export interface Level {
  id: number;
  name: string;
  level_slug: string;
  description: string;
  modules: Module[];
}

export const cursus: Level[] = [
  {
    id: 0,
    name: "Les Racines (Fondations & Ancres)",
    level_slug: "racines",
    description: "Ancrer l'élève dans le 'pourquoi' de la photo.",
    modules: [
      {
        id: "0.1",
        slug: "0-1",
        title: "La Lumière Captive",
        objective: "De la Camera Obscura à Niépce.",
        masters: ["Alhazen", "Niépce"],
        exercises: ["Le Sténopé Domestique"],
      },
      {
        id: "0.2",
        slug: "0-2",
        title: "La Particule et l'Onde",
        objective: "Physique de la lumière et philosophie de la trace.",
        masters: ["Einstein", "Peirce"],
        exercises: ["Le Prisme du Quotidien"],
      },
      {
        id: "0.3",
        slug: "0-3",
        title: "Philosophie de l'Image",
        objective: "Le Studium et le Punctum.",
        masters: ["Barthes", "Sontag"],
        exercises: ["Analyse de Punctum"],
      },
    ],
  },
  {
    id: 1,
    name: "Le Tronc (Fondamentaux)",
    level_slug: "tronc",
    description: "Maîtriser le 'comment' universel.",
    modules: [
      {
        id: "1.1",
        slug: "1-1",
        title: "La Trinité de l'Exposition",
        objective: "Ouverture, Vitesse, ISO.",
        masters: ["Ansel Adams"],
        exercises: ["L'Épreuve du Triangle"],
      },
      {
        id: "1.2",
        slug: "1-2",
        title: "L'Ordre dans le Chaos",
        objective: "Géométrie, Grammaire et Sémantique.",
        masters: ["Cartier-Bresson"],
        exercises: ["La Géométrie du Réel"],
      },
      {
        id: "1.3",
        slug: "1-3",
        title: "Le Spectre des Émotions",
        objective: "Température et Harmonie Chromatique.",
        masters: ["Steve McCurry"],
        exercises: ["L'Harmonie des Opposés"],
      },
      {
        id: "1.4",
        slug: "1-4",
        title: "L'Œil de Verre",
        objective: "Focales, Perspectives et Compression.",
        masters: ["Robert Capa"],
        exercises: ["L'Échelle des Perspectives"],
      },
      {
        id: "1.5",
        slug: "1-5",
        title: "L'Alchimie du Pixel",
        objective: "Post-Production et Histogramme.",
        masters: ["Ansel Adams"],
        exercises: ["Le Révélateur Numérique"],
      },
    ],
  },
  {
    id: 2,
    name: "Les Branches (Spécialisations)",
    level_slug: "branches",
    description: "Explorer les horizons avancés de l'image.",
    modules: [
      {
        id: "2.A.1",
        slug: "b2-a1",
        title: "L'Âme du Grain",
        objective: "Physique du film et émulsions.",
        masters: ["Daido Moriyama"],
        exercises: ["L'Épreuve du Grain"],
      },
      {
        id: "2.A.2",
        slug: "b2-a2",
        title: "La Mémoire des Sels",
        objective: "Développement Négatif et Chimie.",
        masters: ["Ansel Adams"],
        exercises: ["L'Image Latente"],
      },
      {
        id: "2.A.3",
        slug: "b2-a3",
        title: "L'Empreinte Matérielle",
        objective: "Tirage Argentique et Procédés Alternatifs.",
        masters: ["Man Ray"],
        exercises: ["L'Objet Sacré"],
      },
      {
        id: "2.C.1",
        slug: "b2-c1",
        title: "La Mutation du Pixel",
        objective: "Photographie Computationnelle et IA.",
        masters: ["Refik Anadol"],
        exercises: ["La Chimère Réelle"],
      },
      {
        id: "2.C.2",
        slug: "b2-c2",
        title: "Les Projecteurs du Code",
        objective: "Prompting Optique et Lumière Synthétique.",
        masters: ["Boris Eldagsen"],
        exercises: ["L'Invention du Passé"],
      },
      {
        id: "2.C.3",
        slug: "b2-c3",
        title: "L'Âme dans la Machine",
        objective: "Éthique de la Signature et Esthétique Post-Réelle.",
        masters: ["Hito Steyerl"],
        exercises: ["L'Empreinte de l'Invisible"],
      },
      {
        id: "2.U.1",
        slug: "b2-u1",
        title: "L'Instinct de la Rue",
        objective: "Anticipation et Instant Décisif.",
        masters: ["Cartier-Bresson"],
        exercises: ["L'Épreuve de l'Instant"],
      },
      {
        id: "2.U.2",
        slug: "b2-u2",
        title: "Sociologie du Regard",
        objective: "Cadrage, Contexte et Portrait de Rue.",
        masters: ["Robert Capa"],
        exercises: ["L'Épreuve Sociale"],
      },
      {
        id: "2.U.3",
        slug: "b2-u3",
        title: "La Ville Fantôme",
        objective: "Architecture, Pose Longue et Esthétique du Vide.",
        masters: ["Bernd & Hilla Becher"],
        exercises: ["Le Silence Urbain"],
      },
      {
        id: "2.N.1",
        slug: "b2-n1",
        title: "La Lumière Sauvage",
        objective: "Paysage, Météo et Géographie de l'Ombre.",
        masters: ["Ansel Adams"],
        exercises: ["L'Instant Tellurique"],
      },
      {
        id: "2.N.2",
        slug: "b2-n2",
        title: "Le Monde Miniature",
        objective: "Macrophotographie et Géométrie de l'Infiniment Petit.",
        masters: ["Karl Blossfeldt"],
        exercises: ["Le Regard de l'Insecte"],
      },
      {
        id: "2.N.3",
        slug: "b2-n3",
        title: "L'Éthique du Vivant",
        objective: "Photographie Animalière, Affût et Biologie du Regard.",
        masters: ["Vincent Munier"],
        exercises: ["L'Invisibilité Sacrée"],
      },
    ],
  },
];
