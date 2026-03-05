export interface OneShot {
  _id: string;
  title: string;
  author: string;
  genres: string[];
  tags: string[];
  published: string;
  lastUpdated: string;
  words: number;
  synopsis: string;
  content: string;
}

export interface WritingFormData {
  title: string;
  synopsis: string;
  content: string;
  genres: string[];
  tags: string[];
}
