import { useEffect, useMemo, useState } from "react";
import "./App.css";
import SelectSystem from "./components/SelectSystem/SelectSystem";
import InputSystem, { type IOdds } from "./components/InputSystem/InputSystem";
import { combinationsCount } from "./utils/helpers";
import SystemTable from "./components/SystemTable/SystemTable";

function App() {
  const [selectValue, setSelectValue] = useState<string>("2_3");
  const [dataToCompute, setDataToCompute] = useState<{
    odds: IOdds[];
    stake: string;
  } | null>(null);

  const { picks, total, combinations } = useMemo(() => {
    const [p, t] = selectValue.split("_").map(Number);

    return {
      picks: p,
      total: t,
      combinations: combinationsCount(t, p),
    };
  }, [selectValue]);

  const handleCompute = (odds: IOdds[], totalStake: string) => {
    setDataToCompute({ odds, stake: totalStake });
  };

  useEffect(() => {
    const resetDataToCompute = () => {
      setDataToCompute(null);
    };
    resetDataToCompute();
  }, [selectValue]);

  return (
    <main>
      <h1 className="header">System Bets Calculator</h1>
      <div className="main-section">
        <SelectSystem
          value={selectValue}
          setValue={setSelectValue}
          picks={picks}
          total={total}
          combinations={combinations}
        />
        <InputSystem key={total} total={total} handleCompute={handleCompute} />
      </div>
      {dataToCompute && (
        <SystemTable
          odds={dataToCompute.odds}
          picks={picks}
          totalStake={dataToCompute.stake}
          combinationsCount={combinations}
        />
      )}
    </main>
  );
}

export default App;
