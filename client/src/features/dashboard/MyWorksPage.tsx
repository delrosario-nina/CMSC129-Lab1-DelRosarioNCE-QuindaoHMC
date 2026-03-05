import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../api/client";
import type { OneShot } from "../stories/types/types";

export const MyWorksPage = () => {
  const navigate = useNavigate();
  const [myStories, setMyStories] = useState<OneShot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<OneShot> | null>(
    null,
  );

  const currentAuthor = localStorage.getItem("currentAuthor") || "Anonymous";

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/stories");
        const data = response.data;
        const stories: OneShot[] = Array.isArray(data)
          ? data
          : (data.stories ?? data.data ?? data.works ?? []);
        const userStories = stories.filter(
          (story: OneShot) => story.author === currentAuthor,
        );
        setMyStories(userStories);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load your stories");
        console.error("Error fetching stories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [currentAuthor]);

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
      setMyStories((prev) =>
        prev.map((story) =>
          story._id === editingId ? { ...story, ...editFormData } : story,
        ),
      );
      setEditingId(null);
      setEditFormData(null);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update story");
      console.error("Error updating story:", err);
    }
  };

  const handleDeleteStory = async (storyId: string) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;

    setDeletingId(storyId);
    try {
      await apiClient.delete(`/stories/${storyId}`);
      setMyStories((prev) => prev.filter((story) => story._id !== storyId));
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete story");
      console.error("Error deleting story:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const styles = {
    page: {
      backgroundColor: "#111111",
      minHeight: "100vh",
      color: "#ffffff",
      padding: "40px 20px",
    } as React.CSSProperties,
    inner: {
      maxWidth: "900px",
      margin: "0 auto",
    } as React.CSSProperties,
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

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.inner}>
          <p style={{ color: "#6b7280" }}>Loading your stories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <div style={styles.inner}>
          <p style={{ color: "#ef5350" }}>{error}</p>
        </div>
      </div>
    );
  }

  if (myStories.length === 0) {
    return (
      <div style={styles.page}>
        <div style={styles.inner}>
          <h1 style={styles.heading}>My Written Works</h1>
          <div style={styles.emptyState}>
            <p style={{ marginBottom: "16px" }}>
              You haven't published any stories yet.
            </p>
            <button
              onClick={() => navigate("/write")}
              style={{ ...styles.button("primary"), display: "inline-block" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#60a5fa";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "#346eb6";
              }}
            >
              Write a Story
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <h1 style={styles.heading}>My Written Works</h1>
        <div>
          {myStories.map((story) => (
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
                // Edit Mode
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
                      onMouseEnter={(e) => {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.backgroundColor = "#60a5fa";
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.backgroundColor = "#346eb6";
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      style={styles.button("secondary")}
                      onMouseEnter={(e) => {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.backgroundColor = "#5a6370";
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.backgroundColor = "#4b5563";
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
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
                      onMouseEnter={(e) => {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.backgroundColor = "#60a5fa";
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.backgroundColor = "#346eb6";
                      }}
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEditClick(story)}
                      style={styles.button("secondary")}
                      onMouseEnter={(e) => {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.backgroundColor = "#5a6370";
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.backgroundColor = "#4b5563";
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteStory(story._id)}
                      disabled={deletingId === story._id}
                      style={{
                        ...styles.button("danger"),
                        opacity: deletingId === story._id ? 0.6 : 1,
                      }}
                      onMouseEnter={(e) => {
                        if (deletingId !== story._id) {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.backgroundColor = "#991b1b";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (deletingId !== story._id) {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.backgroundColor = "#7f1d1d";
                        }
                      }}
                    >
                      {deletingId === story._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
