import { StoryGrid } from "../../stories/components/StoryGrid";

export const LibraryPage = () => {
  // placeholder state, later fetch from API
  const stories = [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Library</h1>
      {stories.length === 0 ? (
        <p>You haven't added any stories yet.</p>
      ) : (
        <StoryGrid />
      )}
    </div>
  );
};
