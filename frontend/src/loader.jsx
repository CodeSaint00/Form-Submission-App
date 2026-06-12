function LogoLoader() {
  return (
    <svg
      width="80"
      height="48"
      viewBox="0 0 200 120"
      role="img"
      aria-label="Loading"
    >
      <style>{`
        .draw{stroke-dasharray:400;stroke-dashoffset:400;animation:drawloop 1.5s ease-in-out infinite;}
        @keyframes drawloop{
          0%{stroke-dashoffset:400;opacity:1;}
          55%{stroke-dashoffset:0;opacity:1;}
          80%{stroke-dashoffset:0;opacity:1;}
          100%{stroke-dashoffset:400;opacity:0;}
        }
      `}</style>
      <path
        d="M75 30 L35 60 L75 90"
        fill="none"
        stroke="#f3ead9"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="draw"
        style={{ animationDelay: "0s" }}
      />
      <path
        d="M115 20 L85 100"
        fill="none"
        stroke="#f3ead9"
        strokeWidth="10"
        strokeLinecap="round"
        className="draw"
        style={{ animationDelay: "0.15s" }}
      />
      <path
        d="M125 30 L165 60 L125 90"
        fill="none"
        stroke="#f3ead9"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="draw"
        style={{ animationDelay: "0.3s" }}
      />
    </svg>
  );
}

export default LogoLoader;
