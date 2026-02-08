import { useMemo, useState } from "react";
import "./App.css";
import SelectSystem from "./components/SelectSystem/SelectSystem";
import InputSystem, { type IOdds } from "./components/InputSystem/InputSystem";
import { combinationsCount } from "./utils/helpers";

function App() {
  const [selectValue, setSelectValue] = useState<string>("2_3");

  const { picks, total, combinations } = useMemo(() => {
    const [p, t] = selectValue.split("_").map(Number);
    return {
      picks: p,
      total: t,
      combinations: combinationsCount(t, p),
    };
  }, [selectValue]);

  const handleCompute = (odds: IOdds[], totalStake: string) => {
    console.log(odds, "ODSSS");
    console.log(totalStake, "totalStakeasd");
  };

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
        <InputSystem
          key={combinations}
          combinations={combinations}
          handleCompute={handleCompute}
        />
      </div>
    </main>
  );
}

export default App;
