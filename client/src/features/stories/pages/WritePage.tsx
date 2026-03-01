import { useState } from "react";

export const WritePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit story", { title, description, content });
    // call API later
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Write a New Story</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 w-full rounded"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description"
          className="border p-2 w-full rounded h-24"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Story content..."
          className="border p-2 w-full rounded h-64"
        />

        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Save / Publish
        </button>
      </form>
    </div>
  );
};
