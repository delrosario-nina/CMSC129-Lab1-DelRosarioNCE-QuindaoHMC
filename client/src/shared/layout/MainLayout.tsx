import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
