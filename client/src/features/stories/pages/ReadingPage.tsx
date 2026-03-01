import { useParams } from "react-router-dom";

export const ReadingPage = () => {
  const { id } = useParams<{ id: string }>();

  // later fetch story by id
  const story = {
    title: "Sample Title",
    author: "Author Name",
    id: id,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.",
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{story.title}</h1>
      <p className="text-sm text-gray-600 mb-6">by {story.author}</p>

      <div className="prose max-w-none">
        <p>{story.content}</p>
      </div>
    </div>
  );
};
