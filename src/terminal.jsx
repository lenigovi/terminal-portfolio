import React, { useState } from 'react';

const Terminal = () => {
  const [path, setPath] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const handleCommand = (cmd) => {
    let output = "";
    const command = cmd.trim().toLowerCase();

    if (command === "..") {
        if (path.length > 0) {
            setPath(path.slice(0, -1));
        } else {
            output = "Already at root.";
        }
        } else if (command === "clear") {
        setHistory([]);
        return;
        } else if (command === "hello") {
        output = "Available commands: about, projects, skills, clear, hello";
        } else if (command === "about") {
        output = {
            text: "I'm a student at RWTH Aachen working at Bosch Connected Industry. I like robots, automation and bicycles.",
            image: "/me.jpeg"
        };
        setPath(["about"]);
        } else if (command === "projects") {
        output = {
            text: "📌 Pose Detection\nI currently work on training images of jenga blocks for pose detection",
            images: ["/pose.png", "/model.png"],
            text2: "📌 Figure Estimation",
            image2: "/posecarl.mp4",
            text3: "📌 Robot Control",
            image3: "/hmi.png"
        };
        setPath(["projects"]);
        } else if (command === "skills") {
        output = {
            text: "Robotics • Computer Vision • AI • Git • Python • C++ • JavaScript"
        };
        setPath(["skills"]);
        } else {
        output = `Command not found: ${command}`;
        }


    setHistory([...history, { cmd, output }]);
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 text-green-300">enter 'hello' to see commands</div>
      {history.map((item, i) => (
        <div key={i}>
          {/* <div>root@portfolio:{path.length > 0 ? '/' + path.join('/') : '~'} $ </div> */}
          {/* <div>root@portfolio:{path.length > 0 ? '/' + path.join('/') : '~'} $ {item.cmd} </div> */}
          <div>root@portfolio: $ {item.cmd}</div>
          {item.output && typeof item.output === "object" && item.output !== null ? (
          <div className="mb-10 flex flex-col gap-12">

            {/* First text + multiple images (side by side) */}
            {(item.output.text || item.output.images) && (
              <div className="grid grid-cols-[17rem_1fr] gap-6 items-start">
                {item.output.images && (
                  <div className="flex flex-wrap gap-2">
                    {item.output.images.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt=""
                        className="w-96 h-auto rounded border border-green-500 shadow"
                      />
                    ))}
                  </div>
                )}
                {item.output.text && (
                  <pre className="whitespace-pre-wrap leading-relaxed">{item.output.text}</pre>
                )}
              </div>
            )}

            {/* Second text + video side by side */}
            {(item.output.text2 || item.output.image2) && (
              <div className="grid grid-cols-[17rem_1fr] gap-6 items-start">
                {item.output.image2 && item.output.image2.endsWith(".mp4") ? (
                  <video controls className="w-96 border border-green-500 shadow rounded">
                    <source src={item.output.image2} type="video/mp4" />
                  </video>
                ) : item.output.image2 && (
                  <img
                    src={item.output.image2}
                    alt=""
                    className="w-48 h-auto rounded border border-green-500 shadow"
                  />
                )}
                {item.output.text2 && (
                  <pre className="whitespace-pre-wrap leading-relaxed">{item.output.text2}</pre>
                )}
              </div>
            )}

            {/* Third text + image side by side */}
            {(item.output.text3 || item.output.image3) && (
              <div className="grid grid-cols-[17rem_1fr] gap-6 items-start">
                {item.output.image3 && (
                  <img
                    src={item.output.image3}
                    alt=""
                    className="w-96 h-auto rounded border border-green-500 shadow"
                  />
                )}
                {item.output.text3 && (
                  <pre className="whitespace-pre-wrap leading-relaxed">{item.output.text3}</pre>
                )}
              </div>
            )}

          </div>
        ) : (
          <pre className="whitespace-pre-wrap">{item.output}</pre>
        )}
        </div>
      ))}
      <div className="flex">
        {/* <span>root@portfolio:{path.length > 0 ? '/' + path.join('/') : '~'} $&nbsp;</span> */}
        <span>root@portfolio: $&nbsp;</span>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onEnter}
        />
      </div>
    </div>
  );
};

export default Terminal;
