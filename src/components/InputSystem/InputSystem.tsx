import type React from "react";
import "./InputSystem.scss";
import { useCallback, useState } from "react";
import OddsRow from "../OddsRow/OddsRow";

export interface IOdds {
  value: string;
  status: string;
}

interface IInputSystemProps {
  combinations: number;
  handleCompute: (odds: IOdds[], totalStake: string) => void;
}

const InputSystem: React.FC<IInputSystemProps> = ({
  combinations,
  handleCompute,
}) => {
  const [totalStake, setTotalStake] = useState("100.00");
  const [odds, setOdds] = useState<IOdds[]>(() =>
    Array.from({ length: combinations }, () => ({
      value: "2.00",
      status: "correct",
    })),
  );

  const updateOddValue = useCallback((index: number, newValue: string) => {
    setOdds((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, value: newValue } : item,
      ),
    );
  }, []);

  const updateStatus = useCallback((index: number, newStatus: string) => {
    setOdds((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, status: newStatus } : item,
      ),
    );
  }, []);
  const handleStakeChange = (e: { target: { value: string } }) => {
    const val = e.target.value.replace(",", ".");
    const regex = /^\d*(\.?\d{0,2})$/;

    if (val === "" || regex.test(val)) {
      setTotalStake(val);
    }
  };

  const handleStakeBlur = () => {
    const numericValue = parseFloat(totalStake);

    if (!isNaN(numericValue)) {
      setTotalStake(numericValue.toFixed(2));
    } else {
      setTotalStake("100.00");
    }
  };
  return (
    <div className="input-system-wrapper">
      <div className="header-row">
        <label className="w-50">Total Stake</label>
        <input
          type="text"
          inputMode="decimal"
          value={totalStake}
          onChange={handleStakeChange}
          onBlur={handleStakeBlur}
          className="w-20 input"
        />
        <span className="w-30 currency">EUR</span>
      </div>
      <div className="status-labels-container">
        <div className="status-labels w-30">
          <span className="text-green">WIN</span>
          <span className="text-red">LOST</span>
          <span className="text-yellow">RETURN</span>
        </div>
      </div>
      {odds.map((odd, idx) => (
        <OddsRow
          key={idx}
          index={idx}
          oddValue={odd.value}
          status={odd.status}
          onOddChange={updateOddValue}
          onStatusChange={updateStatus}
        />
      ))}
      <button
        className="compute-btn"
        onClick={() => handleCompute(odds, totalStake)}
      >
        Compute
      </button>
    </div>
  );
};

export default InputSystem;
