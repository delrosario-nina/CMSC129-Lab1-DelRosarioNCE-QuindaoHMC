import { useState, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useStories } from "../../../hooks/useStories";

type Suggestion = {
  _id: string;
  label: string;
  sublabel: string;
  type: "title" | "author";
};

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const { data } = useStories();
  const allStories = data ?? [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions: Suggestion[] = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const results: Suggestion[] = [];

    allStories.forEach((story) => {
      if (story.title.toLowerCase().includes(q)) {
        results.push({
          _id: story._id,
          label: story.title,
          sublabel: story.author,
          type: "title",
        });
      }
    });

    const seenAuthors = new Set<string>();
    allStories.forEach((story) => {
      if (
        story.author.toLowerCase().includes(q) &&
        !seenAuthors.has(story.author)
      ) {
        seenAuthors.add(story.author);
        results.push({
          _id: "",
          label: story.author,
          sublabel: "Author",
          type: "author",
        });
      }
    });

    return results.slice(0, 8);
  }, [searchQuery, allStories]);

  const handleSelect = (item: Suggestion) => {
    setShowDropdown(false);
    setSearchQuery("");
    if (item.type === "title" && item._id) {
      navigate(`/reading/${item._id}`);
    } else if (item.type === "author") {
      navigate(`/browse?q=${encodeURIComponent(item.label)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (suggestions.length > 0) {
        handleSelect(suggestions[0]);
      } else if (searchQuery.trim()) {
        navigate(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery("");
        setShowDropdown(false);
      }
    }
    if (e.key === "Escape") setShowDropdown(false);
  };

  const handleLogout = () => {
    logout();
    setShowMenu(false);
    navigate("/");
  };

  return (
    <header
      style={{
        backgroundColor: "#161616",
        borderBottom: "1px solid #222222",
        boxShadow: "0 1px 8px rgba(0,0,0,0.4)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "14px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: "20px",
            fontWeight: "800",
            color: "#ffffff",
            textDecoration: "none",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = "#60a5fa")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = "#ffffff")
          }
        >
          AO3dupe
        </Link>

        <Link
          to="/"
          style={{
            fontSize: "12px",
            fontWeight: "400",
            color: "#ffffff",
            textDecoration: "none",
            letterSpacing: "0.15em",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = "#60a5fa")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = "#ffffff")
          }
        >
          Home
        </Link>

        <Link
          to="/browse"
          style={{
            fontSize: "12px",
            fontWeight: "400",
            color: "#ffffff",
            textDecoration: "none",
            letterSpacing: "0.15em",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = "#60a5fa")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = "#ffffff")
          }
        >
          Browse
        </Link>

        <div style={{ flex: 1, maxWidth: "520px" }} ref={searchRef}>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => {
                if (searchQuery) setShowDropdown(true);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search titles, authors..."
              style={{
                width: "100%",
                backgroundColor: "#1e1e1e",
                border: "1px solid #2e2e2e",
                borderRadius: "10px",
                padding: "10px 16px",
                fontSize: "14px",
                color: "#e5e7eb",
                outline: "none",
                transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                boxSizing: "border-box",
              }}
              onFocusCapture={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor =
                  "#ffffff";
                (e.currentTarget as HTMLInputElement).style.boxShadow =
                  "0 0 0 2px rgba(0,68,255,0.15)";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor =
                  "#2e2e2e";
                (e.currentTarget as HTMLInputElement).style.boxShadow = "none";
              }}
            />

            {showDropdown && suggestions.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  left: 0,
                  right: 0,
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #333333",
                  borderRadius: "10px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                  zIndex: 1000,
                  overflow: "hidden",
                }}
              >
                {suggestions.map((item, i) => (
                  <div
                    key={`${item.type}-${item._id || item.label}-${i}`}
                    onMouseDown={() => handleSelect(item)}
                    style={{
                      padding: "10px 16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                      borderBottom:
                        i < suggestions.length - 1
                          ? "1px solid #222222"
                          : "none",
                      transition: "background-color 0.1s ease",
                    }}
                    onMouseEnter={(e) =>
                      ((
                        e.currentTarget as HTMLDivElement
                      ).style.backgroundColor = "#252525")
                    }
                    onMouseLeave={(e) =>
                      ((
                        e.currentTarget as HTMLDivElement
                      ).style.backgroundColor = "transparent")
                    }
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        color: item.type === "title" ? "#60a5fa" : "#e5e7eb",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#6b7280",
                        flexShrink: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.sublabel}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ position: "relative" }} ref={menuRef}>
          {isAuthenticated ? (
            <>
              <span
                className="material-symbols-outlined"
                style={{
                  color: "#9ca3af",
                  fontSize: "28px",
                  cursor: "pointer",
                  transition: "color 0.15s ease",
                  flexShrink: 0,
                }}
                onClick={() => setShowMenu(!showMenu)}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLSpanElement).style.color = "#60a5fa")
                }
                onMouseLeave={(e) => {
                  if (!showMenu)
                    (e.currentTarget as HTMLSpanElement).style.color = "#9ca3af";
                }}
              >
                account_circle
              </span>

              {showMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: "0",
                    backgroundColor: "#1a1a1a",
                    borderRadius: "8px",
                    border: "1px solid #333333",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
                    minWidth: "200px",
                    marginTop: "8px",
                    zIndex: 1000,
                  }}
                >
                  <div style={{ padding: "12px 16px", borderBottom: "1px solid #333333" }}>
                    <div style={{ fontSize: "14px", fontWeight: "600", color: "#e5e7eb" }}>
                      {user?.username}
                    </div>
                    <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>
                      {user?.email}
                    </div>
                  </div>
                  <div style={{ padding: "8px 0" }}>
                    {[
                      { label: "Written Works", path: "/dashboard/written-works" },
                      { label: "Library", path: "/dashboard/library" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        onClick={() => {
                          navigate(item.path);
                          setShowMenu(false);
                        }}
                        style={{
                          padding: "12px 20px",
                          color: "#e5e7eb",
                          cursor: "pointer",
                          transition: "background-color 0.15s ease",
                          fontSize: "14px",
                        }}
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLDivElement
                          ).style.backgroundColor = "#2a2a2a";
                          (e.currentTarget as HTMLDivElement).style.color =
                            "#60a5fa";
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLDivElement
                          ).style.backgroundColor = "transparent";
                          (e.currentTarget as HTMLDivElement).style.color =
                            "#e5e7eb";
                        }}
                      >
                        {item.label}
                      </div>
                    ))}
                    <div
                      onClick={handleLogout}
                      style={{
                        padding: "12px 20px",
                        color: "#ef4444",
                        cursor: "pointer",
                        transition: "background-color 0.15s ease",
                        fontSize: "14px",
                      }}
                      onMouseEnter={(e) => {
                        (
                          e.currentTarget as HTMLDivElement
                        ).style.backgroundColor = "#2a2a2a";
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLDivElement
                        ).style.backgroundColor = "transparent";
                      }}
                    >
                      Sign Out
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <Link
                to="/login"
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#e5e7eb",
                  textDecoration: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "1px solid #333333",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#60a5fa";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#60a5fa";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#333333";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#e5e7eb";
                }}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#ffffff",
                  textDecoration: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  backgroundColor: "#346eb6",
                  transition: "background-color 0.15s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#60a5fa")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#346eb6")
                }
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
