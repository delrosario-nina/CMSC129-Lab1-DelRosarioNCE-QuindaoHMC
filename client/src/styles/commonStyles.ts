import { theme } from "./theme";

export const pageStyles = {
  page: {
    backgroundColor: theme.colors.background,
    minHeight: "100vh",
    color: theme.colors.text.primary,
  } as React.CSSProperties,
  inner: {
    maxWidth: theme.layout.maxWidth,
    margin: "0 auto",
    padding: theme.layout.padding,
  } as React.CSSProperties,
  innerMobile: {
    maxWidth: theme.layout.maxWidth,
    margin: "0 auto",
    padding: theme.layout.mobilePadding,
  } as React.CSSProperties,
};

export const cardStyles = {
  container: {
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.xl,
    overflow: "hidden",
  } as React.CSSProperties,
  hover: {
    cursor: "pointer",
    transition: `background-color ${theme.transitions.normal}`,
  } as React.CSSProperties,
  padding: {
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
  } as React.CSSProperties,
};

export const buttonStyles = {
  primary: {
    backgroundColor: theme.colors.accent.dark,
    color: theme.colors.text.primary,
    border: "none",
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    borderRadius: theme.borderRadius.lg,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    cursor: "pointer",
    transition: `background-color ${theme.transitions.normal}`,
  } as React.CSSProperties,
  primaryHover: theme.colors.accent.hover,
  secondary: {
    backgroundColor: "transparent",
    border: `1px solid ${theme.colors.borderAccent}`,
    borderRadius: theme.borderRadius.md,
    color: theme.colors.text.secondary,
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    cursor: "pointer",
    transition: `all ${theme.transitions.normal}`,
  } as React.CSSProperties,
  icon: {
    background: "none",
    border: `1px solid ${theme.colors.borderAccent}`,
    borderRadius: theme.borderRadius.md,
    color: theme.colors.accent.primary,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.xs,
    fontSize: theme.fontSize.base,
    transition: `all ${theme.transitions.normal}`,
  } as React.CSSProperties,
  danger: {
    backgroundColor: theme.colors.danger.dark,
    color: theme.colors.danger.light,
    border: "none",
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    borderRadius: theme.borderRadius.lg,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    cursor: "pointer",
  } as React.CSSProperties,
};

export const inputStyles = {
  base: {
    backgroundColor: "#1e1e1e",
    border: `1px solid ${theme.colors.borderLight}`,
    borderRadius: theme.borderRadius.lg,
    padding: `${theme.spacing.md} ${theme.spacing.md}`,
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    outline: "none",
    transition: `border-color ${theme.transitions.fast}, box-shadow ${theme.transitions.fast}`,
    boxSizing: "border-box" as const,
    width: "100%" as const,
  } as React.CSSProperties,
  focus: {
    borderColor: theme.colors.text.primary,
    boxShadow: "0 0 0 2px rgba(0,68,255,0.15)",
  } as React.CSSProperties,
  error: {
    borderColor: theme.colors.danger.primary,
  } as React.CSSProperties,
  textarea: {
    backgroundColor: "#1e1e1e",
    border: `1px solid ${theme.colors.borderLight}`,
    borderRadius: theme.borderRadius.lg,
    padding: `${theme.spacing.md} ${theme.spacing.md}`,
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    outline: "none",
    fontFamily: "inherit",
    resize: "vertical" as const,
    transition: `border-color ${theme.transitions.fast}, box-shadow ${theme.transitions.fast}`,
  } as React.CSSProperties,
};

export const textStyles = {
  title: {
    fontSize: theme.fontSize["3xl"],
    fontWeight: theme.fontWeight.extrabold,
    color: theme.colors.text.primary,
    margin: 0,
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    margin: 0,
  } as React.CSSProperties,
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.muted,
  } as React.CSSProperties,
  body: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    lineHeight: "1.6",
  } as React.CSSProperties,
  muted: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.muted,
  } as React.CSSProperties,
  link: {
    color: theme.colors.accent.primary,
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: theme.fontSize.base,
  } as React.CSSProperties,
  label: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.secondary,
  } as React.CSSProperties,
};

export const badgeStyles = {
  genre: {
    fontSize: theme.fontSize.xs,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.genre.background,
    border: `1px solid ${theme.colors.genre.border}`,
    color: theme.colors.text.secondary,
    fontWeight: theme.fontWeight.medium,
  } as React.CSSProperties,
  tag: {
    fontSize: theme.fontSize.xs,
    padding: `${theme.spacing.xs} ${theme.spacing.xs}`,
    color: theme.colors.text.muted,
    textDecoration: "underline",
    fontWeight: theme.fontWeight.medium,
  } as React.CSSProperties,
  selected: {
    fontSize: theme.fontSize.sm,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    borderRadius: theme.borderRadius.lg,
    border: `1px solid ${theme.colors.text.primary}`,
    backgroundColor: theme.colors.genre.selected,
    color: theme.colors.accent.primary,
    fontWeight: theme.fontWeight.medium,
  } as React.CSSProperties,
};

export const layoutStyles = {
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  } as React.CSSProperties,
  flexColumn: {
    display: "flex",
    flexDirection: "column" as const,
  } as React.CSSProperties,
  flexGap: (gap: string) => ({
    display: "flex",
    gap,
    flexWrap: "wrap" as const,
  }),
};

export const errorStyles = {
  container: {
    backgroundColor: theme.colors.danger.dark,
    color: theme.colors.danger.light,
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
    fontSize: theme.fontSize.md,
  } as React.CSSProperties,
  text: {
    color: theme.colors.danger.primary,
    fontSize: theme.fontSize.sm,
    marginTop: theme.spacing.xs,
  } as React.CSSProperties,
};

export const emptyStateStyles = {
  container: {
    textAlign: "center" as const,
    padding: `${theme.spacing["3xl"]} ${theme.spacing["2xl"]}`,
    color: theme.colors.text.muted,
  } as React.CSSProperties,
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
  } as React.CSSProperties,
  text: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.muted,
    marginBottom: theme.spacing["2xl"],
  } as React.CSSProperties,
};

export const modalStyles = {
  overlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  } as React.CSSProperties,
  content: {
    backgroundColor: "#1a1a1a",
    border: `1px solid ${theme.colors.borderAccent}`,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing["2xl"],
    maxWidth: "400px",
    width: "90%",
    textAlign: "center" as const,
  } as React.CSSProperties,
  header: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  } as React.CSSProperties,
  message: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.dim,
    marginBottom: theme.spacing["2xl"],
  } as React.CSSProperties,
  buttons: {
    display: "flex",
    gap: theme.spacing.md,
    justifyContent: "center",
  } as React.CSSProperties,
};

export const sectionStyles = {
  container: {
    marginBottom: "48px",
  } as React.CSSProperties,
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.lg,
  } as React.CSSProperties,
};
