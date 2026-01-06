import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const logoDark =
  "https://res.cloudinary.com/dspbp48zi/image/upload/v1767714748/Frame_1597882131_pumn6s.png";

const logoLight =
  "https://res.cloudinary.com/dspbp48zi/image/upload/v1767714748/Frame_1597882146_eumzjs.png";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo = ({ className = "h-10", showText = false }: LogoProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className={className} />;
  }

  const logoSrc = resolvedTheme === "dark" ? logoDark : logoLight;

  return (
    <div className="flex items-center gap-3">
      <img
        src={logoSrc}
        alt="Ineffable Design Solutions"
        className={`${className} object-contain transition-opacity duration-300`}
        draggable={false}
      />

      {showText && (
        <span className="font-display font-bold text-lg tracking-tight hidden sm:block">
          Ineffable
        </span>
      )}
    </div>
  );
};

export default Logo;
