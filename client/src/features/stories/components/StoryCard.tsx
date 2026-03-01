import { Link } from "react-router-dom";
import type { Story } from "../types/types";
import { AddToLibraryButton } from "../../library/components/AddToLibraryButton";

interface Props {
  story: Story;
}

export const StoryCard = ({ story }: Props) => {
  return (
    <Link to={`/story/${story._id}`} className="block">
      <div className="border border-gray-300 rounded p-4 hover:shadow-md transition-shadow bg-gray-50">
        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600">
          {story.title}
        </h2>

        {/* Metadata: chapters, update frequency, readers, reviews, date */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-600 mb-3">
          <div>{story.chapters} Chapters</div>
          <div>Every {story.updateFrequency}</div>
          <div>{story.readers} Readers</div>
          <div>{story.reviews} Reviews</div>
          <div>{story.publicationDate}</div>
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
          {story.description}
        </p>

        {/* Add to Library Button */}
        <div onClick={(e) => e.preventDefault()}>
          <AddToLibraryButton storyId={story._id} />
        </div>
      </div>
    </Link>
  );
};
