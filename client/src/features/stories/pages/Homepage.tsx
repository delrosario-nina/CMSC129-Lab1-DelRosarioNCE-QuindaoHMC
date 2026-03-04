import { Link } from "react-router-dom";
import type { OneShot } from "../types/types";
import { Library, allWorks, recentlyUpdated } from "../data/mockData";
import { OneShotCard } from "../components/StoryCard";

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
  const browseLink = title === "Library" ? "#" : "/browse";
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
            key={oneshot.id}
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
  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <Section title="Library" novels={Library} />
        <Section title="Recently Updated" novels={recentlyUpdated} />
        <Section title="All Works" novels={allWorks} />
      </div>
    </div>
  );
};

export const Homepage = () => {
  return <HomeSections />;
};
