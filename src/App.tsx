import { useState } from "react";
import "./App.css";
import SelectSystem from "./components/SelectSystem/SelectSystem";

function App() {
  const [selectValue, setSelectValue] = useState<string>("2_3");

  return (
    <main>
      <h1 className="header">System Bets Calculator</h1>
      <div>
        <SelectSystem value={selectValue} setValue={setSelectValue} />
      </div>
    </main>
  );
}

export default App;
