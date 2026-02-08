import type React from "react";
import { getSystemOptions } from "../../utils/helpers";
import { SELECTION_COUNT } from "../../utils/constants";
import { useState } from "react";
import './SelectSystem.scss';

const SYSTEM_OPTIONS = getSystemOptions(SELECTION_COUNT);

const SelectSystem: React.FC = () => {
  const [value, setValue] = useState<string>("2_3");

  return (
    <div className="select-system">
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
  );
};

export default SelectSystem;
