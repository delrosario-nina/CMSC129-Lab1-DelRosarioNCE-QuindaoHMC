import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../../api/client";
import type { WritingFormData } from "../types/types";

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

const AVAILABLE_TAGS = [
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
  "Fluff",
  "Angst",
  "Hurt/Comfort",
  "Slow Burn",
  "Friends to Lovers",
  "Enemies to Lovers",
  "Forbidden Love",
  "Love Triangle",
  "Obsessive Romance",
  "Tragic Romance",
  "Dark Fantasy",
  "Urban Fantasy",
  "High Fantasy",
  "Low Fantasy",
  "Dystopian",
  "Utopian",
  "Steampunk",
  "Historical Fiction",
  "Alternate History",
  "Mythology",
  "Fairy Tale Retelling",
  "Superhero",
  "Villain Protagonist",
  "Anti-Hero",
  "Non-Human Protagonist",
  "Multiple POV",
  "Epistolary",
  "Meta",
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
  // Tag autocomplete
  tagBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 12px",
    borderRadius: "8px",
    border: "1px solid #3071c1",
    backgroundColor: "#1a2a3a",
    color: "#60a5fa",
    fontSize: "13px",
    fontWeight: "500",
  } as React.CSSProperties,
  tagBadgeRemove: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "none",
    border: "none",
    color: "#60a5fa",
    cursor: "pointer",
    padding: "0",
    lineHeight: 1,
    opacity: 0.7,
    transition: "opacity 0.15s ease",
    fontSize: "14px",
  } as React.CSSProperties,
  tagBadgesRow: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "8px",
    marginBottom: "10px",
  } as React.CSSProperties,
  tagSearchInput: {
    width: "100%",
    backgroundColor: "#1e1e1e",
    border: "1px solid #2e2e2e",
    borderRadius: "8px",
    padding: "12px 14px",
    fontSize: "14px",
    color: "#e5e7eb",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  } as React.CSSProperties,
  autocompleteWrapper: {
    position: "relative" as const,
  } as React.CSSProperties,
  dropdown: {
    position: "absolute" as const,
    top: "calc(100% + 4px)",
    left: 0,
    right: 0,
    backgroundColor: "#1e1e1e",
    border: "1px solid #333333",
    borderRadius: "8px",
    maxHeight: "200px",
    overflowY: "auto" as const,
    zIndex: 50,
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
  } as React.CSSProperties,
  dropdownItem: {
    width: "100%",
    padding: "10px 14px",
    textAlign: "left" as const,
    backgroundColor: "transparent",
    border: "none",
    color: "#60a5fa",
    fontSize: "13px",
    cursor: "pointer",
    display: "block",
    transition: "background-color 0.1s ease",
  } as React.CSSProperties,
};

// --- TagAutocompleteInput ---
const TagAutocompleteInput = ({
  selectedTags,
  onAdd,
  onRemove,
}: {
  selectedTags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
}) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return AVAILABLE_TAGS.filter(
      (t) =>
        t.toLowerCase().includes(query.toLowerCase()) &&
        !selectedTags.includes(t),
    );
  }, [query, selectedTags]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (tag: string) => {
    onAdd(tag);
    setQuery("");
    setOpen(false);
  };

  return (
    <div style={{ marginTop: "12px" }}>
      {/* Badges */}
      {selectedTags.length > 0 && (
        <div style={styles.tagBadgesRow}>
          {selectedTags.map((tag) => (
            <span key={tag} style={styles.tagBadge}>
              {tag}
              <button
                type="button"
                style={styles.tagBadgeRemove}
                onClick={() => onRemove(tag)}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.opacity = "0.7")
                }
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input + dropdown */}
      <div style={styles.autocompleteWrapper} ref={wrapperRef}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (query) setOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (suggestions.length > 0) handleSelect(suggestions[0]);
            }
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder="Search tags..."
          style={styles.tagSearchInput}
          onFocusCapture={(e) => {
            (e.currentTarget as HTMLInputElement).style.borderColor = "#FFFFFF";
            (e.currentTarget as HTMLInputElement).style.boxShadow =
              "0 0 0 2px rgba(19, 38, 207, 0.05)";
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLInputElement).style.borderColor = "#2e2e2e";
            (e.currentTarget as HTMLInputElement).style.boxShadow = "none";
          }}
        />
        {open && suggestions.length > 0 && (
          <div style={styles.dropdown}>
            {suggestions.map((tag) => (
              <button
                key={tag}
                type="button"
                style={styles.dropdownItem}
                onMouseDown={() => handleSelect(tag)}
                onMouseEnter={(e) =>
                  ((
                    e.currentTarget as HTMLButtonElement
                  ).style.backgroundColor = "#252525")
                }
                onMouseLeave={(e) =>
                  ((
                    e.currentTarget as HTMLButtonElement
                  ).style.backgroundColor = "transparent")
                }
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Component ---
export const WritePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<WritingFormData>({
    title: "",
    synopsis: "",
    content: "",
    genres: [],
    tags: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleAddTag = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.title.trim()) {
      setError("Story title is required");
      return;
    }
    if (!formData.content.trim()) {
      setError("Story content is required");
      return;
    }

    setIsLoading(true);
    try {
      const author = localStorage.getItem("currentAuthor") || "Anonymous";
      const response = await apiClient.post("/stories", {
        title: formData.title,
        author,
        synopsis: formData.synopsis,
        content: formData.content,
        genres: formData.genres,
        tags: formData.tags,
      });

      // Redirect to reading page after successful publish
      navigate(`/reading/${response.data._id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to publish story");
      console.error("Error publishing story:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <h1 style={styles.pageTitle}>Write a New Story</h1>

        {error && (
          <div
            style={{
              backgroundColor: "#7f1d1d",
              color: "#fecaca",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Title */}
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

          {/* Synopsis */}
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

          {/* Genres */}
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

          {/* Tags */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Tags</label>
            <TagAutocompleteInput
              selectedTags={formData.tags}
              onAdd={handleAddTag}
              onRemove={handleRemoveTag}
            />
          </div>

          {/* Content */}
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

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.submitButton,
              opacity: isLoading ? 0.6 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#60a5fa";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#346eb6";
              }
            }}
          >
            {isLoading ? "Publishing..." : "Save & Publish"}
          </button>
        </form>
      </div>
    </div>
  );
};
