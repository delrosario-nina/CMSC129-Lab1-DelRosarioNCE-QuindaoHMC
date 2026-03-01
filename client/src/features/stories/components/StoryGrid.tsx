import { StoryCard } from "./StoryCard";
import type { Story } from "../types/types";

export const StoryGrid = () => {
  // later this will come from API
  const stories: Story[] = [];

  return (
    <div className="space-y-6">
      {stories.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No stories found</p>
      ) : (
        stories.map((story) => <StoryCard key={story._id} story={story} />)
      )}
    </div>
  );
};
