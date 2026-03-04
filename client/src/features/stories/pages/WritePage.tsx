import { useState } from "react";

// --- Types ---
interface WritingFormData {
  title: string;
  synopsis: string;
  content: string;
  genres: string[];
  tags: string[];
}

// --- Available Genres ---
const genres = [
  "Action",
  "Adventure",
  "Fantasy",
  "Science Fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Drama",
  "Comedy",
  "Horror",
  "Slice of Life",
  "Historical",
];

const tags = [
  "Male Protagonist",
  "Female Protagonist",
  "Magic",
  "Isekai",
  "School Life",
  "Supernatural",
  "Post-Apocalyptic",
  "Cyberpunk",
  "Space Opera",
  "Time Travel",
  "Omegaverse",
];

// --- Styles ---
const styles = {
  page: {
    backgroundColor: "#111111",
    minHeight: "100vh",
    color: "#ffffff",
  } as React.CSSProperties,
  inner: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px 40px",
  } as React.CSSProperties,
  pageTitle: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#ffffff",
    margin: "0 0 32px 0",
  } as React.CSSProperties,
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
  } as React.CSSProperties,
  formGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  } as React.CSSProperties,
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#d1d5db",
  } as React.CSSProperties,
  input: {
    backgroundColor: "#1e1e1e",
    border: "1px solid #2e2e2e",
    borderRadius: "8px",
    padding: "12px 14px",
    fontSize: "14px",
    color: "#e5e7eb",
    outline: "none",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  } as React.CSSProperties,
  textarea: {
    backgroundColor: "#1e1e1e",
    border: "1px solid #2e2e2e",
    borderRadius: "8px",
    padding: "12px 14px",
    fontSize: "14px",
    color: "#e5e7eb",
    outline: "none",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
    fontFamily: "inherit",
    resize: "vertical" as const,
  } as React.CSSProperties,
  select: {
    backgroundColor: "#1e1e1e",
    border: "1px solid #2e2e2e",
    borderRadius: "8px",
    padding: "12px 14px",
    fontSize: "14px",
    color: "#e5e7eb",
    outline: "none",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  } as React.CSSProperties,
  genreContainer: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "8px",
    marginTop: "12px",
  } as React.CSSProperties,
  genreButton: (isSelected: boolean) =>
    ({
      padding: "8px 14px",
      borderRadius: "6px",
      border: isSelected ? "1px solid #FFFFFF" : "1px solid #383838",
      backgroundColor: isSelected ? "rgba(19, 38, 207, 0.05)" : "#252525",
      color: isSelected ? "#60a5fa" : "#d1d5db",
      fontSize: "13px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.15s ease",
    }) as React.CSSProperties,
  tagInputContainer: {
    display: "flex",
    gap: "8px",
    marginTop: "12px",
  } as React.CSSProperties,
  tagInput: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    border: "1px solid #2e2e2e",
    borderRadius: "8px",
    padding: "12px 14px",
    fontSize: "14px",
    color: "#e5e7eb",
    outline: "none",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  } as React.CSSProperties,
  addTagButton: {
    backgroundColor: "#2e2e2e",
    border: "1px solid #383838",
    borderRadius: "8px",
    padding: "12px 14px",
    color: "#9ca3af",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.15s ease",
  } as React.CSSProperties,
  tagsList: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "8px",
    marginTop: "12px",
  } as React.CSSProperties,
  tag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    backgroundColor: "rgba(19, 38, 207, 0.05)",
    border: "1px solid #FFFFFF",
    borderRadius: "6px",
    color: "#60a5fa",
    fontSize: "13px",
    fontWeight: "500",
  } as React.CSSProperties,
  removeTagButton: {
    background: "none",
    border: "none",
    color: "#60a5fa",
    cursor: "pointer",
    fontSize: "16px",
    padding: "0",
    lineHeight: "1",
  } as React.CSSProperties,
  submitButton: {
    backgroundColor: "#346eb6",
    color: "#ffffff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.15s ease",
    marginTop: "8px",
  } as React.CSSProperties,
  submitButtonHover: {
    backgroundColor: "#60a5fa",
  } as React.CSSProperties,
};

