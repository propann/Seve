export type CognitiveProfile = "intuitif" | "analytique" | "operatoire";
export type ExperienceLevel = "debutant" | "intermediaire" | "avance";
export type SeedKey = "photographie" | "cinema" | "design" | "linux";
export type SeedEquipmentMap = Partial<Record<SeedKey, Record<string, number>>>;

export interface ExerciseSubmission {
  id: string;
  moduleId: string;
  imageUrl: string;
  storageKey: string;
  mimeType: string;
  size: number;
  submittedAt: string;
}

export interface LearningProfileData {
  age?: number | null;
  cognitiveProfile?: CognitiveProfile;
  experienceLevel?: ExperienceLevel;
  weeklyHours?: number | null;
  primaryGoal?: string;
  notes?: string;
  seedEquipment?: SeedEquipmentMap;
  exerciseSubmissions?: ExerciseSubmission[];
}

export function isLearningProfileData(value: unknown): value is LearningProfileData {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const data = value as Record<string, unknown>;

  const validAge = data.age === undefined || data.age === null || typeof data.age === "number";
  const validCognitive =
    data.cognitiveProfile === undefined ||
    data.cognitiveProfile === "intuitif" ||
    data.cognitiveProfile === "analytique" ||
    data.cognitiveProfile === "operatoire";
  const validExperience =
    data.experienceLevel === undefined ||
    data.experienceLevel === "debutant" ||
    data.experienceLevel === "intermediaire" ||
    data.experienceLevel === "avance";
  const validWeeklyHours = data.weeklyHours === undefined || data.weeklyHours === null || typeof data.weeklyHours === "number";
  const validPrimaryGoal = data.primaryGoal === undefined || typeof data.primaryGoal === "string";
  const validNotes = data.notes === undefined || typeof data.notes === "string";
  const validSeedEquipment =
    data.seedEquipment === undefined ||
    (typeof data.seedEquipment === "object" &&
      data.seedEquipment !== null &&
      !Array.isArray(data.seedEquipment) &&
      Object.entries(data.seedEquipment as Record<string, unknown>).every(([seed, inventory]) => {
        if (!["photographie", "cinema", "design", "linux"].includes(seed)) return false;
        if (!inventory || typeof inventory !== "object" || Array.isArray(inventory)) return false;
        return Object.values(inventory as Record<string, unknown>).every((quantity) => typeof quantity === "number");
      }));
  const validExerciseSubmissions =
    data.exerciseSubmissions === undefined ||
    (Array.isArray(data.exerciseSubmissions) &&
      data.exerciseSubmissions.every((entry) => {
        if (!entry || typeof entry !== "object" || Array.isArray(entry)) return false;
        const row = entry as Record<string, unknown>;
        return (
          typeof row.id === "string" &&
          typeof row.moduleId === "string" &&
          typeof row.imageUrl === "string" &&
          typeof row.storageKey === "string" &&
          typeof row.mimeType === "string" &&
          typeof row.size === "number" &&
          typeof row.submittedAt === "string"
        );
      }));

  return (
    validAge &&
    validCognitive &&
    validExperience &&
    validWeeklyHours &&
    validPrimaryGoal &&
    validNotes &&
    validSeedEquipment &&
    validExerciseSubmissions
  );
}
