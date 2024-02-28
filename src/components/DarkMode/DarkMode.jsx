import React, { useState, useEffect } from "react";
import "./DarkMode.scss";

const DarkMode = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  const [buttonContent, setButtonContent] = useState("🌙");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // Ändern Sie den Button-Inhalt je nach Theme
    setButtonContent(newTheme === "light" ? "🌑" : "☀️");
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <button onClick={toggleTheme} className="dark-mode-button">
      {buttonContent}
    </button>
  );
};

export default DarkMode;
