import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../../api/client";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { ConfirmDialog } from "../../../../shared/components/ConfirmDialog";
import { useAuth } from "../../../../context/AuthContext";

interface Props {
  storyId: string;
}

export const AddToLibraryButton = ({ storyId }: Props) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [libraryId, setLibraryId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    const checkLibrary = async () => {
      try {
        const resp = await apiClient.get("/libraries");
        const data = resp.data;
        const libs: { _id: string; storyId: { _id: string } | string }[] =
          Array.isArray(data) ? data : (data.libraries ?? data.data ?? []);

        const entry = libs.find((e) => {
          const id = typeof e.storyId === "object" ? e.storyId._id : e.storyId;
          return id === storyId;
        });

        if (entry) {
          setIsBookmarked(true);
          setLibraryId(entry._id);
        }
      } catch (err: any) {
        console.warn("Failed to check library status:", err);
      } finally {
        setIsLoading(false);
      }
    };
    checkLibrary();
  }, [storyId, isAuthenticated, authLoading]);

  const handleAdd = async () => {
    if (!isAuthenticated) {
      setShowAuthPrompt(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const resp = await apiClient.post("/libraries", { storyId });
      setIsBookmarked(true);
      setLibraryId(resp.data._id);
    } catch (err: any) {
      if (err.response?.status === 409) {
        setIsBookmarked(true);
      } else {
        const errorMsg =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to add to library";
        setError(errorMsg);
        console.error("Error adding to library:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveConfirmed = async () => {
    if (!libraryId) return;
    setShowConfirm(false);
    setIsLoading(true);
    setError(null);
    try {
      await apiClient.delete(`/libraries/${libraryId}`);
      setIsBookmarked(false);
      setLibraryId(null);
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to remove from library";
      setError(errorMsg);
      console.error("Error removing from library:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    if (isLoading) return;
    if (!isAuthenticated) {
      setShowAuthPrompt(true);
      return;
    }
    if (isBookmarked) {
      setShowConfirm(true);
    } else {
      handleAdd();
    }
  };

  if (authLoading || isLoading) {
    return (
      <button
        disabled
        style={{
          background: "none",
          border: "1px solid #333333",
          borderRadius: "6px",
          color: "#60a5fa",
          padding: "6px 10px",
          cursor: "not-allowed",
          opacity: 0.5,
        }}
      >
        ...
      </button>
    );
  }

  return (
    <>
      {error && (
        <div
          style={{
            position: "fixed",
            bottom: "16px",
            right: "16px",
            backgroundColor: "rgba(127, 29, 29, 0.9)",
            border: "1px solid #7f1d1d",
            color: "#fecaca",
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            maxWidth: "320px",
            zIndex: 9999,
          }}
        >
          {error}
          <button
            onClick={() => setError(null)}
            style={{
              marginLeft: "12px",
              background: "none",
              border: "none",
              color: "#fca5a5",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            ×
          </button>
        </div>
      )}

      {showAuthPrompt && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowAuthPrompt(false)}
        >
          <div
            style={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #333333",
              borderRadius: "12px",
              padding: "32px",
              maxWidth: "400px",
              width: "90%",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#ffffff", margin: "0 0 12px 0" }}>
              Sign in to Bookmark
            </h3>
            <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "24px" }}>
              Create a free account to save stories to your library and keep track of your favorite works.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={() => setShowAuthPrompt(false)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "transparent",
                  border: "1px solid #333333",
                  borderRadius: "8px",
                  color: "#e5e7eb",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAuthPrompt(false);
                  navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
                }}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#346eb6",
                  border: "none",
                  borderRadius: "8px",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleClick}
        title={isAuthenticated ? (isBookmarked ? "Remove from library" : "Add to library") : "Sign in to bookmark"}
        style={{
          background: "none",
          border: "1px solid #333333",
          borderRadius: "6px",
          color: isBookmarked ? "#60a5fa" : "#6b7280",
          padding: "6px 10px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "13px",
          transition: "all 0.15s ease",
        }}
        onMouseEnter={(e) => {
          if (!isLoading) {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#60a5fa";
            (e.currentTarget as HTMLButtonElement).style.color = "#60a5fa";
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading) {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#333333";
            (e.currentTarget as HTMLButtonElement).style.color = isBookmarked ? "#60a5fa" : "#6b7280";
          }
        }}
      >
        {isBookmarked ? <FaBookmark size={16} /> : <FaRegBookmark size={16} />}
        {isBookmarked ? "Saved" : "Save"}
      </button>

      {showConfirm && (
        <ConfirmDialog
          title="Remove from Library"
          message="Are you sure you want to remove this story from your library?"
          confirmLabel="Remove"
          isDangerous
          onConfirm={handleRemoveConfirmed}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};
