import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../api/client";
import { useStories, invalidateStoriesCache } from "../../hooks/useStories"; // ✅
import type { OneShot } from "../stories/types/types";

const ConfirmModal = ({
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}
    onClick={onCancel}
  >
    <div
      style={{
        backgroundColor: "#1a1a1a",
        border: "1px solid #333333",
        borderRadius: "12px",
        padding: "28px 32px",
        maxWidth: "400px",
        width: "90%",
        boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <h3 style={{ margin: "0 0 12px 0", fontSize: "16px", color: "#ffffff" }}>
        {title}
      </h3>
      <p
        style={{
          margin: "0 0 24px 0",
          fontSize: "14px",
          color: "#9ca3af",
          lineHeight: "1.6",
        }}
      >
        {message}
      </p>
      <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
        <button
          onClick={onCancel}
          style={{
            padding: "8px 20px",
            borderRadius: "6px",
            border: "1px solid #333333",
            backgroundColor: "transparent",
            color: "#9ca3af",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#252525")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "transparent")
          }
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          style={{
            padding: "8px 20px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#7f1d1d",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#991b1b")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#7f1d1d")
          }
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
);

export const MyWorksPage = () => {
  const navigate = useNavigate();
  const currentAuthor = localStorage.getItem("currentAuthor") || "Anonymous";

  // ✅ replaces useState + useEffect + apiClient fetch
  const { data, loading, error } = useStories({ author: currentAuthor });
  const myStories = data ?? [];

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<OneShot> | null>(
    null,
  );
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  // local override so edits show immediately without waiting for cache
  const [localEdits, setLocalEdits] = useState<
    Record<string, Partial<OneShot>>
  >({});

  const handleEditClick = (story: OneShot) => {
    setEditingId(story._id);
    setEditFormData({ ...story });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editFormData) return;
    try {
      await apiClient.put(`/stories/${editingId}`, editFormData);
      setLocalEdits((prev) => ({ ...prev, [editingId]: editFormData }));
      setEditingId(null);
      setEditFormData(null);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update story");
    }
  };

  const handleDeleteConfirmed = async () => {
    if (!deleteTargetId) return;
    try {
      await apiClient.delete(`/stories/${deleteTargetId}`);
      invalidateStoriesCache();
      window.location.reload();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete story");
    } finally {
      setDeleteTargetId(null);
    }
  };

  const styles = {
    page: {
      backgroundColor: "#111111",
      minHeight: "100vh",
      color: "#ffffff",
      padding: "40px 20px",
    } as React.CSSProperties,
    inner: { maxWidth: "1100px", margin: "0 auto" } as React.CSSProperties,
    heading: {
      fontSize: "32px",
      fontWeight: "800",
      marginBottom: "32px",
    } as React.CSSProperties,
    emptyState: {
      textAlign: "center" as const,
      padding: "60px 20px",
      color: "#6b7280",
    } as React.CSSProperties,
    storyCard: {
      backgroundColor: "#161616",
      border: "1px solid #222222",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "16px",
      transition: "all 0.2s ease",
    } as React.CSSProperties,
    storyTitle: {
      fontSize: "18px",
      fontWeight: "700",
      marginBottom: "8px",
      color: "#ffffff",
    } as React.CSSProperties,
    storyMeta: {
      fontSize: "12px",
      color: "#6b7280",
      marginBottom: "12px",
      display: "flex",
      gap: "16px",
      flexWrap: "wrap" as const,
    } as React.CSSProperties,
    buttonGroup: {
      display: "flex",
      gap: "8px",
      justifyContent: "flex-start",
      marginTop: "12px",
    } as React.CSSProperties,
    button: (variant: "primary" | "secondary" | "danger") =>
      ({
        padding: "8px 16px",
        borderRadius: "6px",
        border: "none",
        fontSize: "13px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s ease",
        backgroundColor:
          variant === "primary"
            ? "#346eb6"
            : variant === "secondary"
              ? "#4b5563"
              : "#7f1d1d",
        color: "#ffffff",
      }) as React.CSSProperties,
    editForm: {
      backgroundColor: "#1a1a1a",
      border: "1px solid #333333",
      borderRadius: "8px",
      padding: "16px",
      marginTop: "12px",
    } as React.CSSProperties,
    input: {
      backgroundColor: "#1e1e1e",
      border: "1px solid #2e2e2e",
      borderRadius: "6px",
      padding: "8px 12px",
      color: "#e5e7eb",
      fontSize: "13px",
      marginBottom: "8px",
      width: "100%",
      boxSizing: "border-box" as const,
      fontFamily: "inherit",
    } as React.CSSProperties,
    textarea: {
      backgroundColor: "#1e1e1e",
      border: "1px solid #2e2e2e",
      borderRadius: "6px",
      padding: "8px 12px",
      color: "#e5e7eb",
      fontSize: "13px",
      marginBottom: "8px",
      width: "100%",
      boxSizing: "border-box" as const,
      fontFamily: "inherit",
      minHeight: "80px",
      resize: "vertical" as const,
    } as React.CSSProperties,
  };

  if (loading)
    return (
      <div style={styles.page}>
        <div style={styles.inner}>
          <p style={{ color: "#6b7280" }}>Loading your stories...</p>
        </div>
      </div>
    );
  if (error)
    return (
      <div style={styles.page}>
        <div style={styles.inner}>
          <p style={{ color: "#ef5350" }}>{error.message}</p>
        </div>
      </div>
    );

  // Merge hook data with any local edits made this session
  const displayedStories = myStories.map((s) =>
    localEdits[s._id] ? { ...s, ...localEdits[s._id] } : s,
  );

  return (
    <div style={styles.page}>
      {deleteTargetId && (
        <ConfirmModal
          title="Delete Story"
          message="Are you sure you want to delete this story? This action cannot be undone."
          confirmLabel="Delete"
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setDeleteTargetId(null)}
        />
      )}

      <div style={styles.inner}>
        <h1 style={styles.heading}>My Written Works</h1>

        {displayedStories.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={{ marginBottom: "16px" }}>
              You haven't published any stories yet.
            </p>
            <button
              onClick={() => navigate("/write")}
              style={{ ...styles.button("primary"), display: "inline-block" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#60a5fa")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#346eb6")
              }
            >
              Write a Story
            </button>
          </div>
        ) : (
          <div>
            {displayedStories.map((story) => (
              <div
                key={story._id}
                style={styles.storyCard}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "#383838";
                  (e.currentTarget as HTMLDivElement).style.backgroundColor =
                    "#1a1a1a";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "#222222";
                  (e.currentTarget as HTMLDivElement).style.backgroundColor =
                    "#161616";
                }}
              >
                {editingId === story._id ? (
                  <div style={styles.editForm}>
                    <h3 style={{ marginTop: 0, marginBottom: "12px" }}>
                      Edit Story
                    </h3>
                    <div>
                      <label style={{ fontSize: "12px", color: "#6b7280" }}>
                        Title
                      </label>
                      <input
                        style={styles.input}
                        value={editFormData?.title || ""}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#6b7280" }}>
                        Synopsis
                      </label>
                      <textarea
                        style={styles.textarea}
                        value={editFormData?.synopsis || ""}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            synopsis: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={handleSaveEdit}
                        style={styles.button("primary")}
                        onMouseEnter={(e) =>
                          ((
                            e.currentTarget as HTMLButtonElement
                          ).style.backgroundColor = "#60a5fa")
                        }
                        onMouseLeave={(e) =>
                          ((
                            e.currentTarget as HTMLButtonElement
                          ).style.backgroundColor = "#346eb6")
                        }
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        style={styles.button("secondary")}
                        onMouseEnter={(e) =>
                          ((
                            e.currentTarget as HTMLButtonElement
                          ).style.backgroundColor = "#5a6370")
                        }
                        onMouseLeave={(e) =>
                          ((
                            e.currentTarget as HTMLButtonElement
                          ).style.backgroundColor = "#4b5563")
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 style={styles.storyTitle}>{story.title}</h3>
                    <div style={styles.storyMeta}>
                      <span>Published: {story.published}</span>
                      <span>Updated: {story.lastUpdated}</span>
                      <span>Words: {story.words.toLocaleString()}</span>
                    </div>
                    {story.synopsis && (
                      <p style={{ fontSize: "13px", color: "#d1d5db" }}>
                        {story.synopsis}
                      </p>
                    )}
                    <div style={styles.buttonGroup}>
                      <button
                        onClick={() => navigate(`/reading/${story._id}`)}
                        style={styles.button("primary")}
                        onMouseEnter={(e) =>
                          ((
                            e.currentTarget as HTMLButtonElement
                          ).style.backgroundColor = "#60a5fa")
                        }
                        onMouseLeave={(e) =>
                          ((
                            e.currentTarget as HTMLButtonElement
                          ).style.backgroundColor = "#346eb6")
                        }
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEditClick(story)}
                        style={styles.button("secondary")}
                        onMouseEnter={(e) =>
                          ((
                            e.currentTarget as HTMLButtonElement
                          ).style.backgroundColor = "#5a6370")
                        }
                        onMouseLeave={(e) =>
                          ((
                            e.currentTarget as HTMLButtonElement
                          ).style.backgroundColor = "#4b5563")
                        }
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(story._id)}
                        style={styles.button("danger")}
                        onMouseEnter={(e) =>
                          ((
                            e.currentTarget as HTMLButtonElement
                          ).style.backgroundColor = "#991b1b")
                        }
                        onMouseLeave={(e) =>
                          ((
                            e.currentTarget as HTMLButtonElement
                          ).style.backgroundColor = "#7f1d1d")
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
