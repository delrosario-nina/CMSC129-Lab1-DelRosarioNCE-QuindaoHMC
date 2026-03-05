export interface WritingFormData {
  title: string;
  synopsis: string;
  content: string;
  genres: string[];
  tags: string[];
}

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validate story form data
 * Returns null if valid, or error message if invalid
 */
export const validateStoryForm = (data: WritingFormData): string | null => {
  // Title validation
  const titleTrimmed = data.title.trim();
  if (!titleTrimmed) {
    return "Story title is required";
  }
  if (titleTrimmed.length < 3) {
    return "Title must be at least 3 characters";
  }
  if (titleTrimmed.length > 300) {
    return "Title must not exceed 300 characters";
  }

  // Synopsis validation
  if (data.synopsis.length > 2000) {
    return "Synopsis must not exceed 2000 characters";
  }

  // Content validation
  const contentTrimmed = data.content.trim();
  if (!contentTrimmed) {
    return "Story content is required";
  }
  if (contentTrimmed.length < 10) {
    return "Content must be at least 10 characters";
  }
  if (contentTrimmed.length > 1000000) {
    return "Content must not exceed 1MB (approximately 1,000,000 characters)";
  }

  // Genres validation
  if (data.genres.length === 0) {
    return "Select at least one genre";
  }
  if (data.genres.length > 10) {
    return "You can select at most 10 genres";
  }

  // Tags validation
  if (data.tags.length > 30) {
    return "You can add at most 30 tags";
  }

  // Check for duplicate tags
  const uniqueTags = new Set(data.tags);
  if (uniqueTags.size !== data.tags.length) {
    return "Duplicate tags are not allowed";
  }

  return null;
};

/**
 * Get a user-friendly word count message
 */
export const getWordCount = (text: string): number => {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
};
