import React from "react";
import "./OddsRow.scss";

interface OddsRowProps {
  index: number;
  oddValue: string;
  status: string;
  onOddChange: (index: number, newValue: string) => void;
  onStatusChange: (index: number, newStatus: string) => void;
  isInvalid?: boolean;
}

const OddsRow: React.FC<OddsRowProps> = ({
  index,
  oddValue,
  status,
  onOddChange,
  onStatusChange,
  isInvalid,
}) => {
  const handleInputChange = (e: { target: { value: string } }) => {
    const val = e.target.value.replace(",", ".");
    const regex = /^\d*(\.?\d{0,2})$/;

    if (val === "" || regex.test(val)) {
      onOddChange(index, val);
    }
  };

  const handleBlur = () => {
    const numeric = parseFloat(oddValue);
    if (!isNaN(numeric)) {
      onOddChange(index, numeric.toFixed(2));
    } else {
      onOddChange(index, "2.00");
    }
  };

  return (
    <div className={`odds-row ${isInvalid ? "invalid-input" : ""}`}>
      <label className="w-50">Odds {index + 1}</label>

      <input
        type="text"
        inputMode="decimal"
        className="input w-20"
        value={oddValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />

      <div className="radio-group w-30">
        <input
          type="radio"
          name={`status-${index}`}
          checked={status === "win"}
          onChange={() => onStatusChange(index, "win")}
          className="radio radio-win"
        />
        <input
          type="radio"
          name={`status-${index}`}
          checked={status === "lost"}
          onChange={() => onStatusChange(index, "lost")}
          className="radio radio-lost"
        />
        <input
          type="radio"
          name={`status-${index}`}
          checked={status === "return"}
          onChange={() => onStatusChange(index, "return")}
          className="radio radio-return"
        />
      </div>
    </div>
  );
};

export default OddsRow;
