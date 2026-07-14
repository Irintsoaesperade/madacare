export default function IllustrationDoctor({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <ellipse cx="120" cy="216" rx="72" ry="12" fill="#1B4332" opacity="0.08" />
      <path d="M78 232V150C78 122 96 102 122 102C148 102 166 122 166 150V232H78Z" fill="#FFFFFF" stroke="#1B4332" strokeOpacity="0.12" strokeWidth="2" />
      <path d="M110 108L122 128L134 108" stroke="#2D6A4F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M104 104C104 118 112 128 122 128C132 128 140 118 140 104" stroke="#1B4332" strokeOpacity="0.15" strokeWidth="2" />
      <path d="M96 150C96 168 108 178 122 178C136 178 148 168 148 150" stroke="#2D6A4F" strokeWidth="4" strokeLinecap="round" />
      <circle cx="122" cy="182" r="7" fill="#40916C" />
      <circle cx="122" cy="66" r="38" fill="#F4C7A1" />
      <path d="M84 60C84 36 100 20 122 20C144 20 160 36 160 58C160 46 150 46 144 44C136 42 130 34 122 34C112 34 106 44 96 46C90 47 84 50 84 60Z" fill="#2B1B12" />
      <circle cx="108" cy="70" r="3.6" fill="#1B4332" />
      <circle cx="136" cy="70" r="3.6" fill="#1B4332" />
      <path d="M112 84C116 89 128 89 132 84" stroke="#1B4332" strokeWidth="3" strokeLinecap="round" />
      <path d="M168 140C182 132 196 134 200 148C203 158 196 166 186 166" stroke="#F4C7A1" strokeWidth="14" strokeLinecap="round" />
      <circle cx="200" cy="140" r="11" fill="#F4C7A1" />
    </svg>
  );
}