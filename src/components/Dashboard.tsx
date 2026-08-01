import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "shehar_ludhiana_user";

interface UserData {
  phone?: string;
  name?: string;
  email?: string;
  loginMethod?: string;
  loginTime?: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
      else navigate("/login");
    } catch {
      navigate("/login");
    }
  }, []);

  const displayName = user?.name ?? (user?.phone ? user.phone : "User");
  const displayLabel = user?.name ? "Google Account" : "New Account";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 max-w-6xl mx-auto">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">Welcome {user?.name ? user.name : "User"}!</h1>
            <p className="text-sm text-gray-500">{user?.phone ?? user?.email ?? ""}</p>
            <span className="inline-block mt-1 text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              {displayLabel}
            </span>
          </div>
        </div>
        <button
          onClick={() => navigate("/analytics")}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
          View Analytics
        </button>
      </div>

      {/* ── Campaign + Benefits ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* Campaign Card */}
        <div className="lg:col-span-2 rounded-2xl p-7 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)" }}>
          {/* Featured badge */}
          <span className="absolute top-5 right-5 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
            FEATURED
          </span>

          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-5 text-white text-xl">
            📢
          </div>

          <h2 className="text-2xl font-extrabold text-white mb-1">Launch Campaign for Your Business</h2>
          <p className="text-white/80 text-sm mb-6">Promote your business and get more visibility on our platform.</p>

          {/* Price box */}
          <div className="bg-white/15 rounded-xl p-5 mb-5">
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-black text-white">₹999</span>
              <span className="text-white/70 text-sm">/month</span>
            </div>
            <ul className="space-y-2">
              {[
                "Top 10 placement in Featured Businesses on Home Page",
                "Top 10 placement in Explore section",
                "Increased visibility and customer reach",
                "Priority listing in search results",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-white text-sm">
                  <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <button className="w-full bg-white text-orange-500 font-bold py-3.5 rounded-xl text-sm hover:bg-orange-50 transition-colors">
            Start Campaign Now
          </button>
          <p className="text-center text-white/60 text-xs mt-3">Cancel anytime · No hidden fees · Instant activation</p>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-5">
          {/* Campaign Benefits */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 text-base mb-4">Campaign Benefits</h3>
            <ul className="space-y-3.5">
              {[
                { icon: "👁", title: "10x More Views", desc: "Featured businesses get significantly more visibility" },
                { icon: "👥", title: "More Customers", desc: "Reach thousands of potential customers daily" },
                { icon: "⭐", title: "Premium Badge", desc: "Stand out with a featured business badge" },
                { icon: "📈", title: "Analytics", desc: "Track views, clicks, and engagement" },
              ].map((b) => (
                <li key={b.title} className="flex items-start gap-3">
                  <span className="text-orange-400 text-base mt-0.5">{b.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{b.title}</p>
                    <p className="text-xs text-gray-400 leading-snug">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Special Offer */}
          <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}>
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl mb-3">🎁</div>
            <h3 className="font-extrabold text-lg mb-1">Special Offer!</h3>
            <p className="text-white/80 text-xs mb-3">Subscribe for 6 months and get 15% discount. Limited time offer!</p>
            <p className="text-2xl font-black">Save ₹899</p>
          </div>
        </div>
      </div>

      {/* ── Quick Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        {/* List Your Business */}
        <div
          className="bg-white rounded-2xl p-6 border border-dashed border-orange-300 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate("/list-your-business")}
        >
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-xl mb-3">🏪</div>
          <h4 className="font-bold text-gray-900 text-sm mb-1">List Your Business</h4>
          <p className="text-gray-400 text-xs">Add your business to our directory and reach more customers</p>
        </div>

        {/* My Reviews */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-xl mb-3">⭐</div>
          <h4 className="font-bold text-gray-900 text-sm mb-1">My Reviews</h4>
          <p className="text-gray-400 text-xs mb-3">View and manage your business reviews</p>
          <span className="text-2xl font-extrabold text-blue-500">0</span>
        </div>

        {/* My Blogs */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-xl mb-3">📝</div>
          <h4 className="font-bold text-gray-900 text-sm mb-1">My Blogs</h4>
          <p className="text-gray-400 text-xs mb-3">Write blogs and earn coins</p>
          <span className="text-2xl font-extrabold text-green-500">0</span>
        </div>
      </div>

      {/* ── Recent Activity + Quick Actions ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 text-base mb-4">Recent Activity</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm text-gray-700">
              <span className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              Account created successfully
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-400">
              <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              Complete your profile to get started
            </li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 text-base mb-4">Quick Actions</h3>
          <div className="space-y-2.5">
            {[
              { label: "View Campaign Analytics", color: "bg-blue-50 text-blue-600", icon: "📊", path: "/analytics" },
              { label: "Add Business Listing", color: "bg-orange-50 text-orange-500", icon: "+", path: "/list-your-business" },
              { label: "Write a Blog", color: "bg-purple-50 text-purple-600", icon: "✏️", path: "/write-blog" },
              { label: "Create Event", color: "bg-green-50 text-green-600", icon: "📅", path: "/events/create" },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors hover:opacity-80 ${action.color}`}
              >
                <span className="text-base">{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}