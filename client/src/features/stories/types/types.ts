export interface Story {
  _id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  genre: string;
  reads: number;
  votes: number;
  chapters: number;
  updateFrequency: string;
  readers: number;
  reviews: number;
  publicationDate: string;
  tags: string[];
}

export interface Novel {
  id: number;
  title: string;
  chapters: number;
  updateFrequency: string;
  readers: number;
  reviews: number;
  lastUpdated: string;
  genres: string[];
  type: "Manga" | "Manhwa" | "Manhua" | "Novel";
  synopsis: string;
}
