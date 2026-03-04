import { Link, useNavigate } from "react-router-dom";
import type { OneShot } from "../types/types";
import { AddToLibraryButton } from "../../dashboard/library/components/AddToLibraryButton";

interface Props {
  story: OneShot;
}

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
  section: {
    marginBottom: "48px",
  } as React.CSSProperties,
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
  } as React.CSSProperties,
  seeMore: {
    fontSize: "14px",
    color: "#6b7280",
    textDecoration: "none",
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

// badge helpers
const GenreBadge = ({ genre }: { genre: string }) => (
  <span style={styles.GenreBadge}>{genre}</span>
);

const TagBadge = ({ tag }: { tag: string }) => (
  <span style={styles.TagBadge}>{tag}</span>
);

export const StoryCard = ({ story }: Props) => {
  return (
    <Link to={`/story/${story.id}`} className="block">
      <div className="border border-gray-300 rounded p-4 hover:shadow-md transition-shadow bg-gray-50">
        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600">
          {story.title}
        </h2>

        {/* Metadata: chapters, update frequency, readers, reviews, date */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-600 mb-3">
          <div>{story.published}</div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {story.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm line-clamp-3 mb-3">
          {story.synopsis}
        </p>

        {/* Add to Library Button */}
        <div onClick={(e) => e.preventDefault()}>
          <AddToLibraryButton storyId={story.id.toString()} />
        </div>
      </div>
    </Link>
  );
};

export const OneShotCard = ({
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
      onClick={() => navigate(`/novel/${oneshot.id}`)}
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
        <span> {oneshot.lastUpdated}</span>
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
