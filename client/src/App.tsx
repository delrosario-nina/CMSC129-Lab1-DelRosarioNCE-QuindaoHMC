import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./features/shared/layout/MainLayout";
import { Homepage } from "./features/stories/pages/Homepage";
import { BroswingPage } from "./features/stories/pages/BroswingPage";
import { WritePage } from "./features/stories/pages/WritePage";
import { ReadingPage } from "./features/stories/pages/ReadingPage";
import { DashboardPage } from "./features/dashboard/DashboardPage";
import { MyWorksPage } from "./features/dashboard/MyWorksPage";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="browsing" element={<BroswingPage />} />
          <Route path="browse" element={<BroswingPage />} />
          {/* removed standalone library page */}
          <Route path="my-works" element={<MyWorksPage />} />
          {/* dashboard supports its own routing for tabs */}
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="dashboard/written-works" element={<DashboardPage />} />
          <Route path="dashboard/library" element={<DashboardPage />} />
          <Route path="write" element={<WritePage />} />
          <Route path="reading/:id" element={<ReadingPage />} />
          <Route path="oneshot/:id" element={<ReadingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
