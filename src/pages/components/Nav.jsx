import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";

export default function Nav() {
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    if (loading) return;
    setLoading(true);
    try {
      localStorage.clear();
    } catch (_) {}
    try {
      sessionStorage.clear();
    } catch (_) {}
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
    setTimeout(() => {
      window.location.href = "/login";
    }, 400);
  };

  return (
    <>
      {/* Inject subtle shimmer keyframe */}
      <style>{`
        @keyframes amaraa-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .amaraa-shimmer-line {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(45,79,174,0.6) 40%,
            rgba(45,79,174,1) 50%,
            rgba(45,79,174,0.6) 60%,
            transparent 100%
          );
          background-size: 200% auto;
          animation: amaraa-shimmer 3s linear infinite;
        }
        @keyframes amaraa-spin {
          to { transform: rotate(360deg); }
        }
        .amaraa-spin { animation: amaraa-spin 0.7s linear infinite; }
      `}</style>

      <nav
        className={`
          w-full sticky top-0 z-[9999]
          transition-all duration-500 ease-in-out
          ${
            scrolled
              ? "bg-white/95 backdrop-blur-md shadow-[0_4px_32px_rgba(26,42,108,0.12)] border-b border-[#1a2a6c]/15"
              : "bg-white border-b border-[#1a2a6c]/10 shadow-[0_1px_0_rgba(26,42,108,0.08)]"
          }
        `}
      >
        {/* Top accent line — shimmer */}
        <div className="absolute top-0 left-0 right-0 h-[2px] amaraa-shimmer-line" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="h-[68px] sm:h-[76px] flex items-center justify-between gap-6">
            {/* ── LOGO ── */}
            <a
              href="/"
              aria-label="Amaraa Jewelry — Home"
              className="flex-shrink-0 flex items-center group outline-none focus-visible:ring-2 focus-visible:ring-[#2d4fae]/40 rounded"
            >
              <img
                src={logo}
                alt="Amaraa Jewelry"
                className="
                  h-9 sm:h-11 w-auto object-contain
                  transition-all duration-500
                  group-hover:opacity-80 group-hover:scale-[1.02]
                "
                draggable={false}
              />
            </a>

            {/* ── RIGHT SIDE ── */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Thin decorative divider */}
              <div className="hidden sm:block w-px h-6 bg-[#1a2a6c]/15" />

              {/* LOGOUT BUTTON */}
              <button
                onClick={handleLogout}
                disabled={loading}
                aria-label="Logout"
                className="
                  group relative flex items-center gap-2.5
                  overflow-hidden
                  cursor-pointer
                  border border-[#2d4fae]/30
                  rounded-sm
                  px-4 sm:px-6 py-2 sm:py-2.5
                  text-[10px] sm:text-[11px] tracking-[0.2em] uppercase
                  font-semibold text-[#1a2a6c]
                  transition-all duration-300
                  hover:border-[#2d4fae] hover:text-white
                  hover:shadow-[0_4px_20px_rgba(26,42,108,0.3)]
                  active:scale-95
                  disabled:opacity-50 disabled:pointer-events-none
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d4fae]/40
                "
                style={{ fontFamily: "'Montserrat', 'Nunito', sans-serif" }}
              >
                {/* Hover fill — slides in from left */}
                <span
                  className="
                    absolute inset-0 bg-[#1a2a6c]
                    translate-x-[-101%] group-hover:translate-x-0
                    transition-transform duration-300 ease-in-out
                  "
                  aria-hidden="true"
                />

                {/* Icon */}
                <span className="relative z-10 flex items-center">
                  {loading ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      className="w-3.5 h-3.5 amaraa-spin"
                      aria-hidden="true"
                    >
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                  )}
                </span>

                {/* Label */}
                <span className="relative z-10 hidden sm:inline">
                  {loading ? "Signing out…" : "Sign Out"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom shimmer line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2d4fae]/20 to-transparent" />
      </nav>
    </>
  );
}
