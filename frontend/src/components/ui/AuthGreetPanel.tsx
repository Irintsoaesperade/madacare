import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandSparkles, faShieldHalved, faCheck } from "@fortawesome/free-solid-svg-icons";
import AuthBlobs from "./AuthBlobs";
import IllustrationDoctor from "./IllustrationDoctor";

interface Step {
  label: string;
  done?: boolean;
}

interface AuthGreetPanelProps {
  title: string;
  subtitle: string;
  steps?: Step[];
}

export default function AuthGreetPanel({ title, subtitle, steps }: AuthGreetPanelProps) {
  return (
    <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-mint-50 via-mint-100 to-[#DDF0E4] p-11 md:flex">
      <AuthBlobs />

      <div className="relative z-10 animate-fadeUp">
        <h1 className="flex items-center gap-2 font-display text-[32px] font-bold leading-tight tracking-tight text-forest-900">
          {title}
          <FontAwesomeIcon icon={faHandSparkles} className="h-6 w-6 text-emerald-500" />
        </h1>
        <p className="mt-2.5 max-w-[270px] text-[14.5px] leading-relaxed text-mist">
          {subtitle}
        </p>
      </div>

      <IllustrationDoctor className="animate-floatChar relative z-10 mx-auto h-[220px] w-[220px]" />

      {steps ? (
        <div className="relative z-10 flex flex-col gap-2.5">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2.5 text-[12.5px] text-mist">
              <span
                className={`flex h-[19px] w-[19px] flex-shrink-0 items-center justify-center rounded-full border-[1.5px] text-[10px]
                  ${step.done ? "border-emerald-500 bg-emerald-500 text-white" : "border-forest-600/30 text-forest-700"}`}
              >
                {step.done ? <FontAwesomeIcon icon={faCheck} className="h-2.5 w-2.5" /> : i + 1}
              </span>
              <span className={step.done ? "font-semibold text-forest-900" : ""}>{step.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative z-10 flex items-center gap-2 text-[12px] text-mist">
          <FontAwesomeIcon icon={faShieldHalved} className="h-[11px] w-[11px] text-emerald-500" />
          <span>Vos données médicales restent chiffrées et privées</span>
        </div>
      )}
    </aside>
  );
}