import { useState } from "react";

export const RoundedDatePicker = ({
  initialValue = "",
  label,
  style = "border-amber-500 rounded-sm border-amber-500 rounded-sm",
  prefixIcon = null,
  placeholder = "Select a date",
  width = "300px",
  height = "30px",
  textColor = "white",
  onDateChange,
}) => {
  const [date, setDate] = useState(initialValue);

  const handleChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    if (onDateChange) {
      onDateChange(newDate); // Notify the parent of the new date value
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      {label && <p className={`text-${textColor}`}>{label}</p>}
      <div
        className={`flex items-center border overflow-hidden text-${textColor} ${style}`}
        style={{ width, height }}
      >
        {prefixIcon && <span className="pl-2">{prefixIcon}</span>}

        <input
          type="date" 
          value={date}
          onChange={handleChange}
          placeholder={placeholder}
          className={`flex-1 px-4 py-2 bg-transparent border-0 border-transparent text-${textColor} focus:outline-none ${
            prefixIcon ? "" : "pl-4"
          }`}
        />
      </div>
    </div>
  );
};
