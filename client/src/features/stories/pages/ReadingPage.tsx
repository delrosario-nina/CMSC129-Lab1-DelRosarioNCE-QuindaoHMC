import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../../../api/client";
import { AddToLibraryButton } from "../../dashboard/library/components/AddToLibraryButton";
import { MdOutlineModeEditOutline } from "react-icons/md";
import type { OneShot } from "../types/types";
import { useAuth } from "../../../context/AuthContext";

const s = {
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
  metaBox: {
    backgroundColor: "#161616",
    border: "1px solid #222222",
    borderRadius: "12px",
    padding: "24px 28px",
    marginBottom: "40px",
  } as React.CSSProperties,
  metaRow: {
    display: "flex",
    gap: "24px",
    paddingBottom: "10px",
    paddingTop: "10px",
    borderBottom: "1px solid #1e1e1e",
    alignItems: "flex-start",
    flexWrap: "wrap" as const,
  } as React.CSSProperties,
  metaRowLast: {
    display: "flex",
    gap: "24px",
    paddingTop: "10px",
    alignItems: "flex-start",
    flexWrap: "wrap" as const,
  } as React.CSSProperties,
  metaLabel: {
    fontSize: "13px",
    color: "#6b7280",
    minWidth: "120px",
    flexShrink: 0,
    paddingTop: "2px",
  } as React.CSSProperties,
  metaLabelMobile: {
    fontSize: "13px",
    color: "#6b7280",
    flexShrink: 0,
    paddingTop: "2px",
  } as React.CSSProperties,
  metaLabelBold: {
    fontSize: "13px",
    color: "#9ca3af",
    fontWeight: "700",
    minWidth: "120px",
    flexShrink: 0,
    paddingTop: "2px",
    textDecoration: "underline",
  } as React.CSSProperties,
  metaValue: {
    fontSize: "13px",
    color: "#d1d5db",
    lineHeight: "1.6",
    flexWrap: "wrap" as const,
    display: "flex",
    gap: "6px",
    alignItems: "center",
  } as React.CSSProperties,
  metaValueBold: {
    fontSize: "13px",
    color: "#ffffff",
    fontWeight: "700",
    lineHeight: "1.6",
    flexWrap: "wrap" as const,
    display: "flex",
    gap: "6px",
    alignItems: "center",
  } as React.CSSProperties,
  metaLink: {
    color: "#d1d5db",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "13px",
  } as React.CSSProperties,
  metaStatRow: {
    fontSize: "12px",
    color: "#6b7280",
    display: "flex",
    gap: "20px",
    flexWrap: "wrap" as const,
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
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "6px",
  } as React.CSSProperties,
  titleActions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexShrink: 0,
  } as React.CSSProperties,
  title: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#ffffff",
    lineHeight: "1.3",
    margin: 0,
  } as React.CSSProperties,
  author: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "24px",
  } as React.CSSProperties,
  authorLink: {
    color: "#60a5fa",
    textDecoration: "underline",
    cursor: "pointer",
  } as React.CSSProperties,
  synopsisBox: {
    backgroundColor: "#161616",
    border: "1px solid #222222",
    borderRadius: "12px",
    padding: "20px 24px",
    marginBottom: "40px",
  } as React.CSSProperties,
  synopsisLabel: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#9ca3af",
    textDecoration: "underline",
    marginBottom: "12px",
    display: "block",
  } as React.CSSProperties,
  synopsisText: {
    fontSize: "14px",
    color: "#d1d5db",
    lineHeight: "1.8",
  } as React.CSSProperties,
  contentBox: {
    backgroundColor: "#161616",
    border: "1px solid #222222",
    borderRadius: "12px",
    padding: "32px 36px",
  } as React.CSSProperties,
  contentLabel: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#9ca3af",
    textDecoration: "underline",
    marginBottom: "24px",
    display: "block",
  } as React.CSSProperties,
  contentText: {
    fontSize: "15px",
    color: "#e5e7eb",
    lineHeight: "2",
    whiteSpace: "pre-wrap" as const,
  } as React.CSSProperties,
};

