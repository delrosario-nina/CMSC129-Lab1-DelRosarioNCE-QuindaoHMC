const mongoose = require("mongoose");
require("dotenv").config();

async function checkStories() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const Story = mongoose.model(
      "Story",
      new mongoose.Schema({
        title: String,
        author: String,
        published: String,
        lastUpdated: String,
        genres: [String],
        tags: [String],
        words: Number,
        synopsis: String,
        content: String,
        deletedAt: Date,
      }),
    );

    const count = await Story.countDocuments({ deletedAt: null });
    console.log("Stories in database:", count);

    if (count === 0) {
      console.log("No stories found. Creating a test story...");
      await Story.create({
        title: "Test Story",
        author: "TestAuthor",
        published: new Date().toISOString().slice(0, 10),
        lastUpdated: new Date().toISOString().slice(0, 10),
        genres: ["Fantasy", "Adventure"],
        tags: ["Test", "Sample"],
        words: 150,
        synopsis: "This is a test story to verify the database connection.",
        content:
          "This is the content of the test story. It contains some sample text to demonstrate that stories can be stored and retrieved from the database.",
      });
      console.log("Test story created!");
    } else {
      const stories = await Story.find({ deletedAt: null }).limit(3);
      console.log(
        "Sample stories:",
        stories.map((s) => ({ title: s.title, author: s.author })),
      );
    }

    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

checkStories();
