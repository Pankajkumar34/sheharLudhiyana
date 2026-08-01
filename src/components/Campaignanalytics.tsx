import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ── Types ────────────────────────────────────────────────────────────────────

type TabKey = "views" | "clicks" | "conversions";

// ── Data ─────────────────────────────────────────────────────────────────────

const weeklyData: Record<TabKey, { day: string; value: number }[]> = {
  views: [
    { day: "Mon", value: 4200 },
    { day: "Tue", value: 5800 },
    { day: "Wed", value: 4900 },
    { day: "Thu", value: 6800 },
    { day: "Fri", value: 6200 },
    { day: "Sat", value: 3800 },
    { day: "Sun", value: 2400 },
  ],
  clicks: [
    { day: "Mon", value: 1100 },
    { day: "Tue", value: 1600 },
    { day: "Wed", value: 1350 },
    { day: "Thu", value: 1900 },
    { day: "Fri", value: 1750 },
    { day: "Sat", value: 1100 },
    { day: "Sun", value: 840 },
  ],
  conversions: [
    { day: "Mon", value: 310 },
    { day: "Tue", value: 480 },
    { day: "Wed", value: 390 },
    { day: "Thu", value: 560 },
    { day: "Fri", value: 490 },
    { day: "Sat", value: 330 },
    { day: "Sun", value: 200 },
  ],
};

const tabColors: Record<TabKey, string> = {
  views: "#378add",
  clicks: "#1d9e75",
  conversions: "#7f77dd",
};

const metrics = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#378add" strokeWidth={2} width={18} height={18}>
        <circle cx="12" cy="12" r="3" />
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
      </svg>
    ),
    iconBg: "#e8f3ff",
    badge: "+23.5%",
    value: "45,234",
    label: "Total Views",
    sub: "Profile page visits",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#1d9e75" strokeWidth={2} width={18} height={18}>
        <path d="M5 3l14 9-14 9V3z" />
      </svg>
    ),
    iconBg: "#e6f9f0",
    badge: "+18.2%",
    value: "12,847",
    label: "Total Clicks",
    sub: "Call, WhatsApp, Website clicks",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#7f77dd" strokeWidth={2} width={18} height={18}>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    iconBg: "#f3eeff",
    badge: "+5.3%",
    value: "28.4%",
    label: "Conversion Rate",
    sub: "Views to action ratio",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#e07b3f" strokeWidth={2} width={18} height={18}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    iconBg: "#fff4e6",
    badge: "+12.8%",
    value: "342%",
    label: "ROI",
    sub: "Return on investment",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#378add" strokeWidth={2} width={18} height={18}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    iconBg: "#e8f3ff",
    badge: "+15.7%",
    value: "6,462",
    label: "Avg. Daily Views",
    sub: "Daily average impressions",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#d4537e" strokeWidth={2} width={18} height={18}>
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    iconBg: "#ffeef4",
    badge: "+0.8",
    value: "8.7/10",
    label: "Engagement Score",
    sub: "Overall engagement quality",
  },
];

const trafficSources = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#e07b3f" strokeWidth={2} width={14} height={14}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    iconBg: "#fff4e6",
    name: "Featured vs Regular",
    pct: 85,
    barColor: "#e07b3f",
    primary: "38,450 primary",
    secondary: "6,784 secondary",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#378add" strokeWidth={2} width={14} height={14}>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    iconBg: "#e8f3ff",
    name: "Mobile vs Desktop",
    pct: 68,
    barColor: "#378add",
    primary: "30,759 primary",
    secondary: "14,475 secondary",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#1d9e75" strokeWidth={2} width={14} height={14}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    iconBg: "#e6f9f0",
    name: "Direct vs Search",
    pct: 72,
    barColor: "#1d9e75",
    primary: "32,568 primary",
    secondary: "12,666 secondary",
  },
];

const topHours = [
  { label: "9 AM – 12 PM", value: 15832, pct: 100 },
  { label: "2 PM – 5 PM", value: 12665, pct: 80 },
  { label: "6 PM – 9 PM", value: 9951, pct: 63 },
  { label: "Other Hours", value: 6786, pct: 43 },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function MetricCard({
  icon,
  iconBg,
  badge,
  value,
  label,
  sub,
}: (typeof metrics)[0]) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: iconBg }}
        >
          {icon}
        </div>
        <span className="text-xs font-medium text-green-600">{badge}</span>
      </div>
      <div>
        <p className="text-xl md:text-2xl font-semibold text-gray-900 leading-tight">{value}</p>
        <p className="text-sm font-medium text-gray-800 mt-0.5">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">{sub}</p>
      </div>
    </div>
  );
}

