import React from "react";
import Terminal from "./terminal";
import BlogCarousel from "./components/BlogCarousel";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";


function App() {
  return (
    <div className="min-h-screen bg-[#0f1117] flex flex-col items-center justify-start pt-80 pb-20">
      <div className="w-full max-w-3xl p-6 bg-[#1b212c] rounded-lg shadow-lg">
        <Terminal />
      </div>
      <div className="mt-6 w-full max-w-4xl px-6" id="blog-section">
        <BlogCarousel />
      </div>
    </div>
  );
}

export default App;

