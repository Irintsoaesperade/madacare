"use client";

import { forwardRef, useState, InputHTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isPassword?: boolean;
}

const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, error, isPassword, id, type, ...rest }, ref) => {
    const [visible, setVisible] = useState(false);
    const inputType = isPassword ? (visible ? "text" : "password") : type;

    return (
      <div className="relative">
        <input
          ref={ref}
          id={id}
          type={inputType}
          placeholder=" "
          className={`peer w-full rounded-xl border-[1.5px] px-4 py-[15px] text-[14.5px] text-ink outline-none transition-colors
            ${error ? "border-danger bg-red-50" : "border-line bg-white focus:border-emerald-500"}
            ${isPassword ? "pr-11" : "pr-4"}
            focus:shadow-[0_0_0_4px_rgba(64,145,108,0.12)]`}
          {...rest}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-[14px] bg-white px-1 text-[14px] text-mist transition-all
            peer-focus:-top-[9px] peer-focus:left-3 peer-focus:text-[11.5px] peer-focus:font-semibold peer-focus:text-emerald-500
            peer-[:not(:placeholder-shown)]:-top-[9px] peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-[11.5px] peer-[:not(:placeholder-shown)]:font-semibold"
        >
          {label}
        </label>

        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            tabIndex={-1}
            className="absolute right-3.5 top-[14px] text-mist hover:text-ink"
          >
            <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} className="h-[14.5px] w-[14.5px]" />
          </button>
        )}

        {error && (
          <div className="mt-[7px] flex items-center gap-1.5 text-[12px] font-medium text-danger">
            <FontAwesomeIcon icon={faCircleExclamation} className="h-3 w-3" />
            {error}
          </div>
        )}
      </div>
    );
  }
);
FloatingInput.displayName = "FloatingInput";
export default FloatingInput;