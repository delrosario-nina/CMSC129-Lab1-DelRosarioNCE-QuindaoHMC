import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { MainLayout } from "./features/shared/layout/MainLayout";
import { Homepage } from "./features/stories/pages/Homepage";
import { BroswingPage } from "./features/stories/pages/BroswingPage";
import { WritePage } from "./features/stories/pages/WritePage";
import { ReadingPage } from "./features/stories/pages/ReadingPage";
import { DashboardPage } from "./features/dashboard/DashboardPage";
import { MyWorksPage } from "./features/dashboard/MyWorksPage";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { RegisterPage } from "./features/auth/pages/RegisterPage";

import "./index.css";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ backgroundColor: "#111111", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#6b7280" }}>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ backgroundColor: "#111111", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#6b7280" }}>Loading...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <RegisterPage />
        </PublicRoute>
      } />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="browsing" element={<BroswingPage />} />
        <Route path="browse" element={<BroswingPage />} />
        <Route path="my-works" element={
          <ProtectedRoute>
            <MyWorksPage />
          </ProtectedRoute>
        } />
        <Route path="dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="dashboard/written-works" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="dashboard/library" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="write" element={
          <ProtectedRoute>
            <WritePage />
          </ProtectedRoute>
        } />
        <Route path="write/:id" element={
          <ProtectedRoute>
            <WritePage />
          </ProtectedRoute>
        } />
        <Route path="reading/:id" element={<ReadingPage />} />
        <Route path="oneshot/:id" element={<ReadingPage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
