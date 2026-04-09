import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { OneShot } from "../types/types";
import { OneShotCard } from "../components/StoryCard";
import apiClient from "../../../api/client";
import { useAuth } from "../../../context/AuthContext";
import { theme } from "../../../styles/theme";
import {
  pageStyles,
  cardStyles,
  textStyles,
  sectionStyles,
  buttonStyles,
} from "../../../styles/commonStyles";

const styles = {
  seeMore: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.muted,
    textDecoration: "none",
  } as React.CSSProperties,
  authPrompt: {
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing["2xl"],
    textAlign: "center" as const,
  } as React.CSSProperties,
  authPromptText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.dim,
    marginBottom: theme.spacing.lg,
  } as React.CSSProperties,
};

const Section = ({ title, novels }: { title: string; novels: OneShot[] }) => {
  const browseLink = title === "Library" ? "/dashboard/library" : "/browse";
  return (
    <section style={sectionStyles.container}>
      <div style={sectionStyles.header}>
        <h2 style={textStyles.sectionTitle}>{title}</h2>
        <Link to={browseLink} style={styles.seeMore}>
          See more ›
        </Link>
      </div>
      <div style={cardStyles.container}>
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

export const HomeSections = () => {
  const { isAuthenticated } = useAuth();
  const [library, setLibrary] = useState<OneShot[]>([]);
  const [recentlyUpdated, setRecentlyUpdated] = useState<OneShot[]>([]);
  const [allWorks, setAllWorks] = useState<OneShot[]>([]);
  const [loading, setLoading] = useState(true);
  const [libraryLoading, setLibraryLoading] = useState(false);
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

  useEffect(() => {
    if (!isAuthenticated) {
      setLibrary([]);
      return;
    }

    const fetchLibrary = async () => {
      try {
        setLibraryLoading(true);
        const libResp = await apiClient.get("/libraries");
        const libs = Array.isArray(libResp.data)
          ? libResp.data
          : (libResp.data.libraries ?? libResp.data.data ?? []);
        setLibrary(libs.map((e: any) => e.storyId));
      } catch (libErr) {
        console.warn("Library fetch failed", libErr);
        setLibrary([]);
      } finally {
        setLibraryLoading(false);
      }
    };
    fetchLibrary();
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div style={pageStyles.page}>
        <div style={pageStyles.inner}>
          <p style={textStyles.muted}>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={pageStyles.page}>
        <div style={pageStyles.inner}>
          <p style={{ color: theme.colors.danger.dark }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyles.page}>
      <div style={pageStyles.inner}>
        {isAuthenticated ? (
          libraryLoading ? (
            <section style={sectionStyles.container}>
              <div style={sectionStyles.header}>
                <h2 style={textStyles.sectionTitle}>Library</h2>
              </div>
              <div style={styles.authPrompt}>
                <p style={textStyles.muted}>Loading your library...</p>
              </div>
            </section>
          ) : (
            <Section title="Library" novels={library} />
          )
        ) : (
          <section style={sectionStyles.container}>
            <div style={sectionStyles.header}>
              <h2 style={textStyles.sectionTitle}>Library</h2>
            </div>
            <div style={styles.authPrompt}>
              <p style={styles.authPromptText}>
                Sign in to bookmark stories and build your personal library
              </p>
              <Link to="/login" style={buttonStyles.primary}>
                Sign In
              </Link>
            </div>
          </section>
        )}
        <Section title="Recently Updated" novels={recentlyUpdated} />
        <Section title="All Works" novels={allWorks} />
      </div>
    </div>
  );
};

export const Homepage = () => {
  return <HomeSections />;
};