const MetaRow = ({
  label,
  bold,
  isLast,
  children,
}: {
  label: string;
  bold?: boolean;
  isLast?: boolean;
  children: React.ReactNode;
}) => (
  <div style={isLast ? s.metaRowLast : s.metaRow} className="reading-meta-row">
    <span style={bold ? s.metaLabelBold : s.metaLabel} className="reading-meta-label">{label}:</span>
    <div style={bold ? s.metaValueBold : s.metaValue}>{children}</div>
  </div>
);

export const ReadingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [story, setStory] = useState<OneShot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Story ID not found");
      setLoading(false);
      return;
    }
    const fetchStory = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/stories/${id}`);
        setStory(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load story");
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, [id]);

  if (loading)
    return (
      <div style={s.page}>
        <div style={s.inner}>
          <p style={{ color: "#6b7280" }}>Loading story...</p>
        </div>
      </div>
    );
  if (error || !story)
    return (
      <div style={s.page}>
        <div style={s.inner}>
          <p style={{ color: "#ef5350" }}>{error || "Story not found."}</p>
        </div>
      </div>
    );

  const { user } = useAuth();
  const isAuthor = user?.username === story.author;

  return (
    <div style={s.page}>
      <style>{`
        @media (max-width: 768px) {
          .reading-inner { padding: 16px 16px !important; }
          .reading-meta-row { flex-direction: column; gap: 4px; }
          .reading-meta-label { min-width: auto !important; }
          .reading-content { padding: 20px 16px !important; }
          .reading-title { font-size: 22px !important; }
        }
      `}</style>
      <div style={s.inner} className="reading-inner">
        {/* Title row — bookmark icon and edit button on the right */}
        <div style={s.titleRow}>
          <h1 style={s.title} className="reading-title">{story.title}</h1>
          <div style={s.titleActions}>
            <AddToLibraryButton storyId={story._id} />
            {isAuthor && (
              <button
                onClick={() => navigate(`/write/${story._id}`)}
                style={{
                  background: "none",
                  border: "1px solid #333333",
                  borderRadius: "6px",
                  color: "#60a5fa",
                  padding: "6px 10px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "13px",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.borderColor =
                    "#60a5fa")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.borderColor =
                    "#333333")
                }
              >
                <MdOutlineModeEditOutline size={15} /> Edit
              </button>
            )}
          </div>
        </div>

        <p style={s.author}>
          by <span style={s.authorLink}>{story.author}</span>
        </p>

        {/* Metadata Box */}
        <div style={s.metaBox}>
          <MetaRow label="Genres">
            {story.genres.map((g) => (
              <span key={g} style={s.GenreBadge}>
                {g}
              </span>
            ))}
          </MetaRow>
          <MetaRow label="Additional Tags">
            {story.tags.map((t, i) => (
              <span key={t}>
                <span style={s.metaLink}>{t}</span>
                {i < story.tags.length - 1 && (
                  <span style={{ color: "#4b5563" }}>,</span>
                )}
              </span>
            ))}
          </MetaRow>
          <MetaRow label="Stats" isLast>
            <div style={s.metaStatRow}>
              <span>Published: {story.published}</span>
              <span>Updated: {story.lastUpdated}</span>
              <span>Words: {story.words.toLocaleString()}</span>
            </div>
          </MetaRow>
        </div>

        {/* Synopsis */}
        {story.synopsis && (
          <div style={s.synopsisBox}>
            <span style={s.synopsisLabel}>Summary:</span>
            <p style={s.synopsisText}>{story.synopsis}</p>
          </div>
        )}

        {/* Content */}
        <div style={s.contentBox} className="reading-content">
          <span style={s.contentLabel}>Chapter Content:</span>
          <p style={s.contentText}>{story.content}</p>
        </div>
      </div>
    </div>
  );
};

export const BrowsePage = () => <ReadingPage />;
