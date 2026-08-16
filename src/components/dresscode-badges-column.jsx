import { ColorBadge } from "./color-badge";

export const DresscodeBadgesColumn = ({ title, subtitle="", colors=[] }) => {
  return (
    <div className="text-center space-y-6 z-2 row-2 md:row-1">
      <p className="text-xs uppercase tracking-[0.2em] text-black font-bold font-sans hidden md:block">{title}</p>
      <p className="text-xs uppercase tracking-[0.2em] text-black font-sans hidden md:block">{subtitle}</p>
      <div className="grid grid-cols-2 gap-y-8 justify-items-center">
        {colors.map((element, index) => (
          <ColorBadge key={index} colorText={element.text} color={element.color} />
        ))}
      </div>
    </div>
  );
}
