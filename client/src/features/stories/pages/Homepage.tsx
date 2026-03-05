import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { OneShot } from "../types/types";
import { OneShotCard } from "../components/StoryCard";
import { apiClient } from "../../../api/client"; // adjust path to client module

// --- Styles ---
const styles = {
  page: {
    backgroundColor: "#111111",
    minHeight: "100vh",
    color: "#ffffff",
  } as React.CSSProperties,
  inner: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px 40px",
  } as React.CSSProperties,
  section: {
    marginBottom: "48px",
  } as React.CSSProperties,
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
  } as React.CSSProperties,
  seeMore: {
    fontSize: "14px",
    color: "#6b7280",
    textDecoration: "none",
  } as React.CSSProperties,
  cardContainer: {
    backgroundColor: "#161616",
    border: "1px solid #222222",
    borderRadius: "12px",
    overflow: "hidden",
  } as React.CSSProperties,
};

// --- Section wrapper ---
const Section = ({ title, novels }: { title: string; novels: OneShot[] }) => {
  const browseLink = title === "Library" ? "/dashboard/library" : "/browse";
  return (
    <section style={styles.section}>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>{title}</h2>
        <Link to={browseLink} style={styles.seeMore}>
          See more ›
        </Link>
      </div>
      <div style={styles.cardContainer}>
        {novels.map((oneshot, i) => (
          <OneShotCard
            key={oneshot._id}
            oneshot={oneshot}
            isLast={i === novels.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

// --- Main Export ---
export const HomeSections = () => {
  const [library, setLibrary] = useState<OneShot[]>([]);
  const [recentlyUpdated, setRecentlyUpdated] = useState<OneShot[]>([]);
  const [allWorks, setAllWorks] = useState<OneShot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resp = await apiClient.get("/stories");
        const data = resp.data;
        const stories: OneShot[] = Array.isArray(data)
          ? data
          : (data.stories ?? data.data ?? data.works ?? []);
        setAllWorks(stories);
        setRecentlyUpdated(
          [...stories]
            .sort(
              (a, b) =>
                new Date(b.lastUpdated).getTime() -
                new Date(a.lastUpdated).getTime(),
            )
            .slice(0, 5),
        );

        // fetch library entries if available
        try {
          const libResp = await apiClient.get("/libraries");
          const libs = Array.isArray(libResp.data)
            ? libResp.data
            : (libResp.data.libraries ?? libResp.data.data ?? []);
          setLibrary(libs.map((e: any) => e.storyId));
        } catch (libErr) {
          // ignore library errors; user might not have any or be anonymous
          console.warn("Library fetch failed", libErr);
        }

        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load homepage");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.inner}>
          <p style={{ color: "#6b7280" }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <div style={styles.inner}>
          <p style={{ color: "#b32725" }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <Section title="Library" novels={library} />
        <Section title="Recently Updated" novels={recentlyUpdated} />
        <Section title="All Works" novels={allWorks} />
      </div>
    </div>
  );
};

export const Homepage = () => {
  return <HomeSections />;
};
