import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import BG_URL from "../../assets/images/bgimg.jpg";
const VALID_EMAIL = "modassar@amaraa.com";
const VALID_PASSWORD = "modassar#12$";
const AUTH_TOKEN = "fadfasder445$%^&Uhhf";

const Diamond = ({ color = "#c9a84c", op = 0.6 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <div style={{ flex: 1, height: "0.5px", background: color, opacity: op }} />
    <div
      style={{
        width: 5,
        height: 5,
        border: `1px solid ${color}`,
        transform: "rotate(45deg)",
        opacity: op,
      }}
    />
    <div style={{ flex: 1, height: "0.5px", background: color, opacity: op }} />
  </div>
);

function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  suffix,
  hasError,
}) {
  const [focus, setFocus] = useState(false);
  const lifted = focus || value.length > 0;
  return (
    <div style={{ position: "relative" }}>
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: 14,
          zIndex: 1,
          pointerEvents: "none",
          top: lifted ? 7 : "50%",
          transform: lifted ? "none" : "translateY(-50%)",
          fontSize: lifted ? 10 : 15,
          letterSpacing: lifted ? "0.18em" : "0.01em",
          textTransform: lifted ? "uppercase" : "none",
          color: hasError ? "#c0392b" : focus ? "#16305c" : "#8099b8",
          fontFamily: "'Lato', sans-serif",
          fontWeight: lifted ? 700 : 400,
          transition: "all 0.2s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          display: "block",
          width: "100%",
          boxSizing: "border-box",
          background: focus ? "#fff" : "#f8f6f2",
          border: `1.5px solid ${hasError ? "#e0b0b0" : focus ? "#16305c" : "#d0d8e6"}`,
          outline: "none",
          padding: lifted ? "22px 44px 8px 14px" : "16px 44px 16px 14px",
          color: "#0b1d3a",
          fontSize: 15,
          fontFamily: "'Lato', sans-serif",
          transition: "all 0.2s ease",
          borderRadius: 0,
        }}
      />
      {suffix && (
        <div
          style={{
            position: "absolute",
            right: 13,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {suffix}
        </div>
      )}
    </div>
  );
}

