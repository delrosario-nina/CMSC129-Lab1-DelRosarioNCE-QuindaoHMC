import { Link, useNavigate } from "react-router-dom";

// --- Types ---
interface OneShot {
  id: number;
  title: string;
  author: string;
  genres: string[];
  tags: string[];
  published: string;
  lastUpdated: string;
  words: number;
  synopsis: string;
  content: string;
}

// --- Mock Data ---
const Library: OneShot[] = [
  {
    id: 1,
    title: "The Stellar Swordmaster",
    author: "StarForgedAuthor",
    published: "2024-01-15",
    lastUpdated: "02-28-2026",
    genres: ["Action", "Fantasy", "Manhwa"],
    tags: ["Reincarnation", "Martial Arts", "Adventure"],
    words: 184320,
    synopsis:
      "A legendary swordmaster reincarnates and rises through the ranks of a world governed by magic and steel....",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 2,
    title: "The Infinite Mage",
    lastUpdated: "02-28-2026",
    author: "ArcaneScribe",
    published: "2023-11-20",
    words: 256000,
    genres: ["Action", "Adventure", "Fantasy"],
    tags: ["Magic", "Reincarnation", "Power Fantasy"],
    synopsis:
      "Born without magic in a world ruled by mages, a boy's obsession leads him to uncover powers that shake the very foundations of the magical order....",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const allWorks: OneShot[] = [
  {
    id: 4,
    title: "Sakamoto Days",
    lastUpdated: "02-28-2026",
    author: "Yuto Suzuki",
    published: "2023-05-10",
    words: 128000,
    genres: ["Action", "Comedy", "Manga"],
    tags: ["Action", "Comedy", "Manga"],
    synopsis:
      "A legendary hitman who retired to live a peaceful life as a convenience store owner is pulled back into the underworld because of his past because of his unique skills and the people around him because of his unique skills and the people around him because of his unique skills and the people around him",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 5,
    title: "Solo Leveling",
    lastUpdated: "02-28-2026",
    author: "Chugong",
    published: "2022-08-01",
    words: 220000,
    genres: ["Action", "Fantasy", "Adventure"],
    tags: ["Regression", "System", "Weak Protagonist"],
    synopsis:
      "The weakest hunter of all mankind rises to become the most powerful being in a world overrun by dungeons and monsters....",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 6,
    title: "Blue Lock",
    lastUpdated: "02-26-2026",
    author: "Muneyuki Kaneshiro",
    published: "2021-09-15",
    words: 150000,
    genres: ["Sports", "Drama", "Manga"],
    tags: ["Soccer", "IDK", "Wubulluhbulluh"],
    synopsis:
      "Three hundred strikers compete in a radical training program to forge Japan's ultimate egotist striker for the World Cup....",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const recentlyUpdated: OneShot[] = [
  {
    id: 9,
    title: "Omniscient Reader's Viewpoint",
    lastUpdated: "02-28-2026",
    author: "Muneyuki Kaneshiro",
    published: "2023-01-15",
    words: 180000,
    genres: ["Action", "Adventure", "Fantasy", "Thriller"],
    tags: ["Reincarnation", "Game World", "Adventure"],
    synopsis:
      "A reader finds himself transported into the world of the only novel he ever read to completion — and he's the only one who knows how it ends....",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 10,
    title: "The Beginning After the End",
    lastUpdated: "02-27-2026",
    author: "TurtleMe",
    published: "2022-11-20",
    words: 200000,
    genres: ["Action", "Fantasy", "Adventure", "Romance"],
    tags: ["Reincarnation", "Magic", "Adventure"],
    synopsis:
      "A king with unrivaled strength is reincarnated into a new world of magic and monsters, seeking to rediscover his purpose....",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

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
  card: {
    padding: "16px 20px",
    borderBottom: "1px solid #222222",
    cursor: "pointer",
    transition: "background-color 0.15s ease",
    display: "block",
    textDecoration: "none",
    color: "inherit",
  } as React.CSSProperties,
  cardLast: {
    padding: "16px 20px",
    cursor: "pointer",
    transition: "background-color 0.15s ease",
    display: "block",
    textDecoration: "none",
    color: "inherit",
  } as React.CSSProperties,
  title: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#60a5fa",
    lineHeight: "1.4",
    display: "block",
  } as React.CSSProperties,
  stats: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "16px",
    marginTop: "6px",
    fontSize: "12px",
    color: "#6b7280",
  } as React.CSSProperties,
  genres: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "6px",
    marginTop: "10px",
  } as React.CSSProperties,
  tags: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "6px",
    marginTop: "6px",
  } as React.CSSProperties,
  GenreBadge: {
    fontSize: "11px",
    padding: "2px 10px",
    borderRadius: "9999px",
    backgroundColor: "#252525",
    border: "1px solid #383838",
    color: "#d1d5db",
    fontWeight: "500",
  } as React.CSSProperties,
  TagBadge: {
    fontSize: "11px",
    padding: "2px 5px",
    color: "#6b7280",
    textDecoration: "underline",
    fontWeight: "500",
  } as React.CSSProperties,
  synopsis: {
    marginTop: "10px",
    fontSize: "13px",
    color: "#9ca3af",
    lineHeight: "1.6",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
  } as React.CSSProperties,
};

// --- Sub-components ---
const GenreBadge = ({ genre }: { genre: string }) => (
  <span style={styles.GenreBadge}>{genre}</span>
);

const TagBadge = ({ tag }: { tag: string }) => (
  <span style={styles.TagBadge}>{tag}</span>
);

const OneShotCard = ({
  oneshot,
  isLast,
}: {
  oneshot: OneShot;
  isLast: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <div
      style={isLast ? styles.cardLast : styles.card}
      onClick={() => navigate(`/novel/${oneshot.id}`)}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLDivElement).style.backgroundColor = "#1a1a1a")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLDivElement).style.backgroundColor =
          "transparent")
      }
    >
      <span style={styles.title}>{oneshot.title}</span>

      <div style={styles.stats}>
        <span> {oneshot.lastUpdated}</span>
      </div>

      <div style={styles.genres}>
        {oneshot.genres.map((g) => (
          <GenreBadge key={g} genre={g} />
        ))}
      </div>

      <div style={styles.tags}>
        {oneshot.tags.map((t) => (
          <TagBadge key={t} tag={t} />
        ))}
      </div>

      <p style={styles.synopsis}>{oneshot.synopsis}</p>
    </div>
  );
};

// --- Section wrapper ---
const Section = ({ title, novels }: { title: string; novels: OneShot[] }) => (
  <section style={styles.section}>
    <div style={styles.sectionHeader}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <Link to="#" style={styles.seeMore}>
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
