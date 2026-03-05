import { useRef, useEffect, useState } from "react";

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDangerous?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const dialogStyles = {
  dialog: {
    borderRadius: "12px",
    padding: "0",
    maxWidth: "448px",
    width: "90vw",
    background: "linear-gradient(to bottom, #1a1a1a, #0f0f0f)",
    border: "1px solid #333333",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.8)",
    outline: "none",
    backdropFilter: "blur(4px)",
  } as React.CSSProperties,
  content: {
    padding: "32px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
  } as React.CSSProperties,
  header: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
  } as React.CSSProperties,
  iconBox: {
    width: "48px",
    height: "48px",
    minWidth: "48px",
    borderRadius: "8px",
    backgroundColor: "rgba(127, 29, 29, 0.4)",
    border: "1px solid rgba(153, 27, 27, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#ffffff",
    margin: "0",
    lineHeight: "1.3",
    flex: 1,
  } as React.CSSProperties,
  message: {
    fontSize: "14px",
    color: "#a3a3a3",
    margin: "0",
    lineHeight: "1.6",
  } as React.CSSProperties,
  divider: {
    height: "1px",
    background: "linear-gradient(to right, #333333, #444444, #333333)",
    border: "none",
    margin: "0",
  } as React.CSSProperties,
  buttonContainer: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    paddingTop: "8px",
  } as React.CSSProperties,
  cancelButton: {
    padding: "10px 24px",
    borderRadius: "8px",
    border: "1px solid #444444",
    backgroundColor: "rgba(26, 26, 26, 0.5)",
    color: "#a3a3a3",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    outline: "none",
  } as React.CSSProperties,
  confirmButtonBase: {
    padding: "10px 24px",
    borderRadius: "8px",
    border: "none",
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    outline: "none",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.4)",
  } as React.CSSProperties,
  confirmButtonDangerous: {
    backgroundColor: "#7f1d1d",
    border: "1px solid #991b1b",
  } as React.CSSProperties,
  confirmButtonSafe: {
    backgroundColor: "#2563eb",
    border: "1px solid #1d4ed8",
  } as React.CSSProperties,
};

export const ConfirmDialog = ({
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDangerous = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [hoverCancel, setHoverCancel] = useState(false);
  const [hoverConfirm, setHoverConfirm] = useState(false);

  useEffect(() => {
    if (dialogRef.current) dialogRef.current.showModal();
    return () => {
      if (dialogRef.current?.open) dialogRef.current.close();
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onCancel();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onCancel();
  };

  const cancelButtonStyle = hoverCancel
    ? {
        ...dialogStyles.cancelButton,
        backgroundColor: "#252525",
        color: "#ffffff",
        borderColor: "#555555",
      }
    : dialogStyles.cancelButton;

  const confirmButtonStyle = hoverConfirm
    ? {
        ...dialogStyles.confirmButtonBase,
        ...(isDangerous
          ? dialogStyles.confirmButtonDangerous
          : dialogStyles.confirmButtonSafe),
        backgroundColor: isDangerous ? "#991b1b" : "#1d4ed8",
        boxShadow: isDangerous
          ? "0 10px 20px -5px rgba(127, 29, 29, 0.4)"
          : "0 10px 20px -5px rgba(37, 99, 235, 0.4)",
      }
    : {
        ...dialogStyles.confirmButtonBase,
        ...(isDangerous
          ? dialogStyles.confirmButtonDangerous
          : dialogStyles.confirmButtonSafe),
      };

  return (
    <>
      <style>{`
        dialog::backdrop {
          background-color: rgba(0, 0, 0, 0.3);
        }
      `}</style>
      <dialog
        ref={dialogRef}
        style={dialogStyles.dialog}
        onKeyDown={handleKeyDown}
        onClick={handleBackdropClick}
      >
        <div style={dialogStyles.content}>
          {/* Header with icon */}
          <div style={dialogStyles.header}>
            <h2 style={dialogStyles.title}>{title}</h2>
          </div>

          {/* Message */}
          <p style={dialogStyles.message}>{message}</p>

          {/* Divider */}
          <hr style={dialogStyles.divider} />

          {/* Action buttons */}
          <div style={dialogStyles.buttonContainer}>
            <button
              onClick={onCancel}
              style={cancelButtonStyle}
              onMouseEnter={() => setHoverCancel(true)}
              onMouseLeave={() => setHoverCancel(false)}
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              style={confirmButtonStyle}
              onMouseEnter={() => setHoverConfirm(true)}
              onMouseLeave={() => setHoverConfirm(false)}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
