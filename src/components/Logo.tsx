import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import logoLight from "@/assets/logo.svg";

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

  if (!mounted) {
    return <div className={`${className} bg-transparent`} />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex items-center gap-3">
      <img
        src={logoLight}
        alt="Ineffable Design Solutions"
        className={`${className} object-contain transition-all duration-300 ${
          isDark ? "" : "invert brightness-0"
        }`}
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
