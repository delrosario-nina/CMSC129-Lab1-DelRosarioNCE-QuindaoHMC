import type { OneShot } from "../types/types";

// central mock data for multiple pages
export const Library: OneShot[] = [
  {
    id: 1,
    title: "The Stellar Swordmaster",
    author: "StarForgedAuthor",
    published: "2024-01-15",
    lastUpdated: "02-28-2026",
    genres: ["Action", "Fantasy", "Manhwa"],
    tags: ["Reincarnation", "Martial Arts", "Adventure"],
    words: 184320,
    synopsis:
      "A legendary swordmaster reincarnates and rises through the ranks of a world governed by magic and steel....",
    content: "...",
  },
  {
    id: 2,
    title: "The Infinite Mage",
    lastUpdated: "02-28-2026",
    author: "ArcaneScribe",
    published: "2023-11-20",
    words: 256000,
    genres: ["Action", "Adventure", "Fantasy"],
    tags: ["Magic", "Reincarnation", "Power Fantasy"],
    synopsis:
      "Born without magic in a world ruled by mages, a boy's obsession leads him to uncover powers that shake the very foundations of the magical order....",
    content: "...",
  },
];


export const allWorks: OneShot[] = [
  {
    id: 4,
    title: "Sakamoto Days",
    lastUpdated: "02-28-2026",
    author: "Yuto Suzuki",
    published: "2023-05-10",
    words: 128000,
    genres: ["Action", "Comedy", "Manga"],
    tags: ["Action", "Comedy", "Manga"],
    synopsis:
      "A legendary hitman who retired to live a peaceful life as a convenience store owner is pulled back into the underworld because of his past...",
    content: "...",
  },
  {
    id: 5,
    title: "Solo Leveling",
    lastUpdated: "02-28-2026",
    author: "Chugong",
    published: "2022-08-01",
    words: 220000,
    genres: ["Action", "Fantasy", "Adventure"],
    tags: ["Regression", "System", "Weak Protagonist"],
    synopsis:
      "The weakest hunter of all mankind rises to become the most powerful being in a world overrun by dungeons and monsters....",
    content: "...",
  },
  {
    id: 6,
    title: "Blue Lock",
    lastUpdated: "02-26-2026",
    author: "Muneyuki Kaneshiro",
    published: "2021-09-15",
    words: 150000,
    genres: ["Sports", "Drama", "Manga"],
    tags: ["Soccer", "IDK", "Wubulluhbulluh"],
    synopsis:
      "Three hundred strikers compete in a radical training program to forge Japan's ultimate egotist striker for the World Cup....",
    content: "...",
  },
];

export const recentlyUpdated: OneShot[] = [
  {
    id: 9,
    title: "Omniscient Reader's Viewpoint",
    lastUpdated: "02-28-2026",
    author: "Muneyuki Kaneshiro",
    published: "2023-01-15",
    words: 180000,
    genres: ["Action", "Adventure", "Fantasy", "Thriller"],
    tags: ["Reincarnation", "Game World", "Adventure"],
    synopsis:
      "A reader finds himself transported into the world of the only novel he ever read to completion — and he's the only one who knows how it ends....",
    content: "...",
  },
  {
    id: 10,
    title: "The Beginning After the End",
    lastUpdated: "02-27-2026",
    author: "TurtleMe",
    published: "2022-11-20",
    words: 200000,
    genres: ["Action", "Fantasy", "Adventure", "Romance"],
    tags: ["Reincarnation", "Magic", "Adventure"],
    synopsis:
      "A king with unrivaled strength is reincarnated into a new world of magic and monsters, seeking to rediscover his purpose....",
    content: "...",
  },
];

// dashboard-specific mock arrays
export const userBookmarkedStories: OneShot[] = [];

export const userOwnWorks: OneShot[] = [
  {
    id: 101,
    title: "The Forgotten Kingdom",
    author: "Current User",
    published: "2026-01-10",
    lastUpdated: "03-01-2026",
    genres: ["Fantasy", "Adventure"],
    tags: ["Original", "In Progress"],
    words: 45320,
    synopsis:
      "A tale of a kingdom lost to time, where an unlikely hero must uncover its secrets to save the present world from darkness....",
    content: "...",
  },
  {
    id: 102,
    title: "Echoes of Tomorrow",
    author: "Current User",
    published: "2025-11-20",
    lastUpdated: "02-25-2026",
    genres: ["Science Fiction", "Mystery"],
    tags: ["Original", "Completed"],
    words: 78900,
    synopsis:
      "In a world where technology has blurred the lines between reality and simulation, one programmer discovers a hidden message embedded in the code of reality....",
    content: "...",
  },
];

