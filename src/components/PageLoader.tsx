/* ─── PageLoader.tsx ────────────────────────────────────────────────────────
   Creative pharma loader:
   • 3 capsules orbiting the logo on angled paths (like electrons)
   • Each capsule has a liquid-fill animation in the brand colours
   • Morphing glow halo behind the logo
   • Floating micro-particle dots
   • Pulsing progress bar
─────────────────────────────────────────────────────────────────────────── */

const PageLoader = ({ message = "Loading..." }: { message?: string }) => (
  <>
    <style>{`
      /* ════════════════════════════════════════════
         BASE LAYOUT
      ════════════════════════════════════════════ */
      .pl-root {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0;
        background: linear-gradient(135deg,
          hsl(225 30% 97%) 0%,
          hsl(240 25% 99%) 40%,
          hsl(295 30% 97%) 100%);
        overflow: hidden;
      }
      .dark .pl-root {
        background: linear-gradient(135deg,
          hsl(225 30% 6%) 0%,
          hsl(225 28% 8%) 50%,
          hsl(260 25% 9%) 100%);
      }

      /* ════════════════════════════════════════════
         BACKGROUND PARTICLES
      ════════════════════════════════════════════ */
      .pl-particles {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }
      .pl-particle {
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        animation: plParticleFloat linear infinite;
        opacity: 0;
      }
      @keyframes plParticleFloat {
        0%   { transform: translateY(100vh) scale(0); opacity: 0; }
        10%  { opacity: 0.6; }
        90%  { opacity: 0.4; }
        100% { transform: translateY(-20vh) scale(1.5); opacity: 0; }
      }

      /* Large background glow blobs */
      .pl-blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        animation: plBlobMorph ease-in-out infinite alternate;
        pointer-events: none;
      }
      @keyframes plBlobMorph {
        0%   { transform: scale(1) translate(0, 0); border-radius: 50%; }
        33%  { transform: scale(1.15) translate(20px, -15px); border-radius: 60% 40% 55% 45%; }
        66%  { transform: scale(0.9) translate(-15px, 20px); border-radius: 45% 55% 40% 60%; }
        100% { transform: scale(1.05) translate(10px, 10px); border-radius: 50%; }
      }

      /* ════════════════════════════════════════════
         ORBIT SYSTEM
      ════════════════════════════════════════════ */
      .pl-orbit-system {
        position: relative;
        width: 260px;
        height: 260px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* ── Orbit rings ── */
      .pl-ring {
        position: absolute;
        border-radius: 50%;
        border: 1.5px dashed hsl(225 30% 55% / 0.18);
      }
      .pl-ring-1 { width: 200px; height: 200px; }
      .pl-ring-2 { width: 152px; height: 152px; border-color: hsl(295 65% 72% / 0.15); }

      /* ── Capsule orbiting wrapper ── */
      .pl-orbiter {
        position: absolute;
        width: 200px;
        height: 200px;
        top: 30px; left: 30px;
        animation: plOrbit1 3s linear infinite;
      }
      .pl-orbiter-2 {
        width: 200px; height: 200px;
        top: 30px; left: 30px;
        position: absolute;
        animation: plOrbit2 4.5s linear infinite;
      }
      .pl-orbiter-3 {
        width: 152px; height: 152px;
        top: 54px; left: 54px;
        position: absolute;
        animation: plOrbit3 2.2s linear infinite;
      }

      @keyframes plOrbit1 { from { transform: rotate(0deg);   } to { transform: rotate(360deg); } }
      @keyframes plOrbit2 { from { transform: rotate(120deg); } to { transform: rotate(480deg); } }
      @keyframes plOrbit3 { from { transform: rotate(240deg); } to { transform: rotate(600deg); } }

      /* ── Capsule pill ── */
      .pl-capsule-pin {
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
      }
      .pl-capsule {
        width: 18px;
        height: 36px;
        border-radius: 9px;
        overflow: hidden;
        box-shadow: 0 4px 16px hsl(295 65% 72% / 0.4);
        position: relative;
      }
      .pl-capsule-b { box-shadow: 0 4px 16px hsl(225 35% 60% / 0.45) !important; }
      .pl-capsule-c { box-shadow: 0 4px 16px hsl(260 50% 65% / 0.4) !important; }

      /* liquid fill from bottom */
      .pl-cap-body {
        position: absolute;
        inset: 0;
        background: hsl(225 30% 92%);
      }
      .dark .pl-cap-body { background: hsl(225 30% 20%); }
      .pl-cap-liquid {
        position: absolute;
        bottom: 0; left: 0; right: 0;
        border-radius: 0 0 9px 9px;
        animation: plLiquidFill 2s ease-in-out infinite alternate;
      }
      .pl-liq-pink  { background: linear-gradient(180deg, hsl(295 65% 75%), hsl(295 55% 60%)); }
      .pl-liq-blue  { background: linear-gradient(180deg, hsl(225 40% 65%), hsl(225 30% 52%)); }
      .pl-liq-purp  { background: linear-gradient(180deg, hsl(260 55% 70%), hsl(260 45% 58%)); }

      @keyframes plLiquidFill {
        0%   { height: 30%; }
        100% { height: 80%; }
      }

      /* liquid wave top */
      .pl-cap-wave {
        position: absolute;
        top: -4px; left: -4px; right: -4px;
        height: 8px;
        border-radius: 50%;
        opacity: 0.7;
        animation: plWave 1s ease-in-out infinite alternate;
      }
      @keyframes plWave { 0% { transform: scaleX(1); } 100% { transform: scaleX(1.3); } }

      .pl-cap-shine-pill {
        position: absolute;
        top: 4px; left: 3px;
        width: 5px; height: 55%;
        border-radius: 4px;
        background: linear-gradient(180deg, rgba(255,255,255,0.6), transparent);
        z-index: 2;
      }

      /* counter-rotate the capsule so it stays upright */
      .pl-capsule-upright {
        animation: plOrbit1Rev 3s linear infinite;
      }
      .pl-capsule-upright-2 {
        animation: plOrbit2Rev 4.5s linear infinite;
      }
      .pl-capsule-upright-3 {
        animation: plOrbit3Rev 2.2s linear infinite;
      }
      @keyframes plOrbit1Rev { from { transform: rotate(0deg);    } to { transform: rotate(-360deg); } }
      @keyframes plOrbit2Rev { from { transform: rotate(-120deg); } to { transform: rotate(-480deg); } }
      @keyframes plOrbit3Rev { from { transform: rotate(-240deg); } to { transform: rotate(-600deg); } }

      /* ════════════════════════════════════════════
         CENTRE LOGO
      ════════════════════════════════════════════ */
      .pl-logo-wrap {
        position: relative;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pl-logo-halo {
        position: absolute;
        width: 90px; height: 90px;
        border-radius: 50%;
        background: radial-gradient(circle, hsl(295 65% 72% / 0.22), hsl(225 30% 55% / 0.12), transparent 70%);
        animation: plHaloPulse 2.4s ease-in-out infinite;
      }
      @keyframes plHaloPulse {
        0%, 100% { transform: scale(1);   opacity: 0.8; }
        50%       { transform: scale(1.35); opacity: 0.4; }
      }
      .pl-logo-inner {
        position: relative;
        width: 70px; height: 70px;
        border-radius: 20px;
        background: rgba(255,255,255,0.9);
        backdrop-filter: blur(8px);
        border: 1.5px solid rgba(255,255,255,0.6);
        box-shadow:
          0 8px 32px hsl(225 30% 55% / 0.15),
          0 0 0 1px hsl(295 65% 72% / 0.12);
        display: flex;
        align-items: center;
        justify-content: center;
        animation: plLogoBreath 3s ease-in-out infinite;
      }
      .dark .pl-logo-inner {
        background: rgba(30,35,55,0.9);
        border-color: rgba(255,255,255,0.1);
      }
      @keyframes plLogoBreath {
        0%, 100% { box-shadow: 0 8px 32px hsl(225 30% 55% / 0.15), 0 0 0 1px hsl(295 65% 72% / 0.12); }
        50%       { box-shadow: 0 12px 40px hsl(295 65% 72% / 0.3),  0 0 0 3px hsl(295 65% 72% / 0.2);  }
      }

      /* ════════════════════════════════════════════
         BOTTOM INFO
      ════════════════════════════════════════════ */
      .pl-bottom {
        margin-top: 36px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
      }

      /* Brand name */
      .pl-brand {
        font-family: 'Poppins', 'Inter', sans-serif;
        font-size: 17px;
        font-weight: 700;
        letter-spacing: 0.05em;
        background: linear-gradient(135deg, hsl(225 30% 42%), hsl(295 55% 58%));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      /* Progress track */
      .pl-track {
        width: 160px;
        height: 4px;
        border-radius: 99px;
        background: hsl(225 20% 88%);
        overflow: hidden;
        position: relative;
      }
      .dark .pl-track { background: hsl(225 20% 22%); }
      .pl-fill {
        position: absolute;
        inset: 0;
        width: 40%;
        border-radius: 99px;
        background: linear-gradient(90deg, hsl(225 35% 60%), hsl(295 65% 68%));
        animation: plFillSlide 1.8s ease-in-out infinite;
      }
      @keyframes plFillSlide {
        0%   { transform: translateX(-100%); width: 55%; }
        100% { transform: translateX(280%);  width: 40%; }
      }

      /* Message */
      .pl-msg {
        font-family: 'Inter', sans-serif;
        font-size: 12px;
        font-weight: 500;
        color: hsl(225 15% 55%);
        letter-spacing: 0.06em;
        text-transform: uppercase;
        animation: plMsgFade 1.8s ease-in-out infinite;
      }
      @keyframes plMsgFade { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
    `}</style>

    <div className="pl-root">

      {/* ── Background blobs ── */}
      <div
        className="pl-blob"
        style={{ width:400, height:400, top:"-10%", right:"-5%",
          background:"hsl(295 65% 72% / 0.07)", animationDuration:"9s" }}
      />
      <div
        className="pl-blob"
        style={{ width:350, height:350, bottom:"-10%", left:"-5%",
          background:"hsl(225 30% 55% / 0.07)", animationDuration:"12s", animationDelay:"3s" }}
      />

      {/* ── Floating particles ── */}
      <div className="pl-particles">
        {[
          { left:"10%", color:"hsl(295 65% 72%)", delay:"0s",   dur:"7s"  },
          { left:"25%", color:"hsl(225 35% 60%)", delay:"1.2s", dur:"9s"  },
          { left:"40%", color:"hsl(260 50% 65%)", delay:"2.5s", dur:"6s"  },
          { left:"55%", color:"hsl(295 65% 72%)", delay:"0.7s", dur:"8s"  },
          { left:"70%", color:"hsl(225 35% 60%)", delay:"3.1s", dur:"7.5s"},
          { left:"82%", color:"hsl(260 50% 65%)", delay:"1.8s", dur:"10s" },
          { left:"90%", color:"hsl(295 65% 72%)", delay:"4s",   dur:"6.5s"},
          { left:"15%", color:"hsl(225 35% 60%)", delay:"5s",   dur:"9s"  },
          { left:"60%", color:"hsl(260 50% 65%)", delay:"2s",   dur:"8s"  },
          { left:"35%", color:"hsl(295 65% 72%)", delay:"0.3s", dur:"7s"  },
        ].map((p, i) => (
          <div
            key={i}
            className="pl-particle"
            style={{
              left: p.left,
              bottom: "-10px",
              background: p.color,
              animationDelay: p.delay,
              animationDuration: p.dur,
              width: `${4 + (i % 3) * 3}px`,
              height: `${4 + (i % 3) * 3}px`,
              boxShadow: `0 0 6px ${p.color}`,
            }}
          />
        ))}
      </div>

      {/* ══ ORBIT SYSTEM ══ */}
      <div className="pl-orbit-system">

        {/* Orbit rings */}
        <div className="pl-ring pl-ring-1" />
        <div className="pl-ring pl-ring-2" />

        {/* Capsule 1 — outer orbit, pink */}
        <div className="pl-orbiter">
          <div className="pl-capsule-pin">
            <div className="pl-capsule-upright">
              <div className="pl-capsule">
                <div className="pl-cap-body" />
                <div className="pl-cap-liquid pl-liq-pink" style={{ animationDelay:"0s" }}>
                  <div className="pl-cap-wave pl-liq-pink" />
                </div>
                <div className="pl-cap-shine-pill" />
              </div>
            </div>
          </div>
        </div>

        {/* Capsule 2 — outer orbit offset, blue */}
        <div className="pl-orbiter-2">
          <div className="pl-capsule-pin">
            <div className="pl-capsule-upright-2">
              <div className="pl-capsule pl-capsule-b">
                <div className="pl-cap-body" />
                <div className="pl-cap-liquid pl-liq-blue" style={{ animationDelay:"0.6s" }}>
                  <div className="pl-cap-wave pl-liq-blue" />
                </div>
                <div className="pl-cap-shine-pill" />
              </div>
            </div>
          </div>
        </div>

        {/* Capsule 3 — inner orbit, purple */}
        <div className="pl-orbiter-3">
          <div className="pl-capsule-pin">
            <div className="pl-capsule-upright-3">
              <div className="pl-capsule pl-capsule-c"
                style={{ width:14, height:28, borderRadius:7, boxShadow:"0 4px 14px hsl(260 50% 65% / 0.4)" }}>
                <div className="pl-cap-body" />
                <div className="pl-cap-liquid pl-liq-purp" style={{ animationDelay:"1.1s", borderRadius:"0 0 7px 7px" }}>
                  <div className="pl-cap-wave pl-liq-purp" />
                </div>
                <div className="pl-cap-shine-pill" style={{ width:4, top:3 }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Centre logo ── */}
        <div className="pl-logo-wrap">
          <div className="pl-logo-halo" />
          <div className="pl-logo-inner">
            <img
              src="/assets/siscon_pharma_icon.png"
              alt="Siscon Pharma"
              style={{ height:46, width:"auto" }}
            />
          </div>
        </div>

      </div>

      {/* ══ BOTTOM SECTION ══ */}
      <div className="pl-bottom">
        <span className="pl-brand">Siscon Pharma</span>
        <div className="pl-track">
          <div className="pl-fill" />
        </div>
        <span className="pl-msg">{message}</span>
      </div>

    </div>
  </>
);

export default PageLoader;
