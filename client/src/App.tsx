import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./shared/layout/MainLayout";
import { BrowsePage } from "./features/stories/pages/BrowsingPage";
import { LibraryPage } from "./features/library/pages/LibraryPage";
import { WritePage } from "./features/stories/pages/WritePage";
import { ReadingPage } from "./features/stories/pages/ReadingPage";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<BrowsePage />} />
          <Route path="browse" element={<BrowsePage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="write" element={<WritePage />} />
          <Route path="story/:id" element={<ReadingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
