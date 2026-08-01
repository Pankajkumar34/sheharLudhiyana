import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, LoaderCircle } from "lucide-react";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

useEffect(() => {
  console.log("URL:", window.location.href);
  console.log("Search:", window.location.search);

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  console.log("Token:", token);

  if (!token) return;

  localStorage.setItem("s_accessToken", token);

  console.log("Saved:", localStorage.getItem("s_accessToken"));

  setTimeout(() => {
    setLoading(false);
  }, 1500);
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-lg shadow-2xl p-8 text-center">
        {loading ? (
          <>
            <LoaderCircle
              className="mx-auto h-14 w-14 text-blue-600 animate-spin"
              strokeWidth={2}
            />

            <h2 className="mt-6 text-2xl font-bold text-gray-800">
              Signing you in...
            </h2>

            <p className="mt-2 text-gray-500">
              Please wait while we verify your Google account.
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2
                className="h-14 w-14 text-green-600"
                strokeWidth={2.5}
              />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-gray-900">
              Welcome 👋
            </h1>

            <p className="mt-2 text-xl font-semibold text-blue-600">
              Shehar Ludhiana
            </p>

            <p className="mt-5 text-gray-600 leading-7">
              Thank you for signing in with Google.
              <br />
              Your account has been verified successfully.
            </p>

            <button
              onClick={() => navigate("/profile")}
              className="mt-8 w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold transition-all duration-300 hover:bg-blue-700 hover:scale-[1.02] active:scale-95"
            >
              Continue to Profile
              <ArrowRight size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthSuccess;