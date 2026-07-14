export default function AuthBlobs() {
  return (
    <>
      <div className="animate-float absolute -left-[50px] -top-10 h-[150px] w-[150px] rounded-full bg-emerald-500/10" />
      <div
        className="animate-float absolute bottom-[60px] -left-5 h-[90px] w-[90px] rounded-full bg-forest-600/[0.08]"
        style={{ animationDelay: "1.2s" }}
      />
      <div
        className="animate-float absolute right-[-10px] top-[38%] h-[60px] w-[60px] rounded-full bg-emerald-400/[0.14]"
        style={{ animationDelay: "2.4s" }}
      />
      <div className="absolute right-[34px] top-[26px] h-16 w-16 rounded-full border-2 border-emerald-500/[0.18]" />
      <div className="absolute right-[70px] top-20 h-[26px] w-[26px] rounded-full border-2 border-[#D88C5A]/35" />
    </>
  );
}