export type CognitiveProfile = "intuitif" | "analytique" | "operatoire";
export type ExperienceLevel = "debutant" | "intermediaire" | "avance";

export interface LearningProfileData {
  age?: number | null;
  cognitiveProfile?: CognitiveProfile;
  experienceLevel?: ExperienceLevel;
  weeklyHours?: number | null;
  primaryGoal?: string;
  notes?: string;
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

  return validAge && validCognitive && validExperience && validWeeklyHours && validPrimaryGoal && validNotes;
}
