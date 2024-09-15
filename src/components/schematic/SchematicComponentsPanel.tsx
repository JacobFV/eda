
import React from "react";
import { useDrag } from "react-dnd";

const COMPONENT_TYPES = ["Resistor", "Capacitor", "IC"]; // Add more as needed

interface ComponentItemProps {
  type: string;
}

const ComponentItem: React.FC<ComponentItemProps> = ({ type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "component",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 m-2 border rounded bg-white cursor-grab ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {type}
    </div>
  );
};

const ComponentsPanel: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 w-60 h-full bg-gray-100 overflow-y-auto p-2">
      <h2 className="text-xl font-bold mb-4">Components</h2>
      {COMPONENT_TYPES.map((type) => (
        <ComponentItem key={type} type={type} />
      ))}
    </div>
  );
};

export default ComponentsPanel;

