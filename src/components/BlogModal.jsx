import React from "react";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";


export default function BlogModal({ blog, onClose }) {
  if (!blog) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 text-gray-100 rounded-2xl p-6 w-[90%] max-w-2xl shadow-xl relative border border-green-700">
        <h2 className="text-2xl font-semibold mb-4 text-green-400">{blog.title}</h2>
        <div className="max-h-[60vh] overflow-y-auto text-sm leading-relaxed whitespace-pre-line">
          {blog.content}
          {/* PoE formula */}
          {blog.id === 1 && (
          <div className="mt-3">
            <BlockMath math={"T(\\theta) = e^{\\hat{\\xi}_1\\theta_1} e^{\\hat{\\xi}_2\\theta_2} \\cdots e^{\\hat{\\xi}_n\\theta_n} M"} />
          </div>
        )}
        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-green-300 text-xl"
        >
          ✕
        </button>
      </div>
      
    </div>
  );
}
