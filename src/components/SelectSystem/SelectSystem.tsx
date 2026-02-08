import type React from "react";
import { combinationsCount, getSystemOptions } from "../../utils/helpers";
import { SELECTION_COUNT } from "../../utils/constants";

import "./SelectSystem.scss";
import { useMemo } from "react";

const SYSTEM_OPTIONS = getSystemOptions(SELECTION_COUNT);

interface ISelectSystemProps {
  value: string;
  setValue: (value: string) => void;
}

const SelectSystem: React.FC<ISelectSystemProps> = ({ value, setValue }) => {
  const { picks, total, combinations } = useMemo(() => {
    const [p, t] = value.split("_").map(Number);
    return {
      picks: p,
      total: t,
      combinations: combinationsCount(t, p),
    };
  }, [value]);

  return (
    <>
      <div className="system-box select-system">
        <label className="select-system__label">System</label>
        <select
          className="select-system__select"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          {SYSTEM_OPTIONS.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="system-box select-system__description">
        A system {picks} from {total} contains {combinations} combinations.
      </div>
    </>
  );
};

export default SelectSystem;
