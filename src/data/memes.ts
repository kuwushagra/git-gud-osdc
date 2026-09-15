import memesJson from "./memes.json";

export type MemeItem = {
  id: string;
  name: string;
  captions: string[];
  lines: number;
  image: string;
  remoteUrl: string;
};

export type MemesCatalog = {
  "1": MemeItem[];
  "2": MemeItem[];
  "3": MemeItem[];
};

export const memes: MemesCatalog = memesJson as MemesCatalog;

export function getMemesForTeamSize(teamSize: number | null): MemeItem[] {
  if (teamSize === 1) {
    // Lone wolf: can choose from any category (1, 2, or 3 captions)
    return [...memes["1"], ...memes["2"], ...memes["3"]];
  }
  if (teamSize === 2) {
    return memes["2"];
  }
  if (teamSize === 3) {
    return memes["3"];
  }
  // Default fallback if team size not yet chosen
  return memes["1"];
}
