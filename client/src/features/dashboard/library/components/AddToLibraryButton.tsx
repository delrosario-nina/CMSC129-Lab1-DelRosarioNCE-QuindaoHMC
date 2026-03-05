import { useState, useEffect } from "react";
import { apiClient } from "../../../../api/client";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { ConfirmDialog } from "../../../../shared/components/ConfirmDialog";

interface Props {
  storyId: string;
}

export const AddToLibraryButton = ({ storyId }: Props) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [libraryId, setLibraryId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check on mount if this story is already in the library
  useEffect(() => {
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
        // Silently fail on initial library check
        console.warn("Failed to check library status:", err);
      } finally {
        setIsLoading(false);
      }
    };
    checkLibrary();
  }, [storyId]);

  const handleAdd = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const resp = await apiClient.post("/libraries", { storyId });
      setIsBookmarked(true);
      setLibraryId(resp.data._id);
    } catch (err: any) {
      if (err.response?.status === 409) {
        // Already bookmarked
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
    if (isBookmarked) {
      setShowConfirm(true);
    } else {
      handleAdd();
    }
  };

  return (
    <>
      {/* Error Toast */}
      {error && (
        <div
          className="fixed bottom-4 right-4 bg-red-900/80 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-sm max-w-xs z-50"
          role="alert"
        >
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-3 text-red-400 hover:text-red-200"
          >
            ✕
          </button>
        </div>
      )}

      {/* Bookmark Icon Button */}
      <button
        onClick={handleClick}
        disabled={isLoading}
        title={isBookmarked ? "Remove from library" : "Add to library"}
        className={`bg-none border-none flex items-center justify-center p-1 transition-colors ${
          isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        } ${isBookmarked ? "text-blue-400 hover:text-red-500" : "text-gray-500 hover:text-purple-400"}`}
      >
        {isBookmarked ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />}
      </button>

      {/* Confirmation Dialog */}
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
