import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { OneShot } from "../stories/types/types";
import { apiClient } from "../../api/client";
import { OneShotCard } from "../stories/components/StoryCard";

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

  const [userWorks, setUserWorks] = useState<OneShot[]>([]);
  const [libraryEntries, setLibraryEntries] = useState<LibraryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const currentAuthor = localStorage.getItem("currentAuthor") || "Anonymous";

  useEffect(() => {
    setActiveTab(location.pathname.endsWith("/library") ? "library" : "works");
  }, [location.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resp = await apiClient.get("/stories");
        const data = resp.data;
        const stories: OneShot[] = Array.isArray(data)
          ? data
          : (data.stories ?? data.data ?? data.works ?? []);
        setUserWorks(stories.filter((s) => s.author === currentAuthor));

        try {
          const libResp = await apiClient.get("/libraries");
          const libs: LibraryEntry[] = Array.isArray(libResp.data)
            ? libResp.data
            : (libResp.data.libraries ?? libResp.data.data ?? []);
          setLibraryEntries(libs);
        } catch {
          setLibraryEntries([]);
        }

        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentAuthor]);

  const handleDeleteStory = async (storyId: string) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;
    try {
      await apiClient.delete(`/stories/${storyId}`);
      setUserWorks((prev) => prev.filter((s) => s._id !== storyId));
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete story");
    }
  };

  const handleDeleteFromLibrary = async (libId: string) => {
    if (!window.confirm("Remove this story from your library?")) return;
    try {
      await apiClient.delete(`/libraries/${libId}`);
      setLibraryEntries((prev) => prev.filter((e) => e._id !== libId));
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to remove");
    }
  };

  if (loading)
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
          <p style={{ color: "#ef5350" }}>{error}</p>
        </div>
      </div>
    );

  return (
    <div style={styles.page}>
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
                      onRemove={() => handleDeleteStory(item._id)}
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
                      onRemove={() => handleDeleteFromLibrary(entry._id)}
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
