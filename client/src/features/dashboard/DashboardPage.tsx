import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { OneShot } from "../stories/types/types";
import { apiClient } from "../../api/client";
import { useStories, invalidateStoriesCache } from "../../hooks/useStories";
import { OneShotCard } from "../stories/components/StoryCard";
import { ConfirmDialog } from "../../shared/components/ConfirmDialog";

const styles = {
  page: {
    backgroundColor: "#111111",
    minHeight: "100vh",
    color: "#ffffff",
  } as React.CSSProperties,
  inner: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "40px 40px",
  } as React.CSSProperties,
  header: { marginBottom: "32px" } as React.CSSProperties,
  pageTitle: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#ffffff",
    margin: "0 0 24px 0",
  } as React.CSSProperties,
  tabContainer: {
    display: "flex",
    gap: "0",
    borderBottom: "1px solid #222222",
  } as React.CSSProperties,
  tab: {
    padding: "12px 24px",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "2px solid transparent",
    color: "#6b7280",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "color 0.15s ease, border-color 0.15s ease",
    marginBottom: "-1px",
    borderRadius: "0",
    outline: "none",
  } as React.CSSProperties,
  tabActive: {
    padding: "12px 24px",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "2px solid #60a5fa",
    color: "#60a5fa",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "color 0.15s ease, border-color 0.15s ease",
    marginBottom: "-1px",
    borderRadius: "0",
    outline: "none",
  } as React.CSSProperties,
  contentArea: { marginTop: "32px" } as React.CSSProperties,
  emptyState: {
    textAlign: "center" as const,
    padding: "60px 40px",
    color: "#6b7280",
  } as React.CSSProperties,
  emptyStateTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#d1d5db",
    marginBottom: "8px",
  } as React.CSSProperties,
  emptyStateText: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "24px",
  } as React.CSSProperties,
  addButton: {
    backgroundColor: "#60a5fa",
    color: "#ffffff",
    border: "none",
    padding: "10px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.15s ease",
  } as React.CSSProperties,
  headerWithButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
  } as React.CSSProperties,
  cardContainer: {
    backgroundColor: "#161616",
    border: "1px solid #222222",
    borderRadius: "12px",
    overflow: "hidden",
  } as React.CSSProperties,
};

const EmptyState = ({
  title,
  message,
  showButton,
  onAddClick,
}: {
  title: string;
  message: string;
  showButton?: boolean;
  onAddClick?: () => void;
}) => (
  <div style={styles.emptyState}>
    <h3 style={styles.emptyStateTitle}>{title}</h3>
    <p style={styles.emptyStateText}>{message}</p>
    {showButton && (
      <button
        style={styles.addButton}
        onClick={onAddClick}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
            "#82baff")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
            "#60a5fa")
        }
      >
        + Add Work
      </button>
    )}
  </div>
);

