import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./shared/layout/MainLayout";
import { Homepage } from "./features/stories/pages/Homepage";
import { BroswingPage } from "./features/stories/pages/BroswingPage";
// import { LibraryPage } from "./features/dashboard/library/pages/LibraryPage";
import { WritePage } from "./features/stories/pages/WritePage";
import { ReadingPage } from "./features/stories/pages/ReadingPage";
import { DashboardPage } from "./features/dashboard/DashboardPage";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="browse" element={<BroswingPage />} />
          {/* <Route path="library" element={<LibraryPage />} /> */}
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="write" element={<WritePage />} />
          <Route path="oneshot/:id" element={<ReadingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
