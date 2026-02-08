import React from "react";
import { calculateSystemResults } from "../../utils/helpers";
import "./SystemTable.scss";
import type { IOdds } from "../InputSystem/InputSystem";

interface ISystemTableProps {
  odds: IOdds[];
  picks: number;
  totalStake: string;
  combinationsCount: number;
}

const SystemTable: React.FC<ISystemTableProps> = ({
  odds,
  picks,
  totalStake,
  combinationsCount,
}) => {
  const { tableRows, totalWinnings, stakePerCombo } = calculateSystemResults(
    odds,
    picks,
    parseFloat(totalStake),
    combinationsCount,
  );

  return (
    <div className="system-table-container">
      <div className="table-scroll">
        <table className="system-table">
          <thead>
            <tr>
              <th>#</th>
              <th colSpan={picks}>Combinations</th>
              <th>Odds</th>
              <th>Winnings</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, idx) => (
              <tr key={idx} className={row.isLost ? "is-lost" : ""}>
                <td>{idx + 1}</td>
                {row.items.map((item, i) => (
                  <td key={i} className={item.colorClass}>
                    {item.val}
                  </td>
                ))}
                <td>{row.comboMultiplier.toFixed(2)}</td>
                <td>{row.winnings.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="summary-section">
        <div className="summary-item">
          Winnings: <strong>{totalWinnings.toFixed(2)}</strong>
        </div>
        <div className="summary-item">
          Stake: <strong>{totalStake}</strong>
        </div>
        <div className="summary-item">
          Stake per combination: <strong>{stakePerCombo.toFixed(3)}</strong>
        </div>
      </div>
    </div>
  );
};

export default SystemTable;
