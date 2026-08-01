import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {useAuth} from "../hooks/useAuth"
const STORAGE_KEY = "shehar_ludhiana_user";
const REDIRECT_KEY = "shehar_ludhiana_redirect";

const Navbar = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [blogsOpen, setBlogsOpen] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const [hospitalsOpen, setHospitalsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const blogsRef = useRef<HTMLDivElement>(null);
  const propertiesRef = useRef<HTMLDivElement>(null);
  const hospitalsRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("s_accessToken");
      setCurrentUser(raw ? user : null);
    } catch {
      setCurrentUser(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setDropdownOpen(false);
      if (blogsRef.current && !blogsRef.current.contains(e.target as Node))
        setBlogsOpen(false);
      if (propertiesRef.current && !propertiesRef.current.contains(e.target as Node))
        setPropertiesOpen(false);
      if (hospitalsRef.current && !hospitalsRef.current.contains(e.target as Node))
        setHospitalsOpen(false);
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node))
        setMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleListBusiness = () => {
    setMobileMenuOpen(false);
    if (currentUser) {
      navigate("/list-your-business");
    } else {
      localStorage.setItem(REDIRECT_KEY, "/list-your-business");
      navigate("/login");
    }
  };

  const handleLoginClick = () => {
    localStorage.removeItem(REDIRECT_KEY);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(REDIRECT_KEY);
    setCurrentUser(null);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/");
  };

  const handlePropertyNav = (path: string, requiresAuth: boolean) => {
    setPropertiesOpen(false);
    setMobileMenuOpen(false);
    if (requiresAuth) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const user = raw ? JSON.parse(raw) : null;
        if (user) {
          navigate(path);
        } else {
          const redirectPath = path.split("?")[0];
          localStorage.setItem(REDIRECT_KEY, redirectPath);
          navigate("/login");
        }
      } catch {
        const redirectPath = path.split("?")[0];
        localStorage.setItem(REDIRECT_KEY, redirectPath);
        navigate("/login");
      }
    } else {
      navigate(path);
    }
  };

  const displayName =
    currentUser?.name ?? (currentUser?.phone ? `+91 ${currentUser.phone}` : "User");

  const propertyLinks = [
    {
      label: "Buy Properties",
      path: "/buy-property",
      requiresAuth: false,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      label: "Sell Properties",
      path: "/sell-your-property",
      requiresAuth: true,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      ),
    },
    {
      label: "Rent Properties",
      path: "/rent-property",
      requiresAuth: false,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        </svg>
      ),
    },
    {
      label: "All Properties",
      path: "/properties",
      requiresAuth: false,
      divider: true,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10H3M21 6H3M21 14H3M21 18H3" />
        </svg>
      ),
    },
  ];

  const hospitalLinks = [
    {
      label: "All Hospitals",
      path: "/hospitals",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <line x1="12" y1="9" x2="12" y2="15"/><line x1="9" y1="12" x2="15" y2="12"/>
        </svg>
      ),
    },
    {
      label: "By Speciality",
      path: "/hospitals?view=speciality",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      ),
    },
    {
      label: "Find a Doctor",
      path: "/hospitals?view=doctors",
      divider: true,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
      ),
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      {/* 
        KEY FIX: Use a max-w container and tighter gaps so nav items don't overflow.
        - gap-4 on md, gap-6 only on xl+
        - Button text shortened to "List Business" on md, full text on xl+
        - Logo shrinks slightly on md
        - Nav switches from md: to lg: so mobile hamburger shows up to lg
      */}
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="text-xl lg:text-2xl font-bold text-primary italic font-serif shrink-0">
          Shehar Ludhiana
        </Link>

        {/* Desktop Nav Links — only visible lg and above */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 flex-1 justify-center">
          {[
            { label: "Home", path: "/" },
            { label: "Explore", path: "/explore" },
            { label: "Areas", path: "/areas" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                location.pathname === item.path ? "text-primary" : "text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Blogs Dropdown */}
          <div className="relative" ref={blogsRef}>
            <button
              onClick={() => { setBlogsOpen((p) => !p); setPropertiesOpen(false); setHospitalsOpen(false); }}
              className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${blogsOpen ? "text-primary" : "text-foreground"}`}
            >
              Blogs
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${blogsOpen ? "rotate-180" : ""}`}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {blogsOpen && (
              <div className="absolute left-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                <button onClick={() => { navigate("/write-blog"); setBlogsOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  Write Blog
                </button>
                <button onClick={() => { navigate("/blogs"); setBlogsOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7" y1="9" x2="17" y2="9"/><line x1="7" y1="13" x2="13" y2="13"/></svg>
                  View Blogs
                </button>
              </div>
            )}
          </div>

          {/* Properties Dropdown */}
          <div className="relative" ref={propertiesRef}>
            <button
              onClick={() => { setPropertiesOpen((p) => !p); setBlogsOpen(false); setHospitalsOpen(false); }}
              className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                propertiesOpen || location.pathname.startsWith("/properties") || location.pathname.startsWith("/buy-property") || location.pathname.startsWith("/rent-property") || location.pathname.startsWith("/sell-your-property")
                  ? "text-primary"
                  : "text-foreground"
              }`}
            >
              Properties
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${propertiesOpen ? "rotate-180" : ""}`}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {propertiesOpen && (
              <div className="absolute left-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                {propertyLinks.map((link) => (
                  <div key={link.path}>
                    {link.divider && <div className="border-t border-gray-100 my-1" />}
                    <button
                      onClick={() => handlePropertyNav(link.path, link.requiresAuth)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {link.icon}
                      <span>{link.label}</span>
                      {link.requiresAuth && !currentUser && (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "auto" }}>
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                        </svg>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hospitals Dropdown */}
          <div className="relative" ref={hospitalsRef}>
            <button
              onClick={() => { setHospitalsOpen((p) => !p); setBlogsOpen(false); setPropertiesOpen(false); }}
              className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                hospitalsOpen || location.pathname.startsWith("/hospitals") ? "text-primary" : "text-foreground"
              }`}
            >
              Hospitals
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${hospitalsOpen ? "rotate-180" : ""}`}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {hospitalsOpen && (
              <div className="absolute left-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                {hospitalLinks.map((link) => (
                  <div key={link.label}>
                    {link.divider && <div className="border-t border-gray-100 my-1" />}
                    <button
                      onClick={() => { navigate(link.path); setHospitalsOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/events"
            className={`text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
              location.pathname === "/events" ? "text-primary" : "text-foreground"
            }`}
          >
            Events
          </Link>
        </nav>

        {/* Desktop Right Side — lg and above */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
          {/* Button label: short on lg, full on xl */}
          <Button size="sm" onClick={handleListBusiness} className="whitespace-nowrap text-xs xl:text-sm px-3 xl:px-4">
            <span className="hidden xl:inline">List Your Business Free</span>
            <span className="xl:hidden">List Business</span>
          </Button>

          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
              >
                <span className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </span>
                <span className="max-w-[80px] truncate">{user?.fullName ?? "User"}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  <div className="px-4 py-2.5 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-800 truncate">{displayName}</p>
                    <p className="text-xs text-gray-400 capitalize">{isAuthenticated ?? "phone"} login</p>
                  </div>
                  <button onClick={() => { navigate("/dashboard"); setDropdownOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                    Dashboard
                  </button>
                  <button onClick={() => { navigate("/profile"); setDropdownOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                    Profile
                  </button>
                  <div className="border-t border-gray-100 mt-1">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button variant="ghost" size="sm" onClick={handleLoginClick}>
              Login
            </Button>
          )}
        </div>

        {/* ── MOBILE / TABLET (below lg) ──────────────────────────────────── */}
        <div className="flex lg:hidden items-center gap-2" ref={mobileMenuRef}>
          {isAuthenticated ? (
            <button
              onClick={() => { navigate("/dashboard"); }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700"
            >
              <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </span>
              <span className="max-w-[60px] truncate text-xs">{user.fullName ?? "User"}</span>
            </button>
          ) : (
            <Button variant="ghost" size="sm" onClick={handleLoginClick} className="text-sm px-3">
              Login
            </Button>
          )}

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          {mobileMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg z-50 py-2 max-h-[85vh] overflow-y-auto">
              <div className="px-4 py-3 border-b border-gray-100">
                <Button size="sm" className="w-full" onClick={handleListBusiness}>
                  List Your Business Free
                </Button>
              </div>

              <div className="px-2 py-1">
                {[
                  { label: "Home", path: "/" },
                  { label: "Explore", path: "/explore" },
                  { label: "Areas", path: "/areas" },
                  { label: "Events", path: "/events" },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50 ${
                      location.pathname === item.path ? "text-primary bg-primary/5" : "text-gray-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Blogs */}
                <div className="px-3 pt-2.5 pb-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Blogs</p>
                </div>
                <button onClick={() => { navigate("/write-blog"); setMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  Write Blog
                </button>
                <button onClick={() => { navigate("/blogs"); setMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7" y1="9" x2="17" y2="9"/><line x1="7" y1="13" x2="13" y2="13"/></svg>
                  View Blogs
                </button>

                {/* Properties */}
                <div className="px-3 pt-2.5 pb-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Properties</p>
                </div>
                {propertyLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => handlePropertyNav(link.path, link.requiresAuth)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                    {link.requiresAuth && !currentUser && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "auto" }}>
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                      </svg>
                    )}
                  </button>
                ))}

                {/* Hospitals */}
                <div className="px-3 pt-2.5 pb-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Hospitals</p>
                </div>
                {hospitalLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => { navigate(link.path); setMobileMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </button>
                ))}

                {currentUser && (
                  <>
                    <div className="border-t border-gray-100 my-2" />
                    <button onClick={() => { navigate("/dashboard"); setMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                      Dashboard
                    </button>
                    <button onClick={() => { navigate("/profile"); setMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                      Profile
                    </button>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;