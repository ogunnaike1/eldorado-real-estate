"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontSize: "14px",
          padding: "14px 18px",
          borderRadius: "0",
          border: "1px solid",
        },
        success: {
          style: {
            background: "#fff",
            color: "#2d3748",
            borderColor: "#38a169",
          },
          iconTheme: {
            primary: "#38a169",
            secondary: "#fff",
          },
        },
        error: {
          style: {
            background: "#fff",
            color: "#2d3748",
            borderColor: "#e53e3e",
          },
          iconTheme: {
            primary: "#e53e3e",
            secondary: "#fff",
          },
        },
        loading: {
          style: {
            background: "#2d3748",
            color: "#fff",
            borderColor: "#2d3748",
          },
        },
      }}
    />
  );
}