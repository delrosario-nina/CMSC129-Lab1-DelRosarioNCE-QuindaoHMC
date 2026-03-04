import { useState } from "react";
import { useNavigate } from "react-router-dom";

// --- Types ---
interface OneShot {
  id: number;
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

// --- Mock Data ---
const userBookmarkedStories: OneShot[] = [
  // Empty for now - no bookmarked stories yet
];

const userOwnWorks: OneShot[] = [
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
    content: "Lorem ipsum dolor sit amet...",
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
    content: "Lorem ipsum dolor sit amet...",
  },
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
  header: {
    marginBottom: "32px",
  } as React.CSSProperties,
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
    paddingBottom: "0",
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
  contentArea: {
    marginTop: "32px",
  } as React.CSSProperties,
  emptyState: {
    textAlign: "center" as const,
    padding: "60px 40px",
    color: "#6b7280",
  } as React.CSSProperties,
  emptyStateIcon: {
    fontSize: "48px",
    marginBottom: "16px",
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
  addButtonHover: {
    backgroundColor: "#82baff",
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
  card: {
    padding: "16px 20px",
    borderBottom: "1px solid #222222",
    cursor: "pointer",
    transition: "background-color 0.15s ease",
    display: "block",
    textDecoration: "none",
    color: "inherit",
  } as React.CSSProperties,
  cardLast: {
    padding: "16px 20px",
    cursor: "pointer",
    transition: "background-color 0.15s ease",
    display: "block",
    textDecoration: "none",
    color: "inherit",
  } as React.CSSProperties,
  title: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#60a5fa",
    lineHeight: "1.4",
    display: "block",
  } as React.CSSProperties,
  stats: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "16px",
    marginTop: "6px",
    fontSize: "12px",
    color: "#6b7280",
  } as React.CSSProperties,
  genres: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "6px",
    marginTop: "10px",
  } as React.CSSProperties,
  tags: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "6px",
    marginTop: "6px",
  } as React.CSSProperties,
  GenreBadge: {
    fontSize: "11px",
    padding: "2px 10px",
    borderRadius: "9999px",
    backgroundColor: "#252525",
    border: "1px solid #383838",
    color: "#d1d5db",
    fontWeight: "500",
  } as React.CSSProperties,
  TagBadge: {
    fontSize: "11px",
    padding: "2px 5px",
    color: "#6b7280",
    textDecoration: "underline",
    fontWeight: "500",
  } as React.CSSProperties,
  synopsis: {
    marginTop: "10px",
    fontSize: "13px",
    color: "#9ca3af",
    lineHeight: "1.6",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
  } as React.CSSProperties,
};

// --- Sub-components ---
const GenreBadge = ({ genre }: { genre: string }) => (
  <span style={styles.GenreBadge}>{genre}</span>
);

const TagBadge = ({ tag }: { tag: string }) => (
  <span style={styles.TagBadge}>{tag}</span>
);

const OneShotCard = ({
  oneshot,
  isLast,
}: {
  oneshot: OneShot;
  isLast: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <div
      style={isLast ? styles.cardLast : styles.card}
      onClick={() => navigate(`/oneshot/${oneshot.id}`)}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLDivElement).style.backgroundColor = "#1a1a1a")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLDivElement).style.backgroundColor =
          "transparent")
      }
    >
      <span style={styles.title}>{oneshot.title}</span>

      <div style={styles.stats}>
        <span> Last Updated: {oneshot.lastUpdated}</span>
        <span> Words: {oneshot.words.toLocaleString()}</span>
      </div>

      <div style={styles.genres}>
        {oneshot.genres.map((g) => (
          <GenreBadge key={g} genre={g} />
        ))}
      </div>

      <div style={styles.tags}>
        {oneshot.tags.map((t) => (
          <TagBadge key={t} tag={t} />
        ))}
      </div>

      <p style={styles.synopsis}>{oneshot.synopsis}</p>
    </div>
  );
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
    <div style={styles.emptyStateIcon}></div>
    <h3 style={styles.emptyStateTitle}>{title}</h3>
    <p style={styles.emptyStateText}>{message}</p>
    {showButton && (
      <button
        style={styles.addButton}
        onClick={onAddClick}
        onMouseEnter={(e) =>
          Object.assign(e.currentTarget.style, styles.addButtonHover)
        }
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            "#3071c1";
        }}
      >
        + Add Work
      </button>
    )}
  </div>
);

const ContentList = ({
  items,
  emptyTitle,
  emptyMessage,
  showAddButton,
  onAddClick,
}: {
  items: OneShot[];
  emptyTitle: string;
  emptyMessage: string;
  showAddButton?: boolean;
  onAddClick?: () => void;
}) => {
  if (items.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        message={emptyMessage}
        showButton={showAddButton}
        onAddClick={onAddClick}
      />
    );
  }

  return (
    <div style={styles.cardContainer}>
      {items.map((item, i) => (
        <OneShotCard
          key={item.id}
          oneshot={item}
          isLast={i === items.length - 1}
        />
      ))}
    </div>
  );
};

// --- Main Component ---
export const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState<"works" | "library">("works");
  const navigate = useNavigate();

  const handleAddWork = () => {
    navigate("/write");
  };

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <div style={styles.header}>
          <h1 style={styles.pageTitle}>Dashboard</h1>

          {/* Tabs */}
          <div style={styles.tabContainer}>
            <button
              style={activeTab === "works" ? styles.tabActive : styles.tab}
              onClick={() => setActiveTab("works")}
              onMouseEnter={(e) => {
                if (activeTab !== "works") {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#9ca3af";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== "works") {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#6b7280";
                }
              }}
            >
              Written Works
            </button>
            <button
              style={activeTab === "library" ? styles.tabActive : styles.tab}
              onClick={() => setActiveTab("library")}
              onMouseEnter={(e) => {
                if (activeTab !== "library") {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#9ca3af";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== "library") {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#6b7280";
                }
              }}
            >
              Library
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={styles.contentArea}>
          {activeTab === "works" && (
            <>
              <div style={styles.headerWithButton}>
                <h2 style={styles.sectionTitle}>Your Written Works</h2>
                <button
                  style={styles.addButton}
                  onClick={handleAddWork}
                  onMouseEnter={(e) =>
                    Object.assign(e.currentTarget.style, styles.addButtonHover)
                  }
                  onMouseLeave={(e) => {
                    (
                      e.currentTarget as HTMLButtonElement
                    ).style.backgroundColor = "#346eb6";
                  }}
                >
                  + Add Work
                </button>
              </div>
              <ContentList
                items={userOwnWorks}
                emptyTitle="No works yet"
                emptyMessage="Start creating your first story to display it here."
                showAddButton={true}
                onAddClick={handleAddWork}
              />
            </>
          )}

          {activeTab === "library" && (
            <>
              <h2 style={styles.sectionTitle}>Bookmarked Stories</h2>
              <ContentList
                items={userBookmarkedStories}
                emptyTitle="No bookmarked stories"
                emptyMessage="Bookmark stories you love to find them here later."
                showAddButton={false}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