function TrafficItem({
  icon,
  iconBg,
  name,
  pct,
  barColor,
  primary,
  secondary,
}: (typeof trafficSources)[0]) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center gap-2 mb-1.5">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: iconBg }}
        >
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-800">{name}</span>
        <span className="ml-auto text-xs text-gray-500">{pct}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: barColor }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <span>{primary}</span>
        <span>{secondary}</span>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function CampaignAnalytics() {
  const [activeTab, setActiveTab] = useState<TabKey>("views");

  const tabs: { key: TabKey; label: string }[] = [
    { key: "views", label: "Views" },
    { key: "clicks", label: "Clicks" },
    { key: "conversions", label: "Conversions" },
  ];

  const chartData = weeklyData[activeTab];
  const chartColor = tabColors[activeTab];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <a href="/dashboard" className="text-sm text-orange-500 hover:underline flex items-center gap-1 mb-1.5">
              ← Back to Dashboard
            </a>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Campaign Analytics</h1>
            <p className="text-sm text-gray-500 mt-0.5">Track your campaign performance and ROI</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-gray-700 flex items-center gap-1.5 hover:bg-gray-50 transition-colors">
              Last 7 Days
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} width={12} height={12}>
                <path d="M4 6l4 4 4-4" />
              </svg>
            </button>
            <button className="text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-gray-700 flex items-center gap-1.5 hover:bg-gray-50 transition-colors">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} width={14} height={14}>
                <path d="M8 2v8M5 7l3 3 3-3M3 11v2a1 1 0 001 1h8a1 1 0 001-1v-2" />
              </svg>
              <span className="hidden sm:inline">Export Report</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>
        </div>

        {/* Metrics grid — 2 cols on mobile, 3 on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
          {metrics.map((m) => (
            <MetricCard key={m.label} {...m} />
          ))}
        </div>

        {/* Bottom section — stacked on mobile, side-by-side on lg+ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* Performance Trends chart */}
          <div className="lg:col-span-3 bg-white border border-gray-100 rounded-xl p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
              <div>
                <p className="text-sm font-semibold text-gray-900">Performance Trends</p>
                <p className="text-xs text-gray-400 mt-0.5">Daily metrics overview</p>
              </div>
              <div className="flex gap-1.5">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key)}
                    className={`text-xs px-2.5 sm:px-3 py-1.5 rounded-lg border transition-all ${
                      activeTab === t.key
                        ? "bg-gray-100 border-gray-200 text-gray-800 font-medium"
                        : "border-gray-100 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-44 sm:h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#aaa" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#aaa" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #eee" }}
                    cursor={{ stroke: chartColor, strokeWidth: 1, strokeDasharray: "4 2" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={chartColor}
                    strokeWidth={2}
                    dot={{ r: 3, fill: chartColor }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex gap-4 sm:gap-8 pt-4 border-t border-gray-100 mt-4">
              <div className="text-center flex-1">
                <p className="text-base sm:text-lg font-semibold text-blue-500">34,100</p>
                <p className="text-xs text-gray-400 mt-0.5">Total Views</p>
              </div>
              <div className="text-center flex-1">
                <p className="text-base sm:text-lg font-semibold text-teal-600">9,740</p>
                <p className="text-xs text-gray-400 mt-0.5">Total Clicks</p>
              </div>
              <div className="text-center flex-1">
                <p className="text-base sm:text-lg font-semibold text-violet-500">2,759</p>
                <p className="text-xs text-gray-400 mt-0.5">Total Conversions</p>
              </div>
            </div>
          </div>

          {/* Right column — stacks below chart on mobile */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Traffic Sources */}
            <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5">
              <p className="text-sm font-semibold text-gray-900 mb-4">Traffic Sources</p>
              {trafficSources.map((s) => (
                <TrafficItem key={s.name} {...s} />
              ))}
            </div>

            {/* Top Performing Hours */}
            <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5">
              <p className="text-sm font-semibold text-gray-900 mb-4">Top Performing Hours</p>
              {topHours.map((h) => (
                <div key={h.label} className="flex items-center gap-2 mb-2.5 last:mb-0">
                  <span className="text-xs text-gray-500 w-24 sm:w-32 flex-shrink-0">{h.label}</span>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-orange-400 transition-all duration-500"
                      style={{ width: `${h.pct}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 w-10 sm:w-12 text-right">
                    {h.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}