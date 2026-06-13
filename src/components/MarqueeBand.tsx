const ITEMS = [
  "Brand Identity",
  "Web Development",
  "UI/UX Design",
  "Motion Graphics",
  "Digital Marketing",
  "Product Strategy",
  "Creative Direction",
  "AI Automation",
  "Software Architecture",
  "Innovation Lab",
];

const Dot = () => (
  <span
    className="mx-4 inline-block w-[3px] h-[3px] rounded-full bg-primary/40 align-middle flex-none"
    aria-hidden="true"
  />
);

const MarqueeBand = () => {
  const all = [...ITEMS, ...ITEMS];

  return (
    <div className="relative py-3 border-y border-border/20 overflow-hidden bg-background/50 backdrop-blur-sm" aria-hidden="true">
      <div className="flex whitespace-nowrap animate-marquee">
        {all.map((item, i) => (
          <span key={i} className="inline-flex items-center flex-none">
            <span
              className="text-[0.62rem] font-medium tracking-[0.24em] uppercase text-muted-foreground/45 transition-colors duration-300 hover:text-muted-foreground/70"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {item}
            </span>
            <Dot />
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBand;
