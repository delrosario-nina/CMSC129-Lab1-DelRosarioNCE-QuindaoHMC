import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

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
          maxWidth: "900px",
          margin: "0 auto",
          padding: "14px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        {/* Logo */}
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

        {/* Search Bar */}
        <div style={{ flex: 1, maxWidth: "520px" }}>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "14px",
                color: "#6b7280",
                fontSize: "13px",
                pointerEvents: "none",
                userSelect: "none",
              }}
            ></span>
            <input
              type="text"
              placeholder="Search titles, genres, authors..."
              style={{
                width: "100%",
                backgroundColor: "#1e1e1e",
                border: "1px solid #2e2e2e",
                borderRadius: "10px",
                padding: "10px 80px 10px 52px",
                fontSize: "14px",
                color: "#e5e7eb",
                outline: "none",
                transition: "border-color 0.15s ease, box-shadow 0.15s ease",
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor =
                  "#FFFFFFFF";
                (e.currentTarget as HTMLInputElement).style.boxShadow =
                  "0 0 0 2px rgba(0, 68, 255, 0.15)";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor =
                  "#2e2e2e";
                (e.currentTarget as HTMLInputElement).style.boxShadow = "none";
              }}
            />
          </div>
        </div>

        {/* Login Button */}
        <div style={{ position: "relative" }} ref={menuRef}>
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
              if (!showMenu) {
                (e.currentTarget as HTMLSpanElement).style.color = "#9ca3af";
              }
            }}
          >
            account_circle
          </span>

          {/* Dropdown Menu */}
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
              <div
                style={{
                  padding: "12px 0",
                }}
              >
                {[
                  { label: "Written works", path: "/dashboard" },
                  { label: "Library", path: "/dashboard" },
                  { label: "Settings", path: "#" },
                ].map((item) => (
                  <div
                    key={item.label}
                    onClick={() => {
                      if (item.path !== "#") {
                        navigate(item.path);
                      }
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
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
