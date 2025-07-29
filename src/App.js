import React from "react";
import Terminal from "./terminal";

function App() {
  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
      <div className="w-full max-w-3xl p-6 bg-[#1b212c] rounded-lg shadow-lg">
        <Terminal />
      </div>
    </div>
  );
}

export default App;
