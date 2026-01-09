import "./App.css";
import { CodeEditor } from "../pages/Editor";
import { useRef, useState } from "react";

function App() {
  const lanRef = useRef<HTMLSelectElement>(null);
  const [value, setValue] = useState("cpp");

  function select() {
    if (!lanRef.current) return;
    setValue(lanRef.current.value);
  }

  return (
    <div className="h-screen bg-black/50 flex justify-center items-center">
      <div className="grid justify-center">
        <div className="h-10 w-150 bg-amber-300">
          <select
            ref={lanRef}
            onChange={select}
            defaultValue="cpp"
          >
            <option value="javascript">Javascript</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>

        <CodeEditor language={value} />
      </div>
    </div>
  );
}

export default App;