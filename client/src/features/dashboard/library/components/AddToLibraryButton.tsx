import { useState } from "react";
import { apiClient } from "../../../../api/client";

interface Props {
  storyId: string;
}

export const AddToLibraryButton = ({ storyId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await apiClient.post("/libraries", { storyId });
      setIsAdded(true);
    } catch (err: any) {
      if (err.response?.status === 409) {
        // Already in library
        setIsAdded(true);
        setError(null);
      } else {
        setError(err.response?.data?.message || "Failed to add to library");
        console.error("Error adding to library:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleAdd}
        disabled={isLoading || isAdded}
        style={{
          width: "100%",
          marginTop: "12px",
          padding: "10px 16px",
          borderRadius: "6px",
          border: "none",
          backgroundColor: isAdded ? "#10b981" : "#f97316",
          color: "#ffffff",
          cursor: isLoading || isAdded ? "not-allowed" : "pointer",
          opacity: isLoading ? 0.7 : 1,
          fontSize: "14px",
          fontWeight: "600",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          if (!isAdded && !isLoading) {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#1a2a3a";
          }
        }}
        onMouseLeave={(e) => {
          if (!isAdded && !isLoading) {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#1a2a3a";
          }
        }}
      >
        {isAdded
          ? "✓ Added to Library"
          : isLoading
            ? "Adding..."
            : "Add to Library"}
      </button>
      {error && (
        <p
          style={{
            margin: "8px 0 0 0",
            fontSize: "12px",
            color: "#3071c1",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};
