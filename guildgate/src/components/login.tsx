import { useState } from "react";

import bgImage   from "../assets/bg-images/login-bg-image.png";
import logoImage from "../assets/logo/guildgate.png";
import footerImg from "../assets/logo/login-footer-icon.png";

/* ─── Types ─── */

interface LoginProps {
  onSignIn?:   (credentials: { nickname: string; password: string }) => void;
  onRegister?: () => void;
}

/* ─── Component ─── */

export default function Login({
  onSignIn   = () => {},
  onRegister = () => {},
}: LoginProps) {
  const [nickname,     setNickname]     = useState<string>("");
  const [password,     setPassword]     = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div style={s.root}>

      {/* ── Background image ── */}
      <div style={s.bg} />

      {/* ── Top gradient fade ── */}
      <div style={s.bgGradient} />

      {/* ── Content ── */}
      <div style={s.scroll}>

        {/* Logo — occupa tutta la parte alta */}
        <div style={s.logoWrap}>
          <img src={logoImage} alt="GuildGate" style={s.logoImg} />
        </div>

        {/* Headline */}
        <div style={s.headlineWrap}>
          <p style={s.headline}>Welcome back, adventurer</p>
          <p style={s.sub}>Find your Party. Fight Together</p>
        </div>

        {/* Card form */}
        <div style={s.card}>

          {/* Nickname */}
          <div style={s.field}>
            <span style={s.label}>Nickname</span>
            <div style={s.inputRow}>
              <UserSVG />
              <input
                style={s.input}
                type="text"
                placeholder="Insert your nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div style={s.field}>
            <span style={s.label}>Password</span>
            <div style={s.inputRow}>
              <LockSVG />
              <input
                style={s.input}
                type={showPassword ? "text" : "password"}
                placeholder="Insert your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                style={s.eyeBtn}
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeOffSVG /> : <EyeSVG />}
              </button>
            </div>
          </div>

          {/* Sign In */}
          <button
            style={s.signIn}
            onClick={() => onSignIn({ nickname, password })}
          >
            Sign In
          </button>

        </div>

        {/* Register */}
        <p style={s.registerRow}>
          No account yet?{" "}
          <span style={s.registerLink} onClick={onRegister}>
            Register
          </span>
        </p>

        {/* Footer icon */}
        <div style={s.footerWrap}>
          <div style={s.footerLine} />
          <img src={footerImg} alt="" style={s.footerImg} />
          <div style={s.footerLine} />
        </div>

      </div>
    </div>
  );
}

/* ─── SVG Icons ─── */

function UserSVG() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="#7a7060" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function LockSVG() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="#7a7060" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EyeSVG() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="#7a7060" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffSVG() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="#7a7060" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

/* ─── Styles ─── */

const GOLD     = "#C9A84C";
const GOLD_DIM = "rgba(201,168,76,0.20)";
const FONT     = "'Palatino Linotype', 'Book Antiqua', Palatino, serif";

