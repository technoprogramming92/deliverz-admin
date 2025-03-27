import { useEffect } from "react";
import { logoutUser } from "../lib/firebase";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = "/"; // 🔁 redirect after logout
    } catch (err) {
      alert("Logout failed: " + err);
    }
  };

  useEffect(() => {
    const button = document.getElementById("logout-btn");
    if (button) {
      button.addEventListener("click", handleLogout);
    }

    return () => {
      button?.removeEventListener("click", handleLogout);
    };
  }, []);

  return null; // this component only handles behavior, not UI
};

export default LogoutButton;
