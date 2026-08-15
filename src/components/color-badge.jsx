
export const ColorBadge = ({ colorText, color }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div 
        className={`w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#d1cfc7] outline`}
        style={{ backgroundColor: color }}
      ></div>
      <span className="text-[10px] font-sans text-[#7a7a7a] uppercase tracking-widest">{colorText}</span>
    </div>
  );
}
