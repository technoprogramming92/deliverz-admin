import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

const AdminAuthGuard = () => {
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // ❌ Not logged in: Redirect to login ("/")
        window.location.href = "/";
      } else {
        // ✅ Logged in: allow render
        setAuthChecked(true);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!authChecked) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status" />
        <p className="mt-2">Checking admin authentication...</p>
      </div>
    );
  }

  return null; // All good, allow the page to continue rendering
};

export default AdminAuthGuard;
