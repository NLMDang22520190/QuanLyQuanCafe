import { useState } from "react"

export const CheckBox = () => {
  const [checked, setChecked] = useState(false);
  return (<span
  onClick={() => setChecked(!checked)}
    className={`w-5 h-5 border-2  rounded-sm flex items-center justify-center transition-all duration-300 
      ${checked ? 'bg-amber-500 border-amber-700' : 'bg-transparent border-amber-500'}`}
  >
    {checked && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    )}
  </span>)

    
}