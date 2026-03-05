import { useNavigate } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";

interface Props {
  oneshot: any;
}

const styles = {
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
  deleteButton: {
    position: "absolute" as const,
    top: "12px",
    right: "12px",
    background: "none",
    border: "none",
    color: "#4b5563",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    transition: "color 0.15s ease, background-color 0.15s ease",
    zIndex: 1,
  } as React.CSSProperties,
};

const GenreBadge = ({ genre }: { genre: string }) => (
  <span style={styles.GenreBadge}>{genre}</span>
);

const TagBadge = ({ tag }: { tag: string }) => (
  <span style={styles.TagBadge}>{tag}</span>
);

export const StoryCard = ({ oneshot }: Props) => {
  return (
    <div className="border border-gray-300 rounded p-4 hover:shadow-md transition-shadow bg-gray-50">
      <h2 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600">
        {oneshot.title}
      </h2>
      <div className="flex flex-wrap gap-4 text-xs text-gray-600 mb-3">
        <div>{oneshot.published}</div>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {oneshot.tags.map((tag: string) => (
          <span
            key={tag}
            className="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export const OneShotCard = ({
  oneshot,
  isLast,
  onRemove,
}: {
  oneshot: any;
  isLast: boolean;
  onRemove?: () => void;
}) => {
  const navigate = useNavigate();
  const readPath = oneshot._id
    ? `/reading/${oneshot._id}`
    : `/novel/${oneshot.id}`;

  return (
    <div
      style={{
        ...(isLast ? styles.cardLast : styles.card),
        position: "relative",
      }}
      onClick={() => navigate(readPath)}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLDivElement).style.backgroundColor = "#1a1a1a")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLDivElement).style.backgroundColor =
          "transparent")
      }
    >
      {onRemove && (
        <button
          style={styles.deleteButton}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#ef4444";
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#2a1a1a";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#4b5563";
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "transparent";
          }}
          title="Remove"
        >
          <MdOutlineDelete size={18} />
        </button>
      )}

      <span style={styles.title}>{oneshot.title}</span>

      <div style={styles.stats}>
        <span>{oneshot.lastUpdated}</span>
      </div>

      <div style={styles.genres}>
        {oneshot.genres.map((g: string) => (
          <GenreBadge key={g} genre={g} />
        ))}
      </div>

      <div style={styles.tags}>
        {oneshot.tags.map((t: string) => (
          <TagBadge key={t} tag={t} />
        ))}
      </div>

      <p style={styles.synopsis}>{oneshot.synopsis}</p>
    </div>
  );
};
