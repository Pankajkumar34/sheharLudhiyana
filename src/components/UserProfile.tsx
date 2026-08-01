import { useEffect, useState } from "react";
import Navbar from "./Navbar";

import { useNavigate } from "react-router-dom";
import { useProfile } from "@/tanstack/auth.tanstack";
import BusinessList from "./webComponents/BusinessList.js"
import FreeUserLocationAndNearby from "./nearByPlaces.js";
// ─── Types ────────────────────────────────────────────────────────────────────

interface Business {
  id: string;
  name: string;
  category: string;
  location: string;
  status: "Active" | "Pending";
  rating?: number;
  reviewCount?: number;
  views?: number;
  clicks?: number;
  image?: string;
}

interface ActivityItem {
  id: string;
  type: "coins" | "review" | "blog" | "visit";
  title: string;
  description: string;
  time: string;
  hasArrow?: boolean;
}

interface User {
  name: string;
  bio: string;
  location: string;
  rank: string;
  coins: number;
  reviews: number;
  blogs: number;
  followers: number;
  avatar?: string;
  businesses: Business[];
  activity: ActivityItem[];
}

// ─── Constants ────────────────────────────────────────────────────────────────


const CURRENT_PERKS = [
  "Access to exclusive events",
  "2x coin multiplier on reviews",
  "Priority business listing",
  "Featured blogger badge",
];


// ─── Helpers ──────────────────────────────────────────────────────────────────


export default function UserProfile() {
  const { data: user, isLoading, error }: any = useProfile();
  const [bizTab, setBizTab] = useState<"All" | "Active" | "Pending">("All");
  const navigate = useNavigate()




  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 font-sans">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-12 gap-5">

          {/* ── Left Column ── */}
          <div className="col-span-12 md:col-span-4 flex flex-col gap-4">

            {/* Profile card */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {/* Cover */}
              <div className="h-28 bg-gradient-to-br from-orange-400 via-red-400 to-orange-600" />
              {/* Avatar */}
              <div className="px-6 pb-5">
                <div className="relative -mt-12 mb-3 w-fit">
                  <div className="w-20 h-20 rounded-full bg-orange-100 border-4 border-white flex items-center justify-center">
                    {user?.profileImage
                      ? <img src={user?.profileImage} alt={user?.fullName} className="w-full h-full rounded-full object-cover" />
                      : <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e07b3f" strokeWidth={1.5}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
                    }
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm2 2h10v2H7v-2z" /></svg>
                  </div>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{user?.fullName}</h2>
                {/* <p className="text-sm text-gray-500 mt-0.5 leading-snug">{user.bio}</p> */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>
                    {user?.address?.city} {user?.address?.state} {user?.address?.country}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
                    {new Date(user?.createdAt).toLocaleDateString()}  </span>
                </div>
                <div className="flex gap-3 mt-4">
                  <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    Edit Profile
                  </button>
                  <button className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2 rounded-lg flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
                    Share Profile
                  </button>
                </div>
              </div>

            </div>


          </div>

          {/* ── Right Column ── */}
          <div className="col-span-12 md:col-span-8 flex flex-col gap-5">
            {
              user?.isProfileCompleted === false ? (
                <>
                  <div className=" flex items-center justify-center bg-gray-50 px-4">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-orange-100 p-8 text-center">
                      <div className="w-20 h-20 mx-auto rounded-full bg-orange-100 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-orange-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3m0 4h.01M10.29 3.86l-7.5 13A1 1 0 003.67 18h16.66a1 1 0 00.88-1.5l-7.5-13a1 1 0 00-1.74 0z"
                          />
                        </svg>
                      </div>

                      <h2 className="text-2xl font-bold text-gray-800 mt-5">
                        Complete Your Profile
                      </h2>

                      <p className="text-gray-500 mt-3 leading-7">
                        Your profile is not completed yet. Please complete your profile to
                        access all features like adding businesses, writing blogs, earning
                        coins, and much more.
                      </p>

                      <button
                        onClick={() => navigate("/complete-profile")}
                        className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition"
                      >
                        Complete Profile
                      </button>
                    </div>
                  </div>
                </>
              ) :
                (<>
                  {/* Ranking card */}

{/* <FreeUserLocationAndNearby/> */}
                  {/* Your Businesses */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#e07b3f"
                            strokeWidth={2}
                          >
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <path d="M3 9h18M9 21V9" />
                          </svg>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Your Businesses
                          </h3>
                          <p className="text-sm text-gray-500">
                            Manage your business listings
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate("/list-your-business")}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium"
                      >
                        + Add Business
                      </button>
                    </div>

                    <div className="flex gap-3 border-b mb-5">
                      {(["All", "Active", "Pending"] as const).map((item) => (
                        <button
                          key={item}
                          onClick={() => setBizTab(item)}
                          className={`pb-3 px-2 border-b-2 transition ${bizTab === item
                              ? "border-orange-500 text-orange-500"
                              : "border-transparent text-gray-500"
                            }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                    <BusinessList status={bizTab} />
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#378add" strokeWidth={2}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                        </div>
                        <div>
                          <p className="text-base font-semibold text-gray-900">Recent Activity</p>
                          <p className="text-xs text-gray-500">Your latest actions</p>
                        </div>
                      </div>
                      <button className="text-sm text-orange-500 hover:underline font-medium">View All</button>
                    </div>

                    <div className="flex flex-col gap-1">

                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-white border border-orange-100 rounded-xl p-4 flex items-center gap-3 hover:border-orange-300 transition-all group">
                        <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e07b3f" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="7" y1="8" x2="17" y2="8" /><line x1="7" y1="12" x2="17" y2="12" /><line x1="7" y1="16" x2="13" y2="16" /></svg>
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold text-orange-500">Write Blog</p>
                          <p className="text-xs text-gray-400">Earn up to 70 coins</p>
                        </div>
                      </button>
                      <button className="bg-white border border-blue-100 rounded-xl p-4 flex items-center gap-3 hover:border-blue-300 transition-all group">
                        <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#378add" strokeWidth={2}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold text-blue-500">Explore</p>
                          <p className="text-xs text-gray-400">Discover businesses</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </>)
            }
          </div>

        </div>
      </div>
    </>
  );
}  