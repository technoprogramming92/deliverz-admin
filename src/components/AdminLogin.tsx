import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../lib/firebase";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Set session-based persistence (login lasts only in current tab/session)
      await setPersistence(auth, browserSessionPersistence);

      // Firebase login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ✅ Optional: Store for use in Navbar or dashboard
      sessionStorage.setItem("adminEmail", user.email || "");

      alert("Login Successful! Redirecting to dashboard...");
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError("⚠️ " + (err.message || "Login failed."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[450px] m-auto pt-24 pb-16">
      <header className="text-center mb-8">
        <h2 className="text-bgray-900 dark:text-white text-4xl font-semibold font-poppins mb-2">
          Sign in to DeliverZ.
        </h2>
        <p className="font-urbanis text-base font-medium text-bgray-600 dark:text-bgray-50">
          Admin Portal
        </p>
      </header>

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <input
            type="email"
            className="text-bgray-800 text-base border border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6 relative">
          <input
            type="password"
            className="text-bgray-800 text-base border border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-danger text-center">{error}</p>}

        <button
          type="submit"
          className="py-3.5 flex items-center justify-center text-white font-bold bg-success-300 hover:bg-success-400 transition-all rounded-lg w-full"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
