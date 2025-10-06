// blog contents, except for formulas. those are in blogmodal.jsx (todo: add classes to formulas to call from and insert wherever)
import React, { useState } from "react";
import BlogModal from "./BlogModal.jsx";
import { BlockMath } from "react-katex";

const blogs = [
  {
    id: 1,
    title: "Product of Exponentials",
    excerpt: "Mathematical mapping of a kinematic chain",
    content: `
Product of Exponentials represents the kinematics of a serial manipulator as a series of exponentials of twists.

Exponentials represent motions in joint space or {b}-space, therefore multiplication of them configurations gives the transformation from base to end-effector. The mapping from joint space to Cartesian space is known as forward kinematics.

Forward kinematics of an n-joint serial manipulator is given as:
`
// formula in blogmodal.jsx
  },
  {
    id: 2,
    title: "Jacobian",
    excerpt: "Mapping ",
    content: `
Jacobian relates joint rates to the linear and angular velocities of the end-effector.
Furthermore, provides a relationship between joint torques and resultant force and torque applied by the end effector. 
It also reveals singularities, configurations where the
robot loses degrees of freedom or amplifies certain motions.
`
  },
  {
    id: 3,
    title: "Diffusion Policy",
    excerpt: "Generative models in robotics",
    content: `
Diffusion model methods in robotics iteratively denoise to generate robot actions.
Instead of planning trajectories directly, they learn to refine noise into actions.
`
  }
];

export default function BlogCarousel() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <div className="mt-5 flex justify-center gap-4 flex-wrap">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          onClick={() => setSelectedBlog(blog)}
          className="bg-zinc-00 hover:bg-[#1b212c] border border-gray-800 cursor-pointer 
                     w-48 h-36 rounded-xl p-3 flex flex-col justify-between transition-all 
                     shadow-lg hover:shadow-green-400/20"
        >
          <h3 className="text-lg font-semibold text-gray-500">{blog.title}</h3>
          <p className="text-xs text-gray-600 line-clamp-3">{blog.excerpt}</p>
        </div>
      ))}

      <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
    </div>
  );
}
