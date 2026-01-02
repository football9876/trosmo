interface TILLogoProps {
  className?: string;
}

const TILLogo = ({ className = "h-8" }: TILLogoProps) => {
  return (
    <svg
      viewBox="0 0 120 40"
      className={className}
      fill="currentColor"
    >
      {/* TIL text logo */}
      <text
        x="0"
        y="32"
        className="font-heading font-bold"
        style={{ 
          fontSize: "36px", 
          fill: "white",
          fontFamily: "Oswald, sans-serif",
          fontWeight: 700,
          letterSpacing: "2px"
        }}
      >
        TIL
      </text>
    </svg>
  );
};

export default TILLogo;
