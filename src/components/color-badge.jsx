
export const ColorBadge = (colorText, color) => {
    return (
        <div key={colorText} className="flex flex-col items-center gap-3">
          <div className={`w-10 h-10 rounded-full bg-[${color}] border border-[#d1cfc7] shadow-sm`}></div>
          <span className="text-[10px] font-sans text-[#7a7a7a] uppercase tracking-widest">{colorText}</span>
        </div>
    );
}