export const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState<"works" | "library">("works");

  interface LibraryEntry {
    _id: string;
    storyId: OneShot;
  }

  // ✅ useStories replaces the manual stories fetch
  const currentAuthor = localStorage.getItem("currentAuthor") || "Anonymous";
  const { data, loading, error } = useStories({ author: currentAuthor });
  const userWorks = data ?? [];

  const [libraryEntries, setLibraryEntries] = useState<LibraryEntry[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(true);

  const [deleteStoryId, setDeleteStoryId] = useState<string | null>(null);
  const [deleteLibId, setDeleteLibId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActiveTab(location.pathname.endsWith("/library") ? "library" : "works");
  }, [location.pathname]);

  // Library still needs its own fetch since useStories only covers /stories
  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const libResp = await apiClient.get("/libraries");
        const libs: LibraryEntry[] = Array.isArray(libResp.data)
          ? libResp.data
          : (libResp.data.libraries ?? libResp.data.data ?? []);
        setLibraryEntries(libs);
      } catch {
        setLibraryEntries([]);
      } finally {
        setLibraryLoading(false);
      }
    };
    fetchLibrary();
  }, []);

  const handleDeleteStoryConfirmed = async () => {
    if (!deleteStoryId) return;
    try {
      setDeleteError(null);
      await apiClient.delete(`/stories/${deleteStoryId}`);
      invalidateStoriesCache(); // clear cache so hook re-fetches fresh data
      window.location.reload(); // re-render with updated list
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to delete story. Please try again.";
      setDeleteError(errorMsg);
      console.error("Error deleting story:", err);
    } finally {
      setDeleteStoryId(null);
    }
  };

  const handleDeleteLibConfirmed = async () => {
    if (!deleteLibId) return;
    try {
      setDeleteError(null);
      await apiClient.delete(`/libraries/${deleteLibId}`);
      setLibraryEntries((prev) => prev.filter((e) => e._id !== deleteLibId));
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to remove from library. Please try again.";
      setDeleteError(errorMsg);
      console.error("Error removing from library:", err);
    } finally {
      setDeleteLibId(null);
    }
  };

  const isLoading = loading || libraryLoading;

  if (isLoading)
    return (
      <div style={styles.page}>
        <div style={styles.inner}>
          <p style={{ color: "#6b7280" }}>Loading dashboard…</p>
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

  return (
    <div style={styles.page}>
      {/* Error Toast */}
      {deleteError && (
        <div className="fixed bottom-4 right-4 bg-red-900/80 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-sm max-w-xs z-50">
          {deleteError}
          <button
            onClick={() => setDeleteError(null)}
            className="ml-3 text-red-400 hover:text-red-200"
          >
            ✕
          </button>
        </div>
      )}

      {deleteStoryId && (
        <ConfirmDialog
          title="Delete Story"
          message="Are you sure you want to delete this story? This action cannot be undone."
          confirmLabel="Delete"
          isDangerous
          onConfirm={handleDeleteStoryConfirmed}
          onCancel={() => setDeleteStoryId(null)}
        />
      )}
      {deleteLibId && (
        <ConfirmDialog
          title="Remove from Library"
          message="Are you sure you want to remove this story from your library?"
          confirmLabel="Remove"
          isDangerous
          onConfirm={handleDeleteLibConfirmed}
          onCancel={() => setDeleteLibId(null)}
        />
      )}

      <div style={styles.inner}>
        <div style={styles.header}>
          <h1 style={styles.pageTitle}>Dashboard</h1>
          <div style={styles.tabContainer}>
            <button
              style={activeTab === "works" ? styles.tabActive : styles.tab}
              onClick={() => navigate("/dashboard/written-works")}
              onMouseEnter={(e) => {
                if (activeTab !== "works")
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#9ca3af";
              }}
              onMouseLeave={(e) => {
                if (activeTab !== "works")
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#6b7280";
              }}
            >
              Written Works
            </button>
            <button
              style={activeTab === "library" ? styles.tabActive : styles.tab}
              onClick={() => navigate("/dashboard/library")}
              onMouseEnter={(e) => {
                if (activeTab !== "library")
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#9ca3af";
              }}
              onMouseLeave={(e) => {
                if (activeTab !== "library")
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#6b7280";
              }}
            >
              Library
            </button>
          </div>
        </div>

        <div style={styles.contentArea}>
          {activeTab === "works" && (
            <>
              <div style={styles.headerWithButton}>
                <h2 style={styles.sectionTitle}>Your Written Works</h2>
                <button
                  style={styles.addButton}
                  onClick={() => navigate("/write")}
                  onMouseEnter={(e) =>
                    ((
                      e.currentTarget as HTMLButtonElement
                    ).style.backgroundColor = "#82baff")
                  }
                  onMouseLeave={(e) =>
                    ((
                      e.currentTarget as HTMLButtonElement
                    ).style.backgroundColor = "#60a5fa")
                  }
                >
                  + Add Work
                </button>
              </div>
              {userWorks.length === 0 ? (
                <EmptyState
                  title="No works yet"
                  message="Start creating your first story to display it here."
                  showButton
                  onAddClick={() => navigate("/write")}
                />
              ) : (
                <div style={styles.cardContainer}>
                  {userWorks.map((item, i) => (
                    <OneShotCard
                      key={item._id}
                      oneshot={item}
                      isLast={i === userWorks.length - 1}
                      onRemove={() => setDeleteStoryId(item._id)}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "library" && (
            <>
              <h2 style={{ ...styles.sectionTitle, marginBottom: "24px" }}>
                Bookmarked Stories
              </h2>
              {libraryEntries.length === 0 ? (
                <EmptyState
                  title="No bookmarked stories"
                  message="Bookmark stories you love to find them here later."
                />
              ) : (
                <div style={styles.cardContainer}>
                  {libraryEntries.map((entry, i) => (
                    <OneShotCard
                      key={entry._id}
                      oneshot={entry.storyId}
                      isLast={i === libraryEntries.length - 1}
                      onRemove={() => setDeleteLibId(entry._id)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
