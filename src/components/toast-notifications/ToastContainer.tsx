import { useState, useRef } from "react";

interface ToastType {
  toastId: number;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const timerRef = useRef<Record<number, NodeJS.Timeout>>({});
  const handleClose = (toastId: number) => {
    clearTimeout(timerRef.current[toastId]);
    setToasts((prevToasts) => {
      return prevToasts.filter((toast) => {
        return toast.toastId !== toastId;
      });
    });
  };
  const handleAdd = (message: string, type: ToastType["type"]) => {
    const toastId = new Date().getTime();
    setToasts([...toasts, { toastId, message, type }]);
    timerRef.current[toastId] = setTimeout(() => handleClose(toastId), 5000);
  };
  return (
    <div className="container">
      <div className="toast-container">
        {toasts?.length > 0 &&
          toasts.map((toast) => {
            return (
              <div key={toast.toastId} className={`toast ${toast.type}`}>
                <div>{toast.message}</div>
                <div
                  className="close-button"
                  onClick={() => handleClose(toast.toastId)}
                >
                  x
                </div>
              </div>
            );
          })}
      </div>
      <div className={"btn-container"}>
        <button onClick={() => handleAdd("Success Alert", "success")}>
          Success Toast
        </button>
        <button onClick={() => handleAdd("Info Alert", "info")}>
          Info Toast
        </button>
        <button onClick={() => handleAdd("Warning Alert", "warning")}>
          Warning Toast
        </button>
        <button onClick={() => handleAdd("Error Alert", "error")}>
          Error Toast
        </button>
      </div>
    </div>
  );
}
