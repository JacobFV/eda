import React from "react";
import { useDrag } from "react-dnd";

const PCB_COMPONENTS = [
  { type: "Resistor" },
  { type: "Capacitor" },
  { type: "IC" },
  { type: "Connector" },
  // Add more PCB-specific components as needed
];

interface PCBComponentItemProps {
  type: string;
}

const PCBComponentItem: React.FC<PCBComponentItemProps> = ({ type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "pcb-component",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`m-2 cursor-grab rounded border bg-white p-2 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {type}
    </div>
  );
};

const PCBComponentsPanel: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 overflow-y-auto bg-gray-100 p-4">
      <h2 className="mb-4 text-xl font-bold">PCB Components</h2>
      {PCB_COMPONENTS.map((comp) => (
        <PCBComponentItem key={comp.type} type={comp.type} />
      ))}
    </div>
  );
};

export default PCBComponentsPanel;