const s: Record<string, React.CSSProperties> = {

  /* Wrapper */
  root: {
    position:        "relative",
    width:           "100%",
    minHeight:       "100vh",
    display:         "flex",
    justifyContent:  "center",
    backgroundColor: "#0e0e48",
    overflow:        "hidden",
  },

  /* Background castello */
  bg: {
    position:           "absolute",
    top:                0,
    left:               0,
    right:              0,
    height:             "58%",
    backgroundImage:    `url(${bgImage})`,
    backgroundSize:     "cover",
    backgroundPosition: "center top",
    filter:             "brightness(0.55) saturate(0.7)",
  },

  /* Gradiente che sfuma il bg verso il basso */
  bgGradient: {
    position:   "absolute",
    top:        0,
    left:       0,
    right:      0,
    bottom:     0,
    background: "linear-gradient(to bottom, rgba(8,8,10,0) 30%, rgba(8,8,10,0.7) 52%, rgba(8,8,10,1) 68%)",
  },

  /* Colonna centrale */
  scroll: {
    position:      "relative",
    zIndex:        1,
    width:         "100%",
    maxWidth:      390,
    minHeight:     "100vh",
    display:       "flex",
    flexDirection: "column",
    alignItems:    "center",
    paddingBottom: 36,
    boxSizing:     "border-box",
  },

  /* Logo in cima, grande */
  logoWrap: {
    width:          "100%",
    display:        "flex",
    justifyContent: "center",
    paddingTop:     60,
    marginBottom:   32,
  },

  logoImg: {
    width:     "72%",
    maxWidth:  280,
    height:    "auto",
    objectFit: "contain",
  },

  /* Headline */
  headlineWrap: {
    textAlign:    "center",
    marginBottom: 24,
    paddingLeft:  24,
    paddingRight: 24,
  },

  headline: {
    margin:        "0 0 4px",
    fontFamily:    FONT,
    fontSize:      17,
    fontWeight:    600,
    color:         "#eee8dc",
    letterSpacing: 0.4,
  },

  sub: {
    margin:        0,
    fontFamily:    FONT,
    fontSize:      12,
    color:         "#8a8070",
    letterSpacing: 0.3,
  },

  /* Card */
  card: {
    width:                "calc(100% - 48px)",
    backgroundColor:      "rgba(7, 7, 10, 0.75)",
    border:               `1px solid ${GOLD_DIM}`,
    borderRadius:         16,
    padding:              "20px 16px 20px",
    backdropFilter:       "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    display:              "flex",
    flexDirection:        "column",
    gap:                  14,
    marginBottom:         20,
  },

  /* Field */
  field: {
    display:       "flex",
    flexDirection: "column",
    gap:           6,
  },

  label: {
    fontFamily:    FONT,
    fontSize:      13,
    fontWeight:    600,
    color:         "#c0aa78",
    letterSpacing: 0.6,
  },

  inputRow: {
    display:         "flex",
    alignItems:      "center",
    gap:             10,
    height:          44,
    backgroundColor: "rgba(255,255,255,0.04)",
    border:          "1px solid rgba(201,168,76,0.15)",
    borderRadius:    8,
    paddingLeft:     12,
    paddingRight:    12,
  },

  input: {
    flex:       1,
    background: "transparent",
    border:     "none",
    outline:    "none",
    color:      "#ccc4b0",
    fontSize:   13,
    fontFamily: FONT,
    caretColor: GOLD,
  },

  eyeBtn: {
    background: "none",
    border:     "none",
    padding:    0,
    cursor:     "pointer",
    display:    "flex",
    alignItems: "center",
  },

  /* Sign In button */
  signIn: {
    marginTop:       4,
    width:           "100%",
    height:          46,
    backgroundColor: GOLD,
    border:          "none",
    borderRadius:    10,
    color:           "#1a1008",
    fontFamily:      FONT,
    fontSize:        13,
    fontWeight:      700,
    letterSpacing:   2.5,
    textTransform:   "uppercase",
    cursor:          "pointer",
  },

  /* Register */
  registerRow: {
    margin:     0,
    fontFamily: FONT,
    fontSize:   12.5,
    color:      "#8a8070",
  },

  registerLink: {
    color:               GOLD,
    fontWeight:          700,
    cursor:              "pointer",
    textDecoration:      "underline",
    textDecorationColor: "rgba(201,168,76,0.35)",
  },

  /* Footer */
  footerWrap: {
    marginTop:      "auto",
    paddingTop:     28,
    display:        "flex",
    alignItems:     "center",
    gap:            10,
    width:          "calc(100% - 48px)",
    justifyContent: "center",
  },

  footerLine: {
    flex:            1,
    height:          1,
    backgroundColor: "rgba(255, 196, 32, 0.18)",
  },

  footerImg: {
    width:     26,
    height:    26,
    objectFit: "contain",
    opacity:   0.5,
  },
};
