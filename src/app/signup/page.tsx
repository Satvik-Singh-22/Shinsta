"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/auth";
import { saveUser } from "@/lib/create";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail]                 = useState("");
  const [password, setPassword]           = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError]                 = useState("");
  const [loading, setLoading]             = useState(false);
  const [showPassword, setShowPassword]   = useState(false);
  const [name, setName]                   = useState("");
  const [showModal, setShowModal]         = useState(false);
  const [username, setUsername]           = useState("");
  const [profilePic, setProfilePic]       = useState("");
  const [userId, setUserId]               = useState("");
  const [detailsLoading, setDetailsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const user = await register(email, password);
      setUserId(user.uid);
      setShowModal(true);
    } catch {
      setError("Failed to register");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDetails = async () => {
    if (!username.trim()) {
      setError("Username is required");
      return;
    }
    setDetailsLoading(true);
    setError("");
    try {
      await saveUser(userId, name, username, profilePic, email);
      setShowModal(false);
      router.push("/homepage");
    } catch (err) {
      console.error(err);
      setError("Failed to save details");
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleSkipForNow = () => {
    setShowModal(false);
    router.push("/homepage");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black1 p-4">
      <div className="bg-beige p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black1">Shinsta</h2>
          <p className="text-black mt-2">
            Sign up to see photos and videos from your friends.
          </p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-black1 border border-gray-700 placeholder-white text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              placeholder="Enter your full name"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-black1 border border-gray-700 placeholder-white text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              placeholder="you@example.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-lg bg-black1 border border-gray-700 placeholder-white text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition pr-12"
                placeholder="Create a strong password"
                required
                minLength={8}
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-white hover:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-black mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-black1 border border-gray-700 placeholder-white text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-700 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition duration-200"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {error && !showModal && (
            <div className="mt-4 p-3 bg-red-700 text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}
        </form>

        <p className="mt-6 text-center text-black">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            Sign in
          </button>
        </p>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Complete Your Profile</h3>
              <p className="text-gray-400 text-sm">
                Just a few more details to get you started!
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="modal-username" className="block text-sm font-medium text-white mb-1">
                  Username *
                </label>
                <input
                  id="modal-username"
                  type="text"
                  placeholder="Choose a unique username"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg placeholder-gray-500 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  disabled={detailsLoading}
                  required
                />
              </div>

              <div>
                <label htmlFor="modal-profilePic" className="block text-sm font-medium text-white mb-1">
                  Profile Picture URL (Optional)
                </label>
                <input
                  id="modal-profilePic"
                  type="url"
                  placeholder="https://example.com/your-photo.jpg"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg placeholder-gray-500 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  value={profilePic}
                  onChange={e => setProfilePic(e.target.value)}
                  disabled={detailsLoading}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-700 text-red-200 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="flex space-x-3 pt-2">
                <button
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition duration-200 font-medium"
                  onClick={handleSkipForNow}
                  disabled={detailsLoading}
                >
                  Skip for Now
                </button>
                <button
                  className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-700 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg transition duration-200 font-medium"
                  onClick={handleSaveDetails}
                  disabled={detailsLoading || !username.trim()}
                >
                  {detailsLoading ? "Saving..." : "Complete Setup"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
