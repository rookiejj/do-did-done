import { useState } from "react";
import "./App.css";

import DailyActivityTracker from "./components/DailyActivityTracker";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <DailyActivityTracker />
      </div>
    </>
  );
}

export default App;
