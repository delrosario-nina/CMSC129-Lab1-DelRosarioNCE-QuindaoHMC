import { Link } from "react-router-dom";

// --- Types ---
interface Novel {
  id: number;
  title: string;
  chapters: number;
  lastUpdated: string;
  genres: string[];
  synopsis: string;
}

// --- Mock Data ---
const bookmarkedNovels: Novel[] = [
  {
    id: 1,
    title: "The Stellar Swordmaster",
    chapters: 214,
    lastUpdated: "02-28-2026",
    genres: ["Action", "Fantasy", "Manhwa"],
    synopsis:
      "A legendary swordmaster reincarnates and rises through the ranks of a world governed by magic and steel....",
  },
  {
    id: 2,
    title: "The Infinite Mage",
    chapters: 389,
    lastUpdated: "02-28-2026",
    genres: ["Action", "Adventure", "Fantasy"],
    synopsis:
      "Born without magic in a world ruled by mages, a boy's obsession leads him to uncover powers that shake the very foundations of the magical order....",
  },
  {
    id: 3,
    title: "The Knight Only Lives Today",
    chapters: 102,
    lastUpdated: "02-27-2026",
    genres: ["Action", "Romance", "Fantasy"],
    synopsis:
      "A knight cursed to relive a single day must find a way to break the loop before his time runs out entirely....",
  },
];

const trendingNovels: Novel[] = [
  {
    id: 4,
    title: "Sakamoto Days",
    chapters: 201,
    lastUpdated: "02-28-2026",
    genres: ["Action", "Comedy", "Manga"],
    synopsis:
      "A legendary hitman who retired to live a peaceful life as a convenience store owner is pulled back into the underworld....",
  },
  {
    id: 5,
    title: "Solo Leveling",
    chapters: 179,
    lastUpdated: "02-28-2026",
    genres: ["Action", "Fantasy", "Adventure"],
    synopsis:
      "The weakest hunter of all mankind rises to become the most powerful being in a world overrun by dungeons and monsters....",
  },
  {
    id: 6,
    title: "Blue Lock",
    chapters: 265,
    lastUpdated: "02-26-2026",
    genres: ["Sports", "Drama", "Manga"],
    synopsis:
      "Three hundred strikers compete in a radical training program to forge Japan's ultimate egotist striker for the World Cup....",
  },
  {
    id: 7,
    title: "Then I'll Just Use an Online Game Character",
    chapters: 389,
    lastUpdated: "02-28-2026",
    genres: ["Action", "Adventure", "Fantasy", "Gender Bender"],
    synopsis:
      "I was thrown into a group of classmates I had no contact with, and even though we were all summoned to another world, I was left behind due to a scheme by one student....",
  },
];

const recentlyUpdatedNovels: Novel[] = [
  {
    id: 8,
    title: "Among These, The Princess Must Have At Least One To Her Taste",
    chapters: 5,
    lastUpdated: "02-28-2026",
    genres: ["Comedy", "Drama", "Fantasy", "Romance", "Slice of Life"],
    synopsis:
      "The main character was a producer of an idol survival audition program in her past life....",
  },
  {
    id: 9,
    title: "Omniscient Reader's Viewpoint",
    chapters: 551,
    lastUpdated: "02-28-2026",
    genres: ["Action", "Adventure", "Fantasy", "Thriller"],
    synopsis:
      "A reader finds himself transported into the world of the only novel he ever read to completion — and he's the only one who knows how it ends....",
  },
  {
    id: 10,
    title: "The Beginning After the End",
    chapters: 440,
    lastUpdated: "02-27-2026",
    genres: ["Action", "Fantasy", "Adventure", "Romance"],
    synopsis:
      "A king with unrivaled strength is reincarnated into a new world of magic and monsters, seeking to rediscover his purpose....",
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
    transition: "background-color 0.15s ease",
  } as React.CSSProperties,
  cardLast: {
    padding: "16px 20px",
  } as React.CSSProperties,
  title: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#60a5fa",
    textDecoration: "none",
    lineHeight: "1.4",
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
  badge: {
    fontSize: "11px",
    padding: "2px 10px",
    borderRadius: "9999px",
    backgroundColor: "#252525",
    border: "1px solid #383838",
    color: "#d1d5db",
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
  <span style={styles.badge}>{genre}</span>
);

const NovelCard = ({ novel, isLast }: { novel: Novel; isLast: boolean }) => (
  <div
    style={isLast ? styles.cardLast : styles.card}
    onMouseEnter={(e) =>
      ((e.currentTarget as HTMLDivElement).style.backgroundColor = "#1a1a1a")
    }
    onMouseLeave={(e) =>
      ((e.currentTarget as HTMLDivElement).style.backgroundColor =
        "transparent")
    }
  >
    <Link to={`/novel/${novel.id}`} style={styles.title}>
      {novel.title}
    </Link>

    <div style={styles.stats}>
      <span>[ch] {novel.chapters} Chapters</span>
      <span>[📅] {novel.lastUpdated}</span>
    </div>

    <div style={styles.genres}>
      {novel.genres.map((g) => (
        <GenreBadge key={g} genre={g} />
      ))}
    </div>

    <p style={styles.synopsis}>{novel.synopsis}</p>
  </div>
);

// --- Section wrapper ---
const Section = ({ title, novels }: { title: string; novels: Novel[] }) => (
  <section style={styles.section}>
    <div style={styles.sectionHeader}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <Link to="#" style={styles.seeMore}>
        See more ›
      </Link>
    </div>
    <div style={styles.cardContainer}>
      {novels.map((novel, i) => (
        <NovelCard
          key={novel.id}
          novel={novel}
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
        <Section title="Your Bookmarks" novels={bookmarkedNovels} />
        <Section title="Trending" novels={trendingNovels} />
        <Section title="Recently Updated" novels={recentlyUpdatedNovels} />
      </div>
    </div>
  );
};

export const BrowsePage = () => {
  return <HomeSections />;
};
