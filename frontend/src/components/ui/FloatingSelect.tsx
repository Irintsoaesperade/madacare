"use client";

import { forwardRef, SelectHTMLAttributes } from "react";

interface FloatingSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: readonly string[];
}

const FloatingSelect = forwardRef<HTMLSelectElement, FloatingSelectProps>(
  ({ label, error, options, id, ...rest }, ref) => {
    return (
      <div>
        <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-ink">
          {label}
        </label>
        <select
          ref={ref}
          id={id}
          defaultValue=""
          className={`w-full rounded-xl border-[1.5px] bg-white px-4 py-[13px] text-[14.5px] text-ink outline-none transition-colors
            ${error ? "border-danger bg-red-50" : "border-line focus:border-emerald-500"}
            focus:shadow-[0_0_0_4px_rgba(64,145,108,0.12)]`}
          {...rest}
        >
          <option value="" disabled>
            Sélectionnez...
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {error && <p className="mt-1.5 text-[12px] font-medium text-danger">{error}</p>}
      </div>
    );
  }
);
FloatingSelect.displayName = "FloatingSelect";
export default FloatingSelect; 
