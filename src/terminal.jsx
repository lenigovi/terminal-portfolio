import React, { useState } from 'react';

const Terminal = () => {
  const [path, setPath] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [projectFilter, setProjectFilter] = useState("all");

  const availableCommands = ["hello", "about", "projects", "skills", "clear"];

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
        images: ["/me.jpeg"]
      };
      setPath(["about"]);
    } else if (command === "projects") {
      output = {
        filterable: true,
        text: "📌 Detection of Pose and Gripping Points at Bosch\nI currently work on training images of jenga blocks in different scenarios",
        images: ["/pose.png", "/model.png"],
        tag: ["bosch", "computer vision"],

        text2: "📌 Figure Estimation at RWTH Aachen",
        image2: "/posecarl.mp4",
        tag2: ["rwth", "computer vision"],

        text3: "📌 Robot Control at Bosch",
        image3: "/hmi.png",
        tag3: "bosch",

        text4: "📌 Multi 6-Axis Coordination with Moveit2 in ROS2",
        image4: ["/ros2_2.png", "sim.mp4"],
        tag4: ["rwth", "ros2"]
      };
      setPath(["projects"]);

      // ___________ old structure before filters _____________
      {/* 
        text: "📌 Detection of Pose and Gripping Points at Bosch\nI currently work on training images of jenga blocks in different scenarios",
        images: ["/pose.png", "/model.png"],
        text2: "📌 Figure Estimation at RWTH Aachen",
        image2: "/posecarl.mp4",
        text3: "📌 Robot Control at Bosch",
        image3: "/hmi.png",
        text4: "📌 ROS2 Kinematic Calibration of two 6-Axis Robots with Each Other Using Moveit2",
        image4: ["/ros2_2.png", "sim.mp4"],
      };
      setPath(["projects"]);
    */}
    } else if (command === "skills") {
      output = {
        text: "Robotics • Computer Vision • AI • Git • Python • C++ • JavaScript"
      };
      setPath(["skills"]);
    } else {
      output = `Command not found: ${command}`;
    }
    setHistory([...history, { cmd, output }]);
    setHistoryIndex(null);
    setSuggestions([]);
    setSuggestionIndex(0);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      if (input.trim() !== "") {
        handleCommand(input);
      }
      setInput("");
      setSuggestions([]);
      setSuggestionIndex(0);
    } else if (e.key === "ArrowUp") {
      if (history.length > 0) {
        const newIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
        setInput(history[newIndex].cmd);
        setHistoryIndex(newIndex);
      }
    } else if (e.key === "ArrowDown") {
      if (history.length > 0 && historyIndex !== null) {
        const newIndex = Math.min(history.length - 1, historyIndex + 1);
        setInput(history[newIndex].cmd);
        setHistoryIndex(newIndex);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const trimmedInput = input.trim();

      if (suggestions.length === 0) {
        const newSuggestions = availableCommands.filter(cmd =>
          cmd.startsWith(trimmedInput)
        );
        if (newSuggestions.length > 0) {
          setInput(newSuggestions[0]);
          setSuggestions(newSuggestions);
          setSuggestionIndex(1); // start from second match next time
        }
      } else {
        const current = suggestions[suggestionIndex];
        setInput(current);
        setSuggestionIndex((suggestionIndex + 1) % suggestions.length);
      }
    }
  };



 // Rendering of media and text
  return (
    <div className="p-4">
      <div className="mb-4 text-green-300">enter 'hello' to see commands</div>
      {history.map((item, i) => (                                  
        <div key={i}>
          <div>root@portfolio: $ {item.cmd}</div>
          {item.output && typeof item.output === "object" && item.output !== null ? (
            <div className="mb-10 flex flex-col gap-12">
            {/* Filters begin */}
              {item.output.filterable && (
                <div className="mb-0 flex gap-2">
                  {["all", "bosch", "rwth", "ros2", "computer vision"].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setProjectFilter(tag)}
                      className={`px-2 py-1 rounded border ${
                        projectFilter === tag
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-transparent border-green-500 text-green-300 hover:bg-green-500/20"
                      }`}
                    >
                      {tag.toString()}
                    </button>
                  ))}
                </div>
              )}
              {(projectFilter === "all" || item.output.tag?.includes(projectFilter)) && (    // Row 1
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
            {(projectFilter === "all" || item.output.tag2?.includes(projectFilter)) && (     // Row 2
              <div className="grid grid-cols-[17rem_1fr] gap-6 items-start">
                {item.output.image2?.endsWith(".mp4") ? (
                  <video controls className="w-96 border border-green-500 shadow rounded">
                    <source src={item.output.image2} type="video/mp4" />
                  </video>
                ) : (
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
            {(projectFilter === "all" || item.output.tag3?.includes(projectFilter)) && (     // Row 3
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
              {(projectFilter === "all" || item.output.tag4?.includes(projectFilter)) && (     // Row 4
                <div className="grid grid-cols-[17rem_1fr] gap-6 items-start">
                  {item.output.image4 && Array.isArray(item.output.image4) ? (
                    <div className="flex flex-col gap-2">
                      {item.output.image4.map((src, index) =>
                        src.endsWith(".mp4") ? (
                          <video key={index} controls className="w-96 border border-green-500 shadow rounded">
                            <source src={src} type="video/mp4" />
                          </video>
                        ) : (
                          <img
                            key={index}
                            src={src}
                            alt=""
                            className="w-96 h-auto rounded border border-green-500 shadow"
                          />
                        )
                      )}
                    </div>
                  ) : item.output.image4 && (
                    item.output.image4.endsWith(".mp4") ? (
                      <video controls className="w-96 border border-green-500 shadow rounded">
                        <source src={item.output.image4} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={item.output.image4}
                        alt=""
                        className="w-96 h-auto rounded border border-green-500 shadow"
                      />
                    )
                  )}
                  {item.output.text4 && (
                    <pre className="whitespace-pre-wrap leading-relaxed">{item.output.text4}</pre>
                  )}
                </div>
              )}

            {/* Old Structure before Filters
              {(item.output.text || item.output.images) && (        // Row 1
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
              {(item.output.text2 || item.output.image2) && (         // Row 2
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
              {(item.output.text3 || item.output.image3) && (       // Row 3
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
              {(item.output.text4 || item.output.image4) && (     // Row 4
                <div className="grid grid-cols-[17rem_1fr] gap-6 items-start">
                  {item.output.image4 && Array.isArray(item.output.image4) ? (
                    <div className="flex flex-col gap-2">
                      {item.output.image4.map((src, index) =>
                        src.endsWith(".mp4") ? (
                          <video key={index} controls className="w-96 border border-green-500 shadow rounded">
                            <source src={src} type="video/mp4" />
                          </video>
                        ) : (
                          <img
                            key={index}
                            src={src}
                            alt=""
                            className="w-96 h-auto rounded border border-green-500 shadow"
                          />
                        )
                      )}
                    </div>
                  ) : item.output.image4 && (
                    item.output.image4.endsWith(".mp4") ? (
                      <video controls className="w-96 border border-green-500 shadow rounded">
                        <source src={item.output.image4} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={item.output.image4}
                        alt=""
                        className="w-96 h-auto rounded border border-green-500 shadow"
                      />
                    )
                  )}
                  {item.output.text4 && (
                    <pre className="whitespace-pre-wrap leading-relaxed">{item.output.text4}</pre>
                  )}
                </div>
              )}
              */}
            </div>
          ) : (
            <pre className="whitespace-pre-wrap">{item.output}</pre>
          )}
        </div>
      ))}
      <div className="flex">
        <span>root@portfolio: $&nbsp;</span>
        <input
          autoFocus
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setSuggestions([]);
            setSuggestionIndex(0);
          }}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
};
export default Terminal;
