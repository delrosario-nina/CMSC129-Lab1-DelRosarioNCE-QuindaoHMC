import { Link } from "react-router-dom";

export const Header = () => {
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
            ((e.currentTarget as HTMLAnchorElement).style.color = "#FF00DD")
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
                  "#FF00DD";
                (e.currentTarget as HTMLInputElement).style.boxShadow =
                  "0 0 0 2px rgba(255,0,221,0.15)";
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
        <span
          className="material-symbols-outlined"
          style={{
            color: "#9ca3af",
            fontSize: "28px",
            cursor: "pointer",
            transition: "color 0.15s ease",
            flexShrink: 0,
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLSpanElement).style.color = "#FF00DD")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLSpanElement).style.color = "#9ca3af")
          }
        >
          account_circle
        </span>
      </div>
    </header>
  );
};