export default function AmaraaLogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errMsg, setErrMsg] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("amaraa_remember");
    if (saved) {
      try {
        setEmail(JSON.parse(saved).email);
        setRemember(true);
      } catch {}
    }
    if (localStorage.getItem("amaraa_token")) window.location.href = "/";
    setTimeout(() => setMounted(true), 60);
  }, []);

  const login = () => {
    setErrMsg("");
    if (!email.trim()) {
      setErrMsg("Email address is required.");
      setStatus("error");
      return;
    }
    if (!pass.trim()) {
      setErrMsg("Password is required.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      if (
        email.trim().toLowerCase() === VALID_EMAIL &&
        pass === VALID_PASSWORD
      ) {
        localStorage.setItem("amaraa_token", AUTH_TOKEN);
        if (remember)
          localStorage.setItem(
            "amaraa_remember",
            JSON.stringify({ email: email.trim().toLowerCase() }),
          );
        else localStorage.removeItem("amaraa_remember");
        setStatus("success");
        setTimeout(() => {
          window.location.href = "/";
        }, 1100);
      } else {
        setStatus("error");
        setErrMsg("Incorrect email or password. Please try again.");
      }
    }, 1400);
  };

  const onKey = (e) => {
    if (e.key === "Enter") login();
  };

  const token = localStorage.getItem("amaraa_token");

  if (!token) {
    return (
      <div
        onKeyDown={onKey}
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          fontFamily: "'Lato', sans-serif",
          overflow: "hidden",
        }}
      >
        <div
          className="left-col"
          style={{
            width: "47%",
            minWidth: 290,
            position: "relative",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <img
            src={BG_URL}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(155deg,rgba(7,16,34,.78) 0%,rgba(7,16,34,.46) 50%,rgba(7,16,34,.82) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background:
                "linear-gradient(90deg,transparent,#c9a84c,transparent)",
              opacity: 0.75,
            }}
          />
          {[
            {
              top: 22,
              left: 22,
              borderTop: "1px solid rgba(201,168,76,.45)",
              borderLeft: "1px solid rgba(201,168,76,.45)",
            },
            {
              top: 22,
              right: 22,
              borderTop: "1px solid rgba(201,168,76,.45)",
              borderRight: "1px solid rgba(201,168,76,.45)",
            },
            {
              bottom: 22,
              left: 22,
              borderBottom: "1px solid rgba(201,168,76,.45)",
              borderLeft: "1px solid rgba(201,168,76,.45)",
            },
            {
              bottom: 22,
              right: 22,
              borderBottom: "1px solid rgba(201,168,76,.45)",
              borderRight: "1px solid rgba(201,168,76,.45)",
            },
          ].map((s, i) => (
            <div
              key={i}
              style={{ position: "absolute", width: 22, height: 22, ...s }}
            />
          ))}

          <div
            style={{
              position: "relative",
              zIndex: 1,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "36px 44px",
            }}
          >
            <div className="">
              <img
                src={logo}
                alt="Amaraa Jewelry"
                style={{
                  height: 100,
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                }}
              />
            </div>

            <div>
              <Diamond />
              <p
                style={{
                  marginTop: 22,
                  marginBottom: 22,
                  color: "rgba(232,240,252,.88)",
                  fontSize: "clamp(1.05rem,1.7vw,1.28rem)",
                  fontFamily: "'Cormorant Garamond',Georgia,serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 1.9,
                }}
              >
                "Where every jewel tells
                <br />a story of elegance."
              </p>
              <Diamond />
              <div
                style={{
                  marginTop: 26,
                  display: "flex",
                  flexDirection: "column",
                  gap: 13,
                }}
              >
                {[
                  "Exclusive member access",
                  "Smart invoice generation",
                  "Secure private dashboard",
                ].map((t, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 11 }}
                  >
                    <div
                      style={{
                        width: 4,
                        height: 4,
                        background: "#c9a84c",
                        opacity: 0.7,
                        transform: "rotate(45deg)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        color: "rgba(175,202,234,.68)",
                        fontSize: 11,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        fontFamily: "'Lato',sans-serif",
                      }}
                    >
                      {t}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p
              style={{
                color: "rgba(115,148,188,.5)",
                fontSize: 10,
                letterSpacing: "0.26em",
                fontFamily: "'Lato',sans-serif",
              }}
            >
              © 2025 AMARAA JEWELRY · KARACHI
            </p>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            background: "#f5f2ec",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "28px 32px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 240,
              height: 240,
              borderRadius: "50%",
              background: "#ede9de",
              opacity: 0.65,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -50,
              left: -50,
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: "#ede9de",
              opacity: 0.5,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              background:
                "linear-gradient(90deg,transparent,#c9a84c55,transparent)",
            }}
          />

          <div
            style={{
              width: "100%",
              maxWidth: 400,
              position: "relative",
              zIndex: 1,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity .5s ease, transform .5s ease",
            }}
          >
            <div
              className="mobile-logo"
              style={{
                display: "none",
                justifyContent: "center",
                marginBottom: 28,
              }}
            >
              <img
                src={logo}
                alt="Amaraa"
                style={{ height: 100, objectFit: "contain" }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  marginBottom: 13,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: "0.5px",
                    background: "#c9a84c",
                    opacity: 0.7,
                  }}
                />
                <span
                  style={{
                    fontSize: 10,
                    color: "#c9a84c",
                    letterSpacing: "0.26em",
                    fontWeight: 700,
                  }}
                >
                  INVOICE PORTAL
                </span>
                <div
                  style={{
                    width: 20,
                    height: "0.5px",
                    background: "#c9a84c",
                    opacity: 0.7,
                  }}
                />
              </div>
              <h1
                style={{
                  fontSize: "clamp(1.8rem,3vw,2.2rem)",
                  fontWeight: 300,
                  color: "#0b1d3a",
                  margin: 0,
                  lineHeight: 1.2,
                  letterSpacing: "0.01em",
                  fontFamily: "'Cormorant Garamond',Georgia,serif",
                }}
              >
                Welcome back
                <br />
                <em style={{ fontStyle: "italic", color: "#16305c" }}>
                  to Amaraa
                </em>
              </h1>
              <p style={{ marginTop: 8, fontSize: 13, color: "#7a8ea8" }}>
                Sign in to manage invoices &amp; orders
              </p>
            </div>

            {(status === "error" || status === "success") && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: status === "success" ? "#edf7f2" : "#fdf1f1",
                  border: `1px solid ${status === "success" ? "#a8d8bc" : "#f0bfbf"}`,
                  borderLeft: `3px solid ${status === "success" ? "#1a7a4a" : "#c0392b"}`,
                  padding: "11px 14px",
                  marginBottom: 18,
                  borderRadius: 2,
                  animation: "fadeIn .25s ease",
                }}
              >
                {status === "success" ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1a7a4a"
                    strokeWidth="2.2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c0392b"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="13" />
                    <circle cx="12" cy="16.5" r=".8" fill="#c0392b" />
                  </svg>
                )}
                <span
                  style={{
                    fontSize: 13,
                    color: status === "success" ? "#1a7a4a" : "#a83225",
                    fontWeight: 500,
                  }}
                >
                  {status === "success"
                    ? "Login successful — redirecting…"
                    : errMsg}
                </span>
              </div>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <Field
                id="email"
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus("idle");
                }}
                hasError={status === "error" && !email.trim()}
              />
              <Field
                id="pass"
                label="Password"
                type={show ? "text" : "password"}
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                  setStatus("idle");
                }}
                hasError={status === "error" && !pass.trim()}
                suffix={
                  <button
                    onClick={() => setShow(!show)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      color: "#8099b8",
                      opacity: 0.65,
                      display: "flex",
                    }}
                  >
                    {show ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                }
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                }}
              >
                <div
                  onClick={() => setRemember(!remember)}
                  style={{
                    width: 16,
                    height: 16,
                    border: `1.5px solid ${remember ? "#16305c" : "#cdd6e6"}`,
                    background: remember ? "#16305c" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all .18s",
                    flexShrink: 0,
                    cursor: "pointer",
                  }}
                >
                  {remember && (
                    <svg width="9" height="9" viewBox="0 0 10 10">
                      <polyline
                        points="2,5.5 4,7.5 8,3"
                        stroke="#fff"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  )}
                </div>
                <span style={{ fontSize: 13, color: "#7a8ea8" }}>
                  Remember me
                </span>
              </label>
              <button
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  color: "#254d8c",
                  fontSize: 13,
                  fontFamily: "'Lato',sans-serif",
                  textDecoration: "underline",
                  textDecorationColor: "#254d8c55",
                }}
              >
                Forgot password?
              </button>
            </div>

            <button
              onClick={login}
              disabled={status === "loading" || status === "success"}
              style={{
                width: "100%",
                padding: "15px 0",
                background: status === "success" ? "#1a7a4a" : "#0b1d3a",
                color: "#dce8f8",
                border: "none",
                cursor:
                  status === "loading" || status === "success"
                    ? "default"
                    : "pointer",
                fontSize: 12,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                fontFamily: "'Lato',sans-serif",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                position: "relative",
                overflow: "hidden",
                transition: "background .35s ease",
                boxShadow: "0 4px 20px rgba(11,29,58,.22)",
              }}
              onMouseEnter={(e) => {
                if (status === "idle")
                  e.currentTarget.style.background = "#16305c";
              }}
              onMouseLeave={(e) => {
                if (status === "idle")
                  e.currentTarget.style.background = "#0b1d3a";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "50%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent)",
                  animation: status === "idle" ? "shimmer 4s infinite" : "none",
                }}
              />
              <span
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {status === "loading" && (
                  <svg
                    style={{ animation: "spin 1s linear infinite" }}
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                )}
                {status === "success" && (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {status === "loading"
                  ? "Authenticating…"
                  : status === "success"
                    ? "Redirecting…"
                    : "Sign In to Portal"}
              </span>
            </button>

            <div
              style={{
                margin: "18px 0",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{ flex: 1, height: "0.5px", background: "#cdd6e6" }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: "#9aadbe",
                  letterSpacing: "0.14em",
                }}
              >
                OR
              </span>
              <div
                style={{ flex: 1, height: "0.5px", background: "#cdd6e6" }}
              />
            </div>

            <button
              style={{
                width: "100%",
                padding: "13px 0",
                background: "#fff",
                border: "1px solid #cdd6e6",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                fontFamily: "'Lato',sans-serif",
                color: "#0b1d3a",
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
                transition: "all .18s",
                boxShadow: "0 1px 4px rgba(11,29,58,.07)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f5f2ec";
                e.currentTarget.style.borderColor = "#aabbcc";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.borderColor = "#cdd6e6";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            <p
              style={{
                marginTop: 18,
                textAlign: "center",
                fontSize: 13,
                color: "#8099b8",
              }}
            >
              Need access?{" "}
              <button
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  color: "#16305c",
                  fontSize: 13,
                  fontFamily: "'Lato',sans-serif",
                  textDecoration: "underline",
                  textDecorationColor: "#16305c55",
                }}
              >
                Contact administrator
              </button>
            </p>
          </div>
        </div>

        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body { height:100%; overflow:hidden; }
        input { -webkit-appearance:none; border-radius:0; }
        input::placeholder { color:#c0ccd8; font-family:'Lato',sans-serif; font-size:14px; }
        input:-webkit-autofill { -webkit-box-shadow:0 0 0 100px #f8f6f2 inset; -webkit-text-fill-color:#0b1d3a; }
        @keyframes spin    { to { transform:rotate(360deg); } }
        @keyframes shimmer { 0%{left:-100%} 100%{left:200%} }
        @keyframes fadeIn  { from{opacity:0;transform:translateY(-5px)} to{opacity:1;transform:none} }
        @media (max-width:700px) {
          .left-col    { display:none !important; }
          .mobile-logo { display:flex !important; }
        }
      `}</style>
      </div>
    );
  }
}