export const WritePage = () => {
  const [formData, setFormData] = useState<WritingFormData>({
    title: "",
    synopsis: "",
    content: "",
    genres: [],
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleSynopsisChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, synopsis: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, content: e.target.value });
  };

  const handleGenreToggle = (genre: string) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit story", formData);
    // call API later
  };

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <h1 style={styles.pageTitle}>Write a New Story</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Title Field */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Story Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Enter story title..."
              style={styles.input}
              onFocus={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor =
                  "#FFFFFF";
                (e.currentTarget as HTMLInputElement).style.boxShadow =
                  "0 0 0 2px rgba(19, 38, 207, 0.05)";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor =
                  "#2e2e2e";
                (e.currentTarget as HTMLInputElement).style.boxShadow = "none";
              }}
            />
          </div>

          {/* Synopsis Field */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Synopsis</label>
            <textarea
              value={formData.synopsis}
              onChange={handleSynopsisChange}
              placeholder="Write a brief synopsis for your story..."
              style={{ ...styles.textarea, minHeight: "100px" }}
              onFocus={(e) => {
                (e.currentTarget as HTMLTextAreaElement).style.borderColor =
                  "#FFFFFF";
                (e.currentTarget as HTMLTextAreaElement).style.boxShadow =
                  "0 0 0 2px rgba(19, 38, 207, 0.05)";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLTextAreaElement).style.borderColor =
                  "#2e2e2e";
                (e.currentTarget as HTMLTextAreaElement).style.boxShadow =
                  "none";
              }}
            />
          </div>

          {/* Genres Field */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Genres</label>
            <div style={styles.genreContainer}>
              {genres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => handleGenreToggle(genre)}
                  style={styles.genreButton(formData.genres.includes(genre))}
                  onMouseEnter={(e) => {
                    if (!formData.genres.includes(genre)) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "#555555";
                      (
                        e.currentTarget as HTMLButtonElement
                      ).style.backgroundColor = "#2e2e2e";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!formData.genres.includes(genre)) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "#383838";
                      (
                        e.currentTarget as HTMLButtonElement
                      ).style.backgroundColor = "#252525";
                    }
                  }}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Tags Field */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Tags</label>
            <div style={styles.tagInputContainer}>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagInputKeyPress}
                placeholder="Add a tag and press Enter..."
                style={styles.tagInput}
                onFocus={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderColor =
                    "#FFFFFF";
                  (e.currentTarget as HTMLInputElement).style.boxShadow =
                    "0 0 0 2px rgba(19, 38, 207, 0.05)";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderColor =
                    "#2e2e2e";
                  (e.currentTarget as HTMLInputElement).style.boxShadow =
                    "none";
                }}
              />
              <button
                type="button"
                onClick={handleAddTag}
                style={styles.addTagButton}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "#555555";
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#383838";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#d1d5db";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "#383838";
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#2e2e2e";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#9ca3af";
                }}
              >
                Add Tag
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div style={styles.tagsList}>
                {formData.tags.map((tag, index) => (
                  <div key={index} style={styles.tag}>
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                      style={styles.removeTagButton}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Content Field */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Story Content</label>
            <textarea
              value={formData.content}
              onChange={handleContentChange}
              placeholder="Write your story here..."
              style={{ ...styles.textarea, minHeight: "400px" }}
              onFocus={(e) => {
                (e.currentTarget as HTMLTextAreaElement).style.borderColor =
                  "#FFFFFF";
                (e.currentTarget as HTMLTextAreaElement).style.boxShadow =
                  "0 0 0 2px rgba(19, 38, 207, 0.05)";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLTextAreaElement).style.borderColor =
                  "#2e2e2e";
                (e.currentTarget as HTMLTextAreaElement).style.boxShadow =
                  "none";
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={styles.submitButton}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, styles.submitButtonHover)
            }
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#346eb6";
            }}
          >
            Save & Publish
          </button>
        </form>
      </div>
    </div>
  );
};
