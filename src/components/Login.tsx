import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogin } from "../lib/api/auth.api.js"
type Tab = "phone" | "google";
type Step = "phone" | "otp" | "loggedIn";

interface UserData {
  phone?: string;
  name?: string;
  email?: string;
  loginMethod: "phone" | "google";
  loginTime: string;
}

const STORAGE_KEY = "shehar_ludhiana_user";
const REDIRECT_KEY = "shehar_ludhiana_redirect";

function saveUser(user: UserData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function getUser(): UserData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function clearUser() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(REDIRECT_KEY);
}

function getRedirectPath(): string {
  const saved = localStorage.getItem(REDIRECT_KEY);
  localStorage.removeItem(REDIRECT_KEY);
  return saved ?? "/dashboard";
}

export default function LoginPage() {
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>("phone");
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [phoneError, setPhoneError] = useState("");
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  useEffect(() => {
    const saved = getUser();
    if (saved) {
      setCurrentUser(saved);
    }
  }, []);

  const handleSendOtp = () => {
    if (phone.length !== 10) {
      setPhoneError("Enter a valid 10-digit mobile number");
      return;
    }
    setPhoneError("");
    setStep("otp");
  };

  const handleOtpChange = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) {
      document.getElementById(`otp-${idx + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      document.getElementById(`otp-${idx - 1}`)?.focus();
    }
  };

  // Accept ANY 6-digit OTP → save to localStorage → redirect
  const handleVerify = () => {
    const user: UserData = {
      phone,
      loginMethod: "phone",
      loginTime: new Date().toISOString(),
    };
    saveUser(user);
    setCurrentUser(user);
    navigate(getRedirectPath()); 
  };

  const handleLogout = () => {
    clearUser();
    setCurrentUser(null);
    setPhone("");
    setOtp(["", "", "", "", "", ""]);
    setStep("phone");
    setTab("phone");
  };

  // ── Already Logged In ─────────────────────────────────────────────
  if (step === "loggedIn" && currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-12">
        <h1 className="text-4xl mb-6 font-bold" style={{ fontFamily: "'Dancing Script', cursive", color: "#f97316" }}>
          Shehar Ludhiana
        </h1>
        <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-orange-100 flex items-center justify-center text-4xl">
            {currentUser.loginMethod === "google" ? "🌐" : "👤"}
          </div>
          <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse"></span>
            Logged In
          </span>
          <h2 className="text-xl font-extrabold text-gray-900 mb-1">
            {currentUser.name ?? `+91 ${currentUser.phone}`}
          </h2>
          {currentUser.email && <p className="text-gray-400 text-sm mb-1">{currentUser.email}</p>}

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-5 text-left space-y-2.5">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">💾 localStorage Data</p>
            <Row label="Key" value={STORAGE_KEY} mono orange />
            {currentUser.phone && <Row label="Phone" value={`+91 ${currentUser.phone}`} />}
            {currentUser.name && <Row label="Name" value={currentUser.name} />}
            {currentUser.email && <Row label="Email" value={currentUser.email} />}
            <Row label="Method" value={currentUser.loginMethod} />
            <Row label="Login Time" value={new Date(currentUser.loginTime).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} />
          </div>

          <button onClick={() => navigate("/dashboard")} className="w-full mt-4 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors">
            Go to Dashboard
          </button>
          <button onClick={handleLogout} className="w-full mt-3 py-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 font-bold text-sm transition-colors border border-red-200">
            Logout & Clear Data
          </button>
        </div>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');`}</style>
      </div>
    );
  }

  // ── Login Screen ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-4xl mb-2 font-bold" style={{ fontFamily: "'Dancing Script', cursive", color: "#f97316", letterSpacing: 1 }}>
        Shehar Ludhiana
      </h1>
      <h2 className="text-3xl font-extrabold text-gray-900 mt-3 mb-1">Welcome Back</h2>
      <p className="text-gray-500 text-sm mb-8">Login to access your account and manage your business</p>

      <div className="bg-white rounded-2xl shadow-md p-7 w-full max-w-sm">

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-full p-1 mb-6">
          <button
            onClick={() => { setTab("phone"); setStep("phone"); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all ${tab === "phone" ? "bg-white shadow text-orange-500" : "text-gray-500 hover:text-gray-700"}`}
          >
            <span>📞</span> Phone OTP
          </button>
          <button
            onClick={() => setTab("google")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all ${tab === "google" ? "bg-white shadow text-orange-500" : "text-gray-500 hover:text-gray-700"}`}
          >
            <GoogleIcon /> Google
          </button>
        </div>

        {/* Phone OTP Tab */}
        {tab === "phone" && (
          <>
            {step === "phone" ? (
              <>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <div className={`flex items-center border rounded-xl overflow-hidden mb-1 ${phoneError ? "border-red-400" : "border-gray-300"}`}>
                  <span className="bg-gray-50 border-r border-gray-300 px-3 py-3 text-sm font-semibold text-gray-600">+91</span>
                  <input
                    className="flex-1 px-3 py-3 text-sm text-gray-900 outline-none"
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                  />
                </div>
                {phoneError && <p className="text-red-500 text-xs mb-2">{phoneError}</p>}
                <button
                  onClick={handleSendOtp}
                  className={`w-full py-3 rounded-xl text-white font-bold text-sm mt-3 transition-colors ${phone.length === 10 ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-300 cursor-not-allowed"}`}
                >
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <div className="text-center mb-5">
                  <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">📱</div>
                  <p className="text-sm font-semibold text-gray-800">OTP sent to +91 {phone}</p>
                  <p className="text-xs text-gray-400 mt-1">Enter any 6-digit code to continue</p>
                </div>
                <div className="flex gap-2 justify-center mb-4">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-10 h-11 border border-gray-300 rounded-lg text-center text-base font-bold text-gray-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />
                  ))}
                </div>
                <button
                  onClick={handleVerify}
                  disabled={!otp.every((d) => d !== "")}
                  className={`w-full py-3 rounded-xl text-white font-bold text-sm transition-colors ${otp.every((d) => d !== "") ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-300 cursor-not-allowed"}`}
                >
                  Verify & Login
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">
                  Didn't receive OTP?{" "}
                  <button className="text-orange-500 font-semibold hover:underline" onClick={() => setStep("phone")}>Resend</button>
                </p>
              </>
            )}
          </>
        )}

        {/* Google Tab */}
        {tab === "google" && (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <GoogleIcon size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Continue with Google</h3>
            <p className="text-gray-500 text-sm mb-5">Sign in securely using your Google account</p>
            
            <button
              onClick={googleLogin}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors mb-5"
            >
              <GoogleIcon size={18} /> Continue with Google
            </button>
            <p className="text-xs text-gray-400 leading-relaxed">
              By continuing with Google, you allow Shehar Ludhiana to access your basic profile information (name, email, profile photo) to create your account.
            </p>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
          By logging in, you agree to our{" "}
          <a href="#" className="text-orange-500 hover:underline font-medium">Terms of Service</a> and{" "}
          <br />
          <a href="#" className="text-orange-500 hover:underline font-medium">Privacy Policy</a>
        </p>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');`}</style>
    </div>
  );
}

function Row({ label, value, mono = false, orange = false }: { label: string; value: string; mono?: boolean; orange?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400 text-xs">{label}</span>
      <span className={`text-xs font-semibold ${orange ? "text-orange-500" : "text-gray-700"} ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}

function GoogleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}