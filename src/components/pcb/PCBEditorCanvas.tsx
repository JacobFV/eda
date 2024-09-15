// src/components/pcb/PCBEditorCanvas.tsx

import React, { useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { usePCBEditorStore } from "../../context/PCBEditorContext";
import { ComponentType, TraceType } from "../../types/pcb";
import { v4 as uuidv4 } from "uuid";
import PCBDraggableComponent from "./PCBDraggableComponent";
import PCBTrace from "./PCBTrace";

const GRID_SIZE = 0.5; // mm

const PCBEditorCanvas: React.FC = () => {
  const addComponent = usePCBEditorStore((state) => state.addComponent);
  const components = usePCBEditorStore((state) => state.components);
  const traces = usePCBEditorStore((state) => state.traces);
  const layers = usePCBEditorStore((state) => state.layers);
  const addTrace = usePCBEditorStore((state) => state.addTrace);
  const canvasRef = useRef<HTMLDivElement>(null);

  const [routingMode, setRoutingMode] = useState<boolean>(false);
  const [traceStart, setTraceStart] = useState<{
    componentId: string;
    pinId: string;
  } | null>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "pcb-component",
    drop: (item: { type: string }, monitor) => {
      const offset = monitor.getClientOffset();
      const canvas = canvasRef.current;
      if (canvas && offset) {
        const rect = canvas.getBoundingClientRect();
        const x = Math.round((offset.x - rect.left) / 10) * GRID_SIZE; // Adjust scaling as needed
        const y = Math.round((offset.y - rect.top) / 10) * GRID_SIZE;
        const newComponent: ComponentType = {
          id: uuidv4(),
          type: item.type,
          x: x,
          y: y,
          rotation: 0,
          layer: "top",
          pins: [
            { id: uuidv4(), name: "A", xOffset: 0, yOffset: 0 },
            { id: uuidv4(), name: "B", xOffset: 5, yOffset: 0 },
          ],
        };
        console.log("Adding PCB component:", newComponent); // Debugging
        addComponent(newComponent);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleStartRouting = () => {
    setRoutingMode(true);
    setTraceStart(null);
    alert(
      "Routing Mode: Click on a source pin, then a target pin to create a trace.",
    );
  };

  const handleCancelRouting = () => {
    setRoutingMode(false);
    setTraceStart(null);
  };

  const handlePinClick = (componentId: string, pinId: string) => {
    if (!routingMode) return;

    if (!traceStart) {
      setTraceStart({ componentId, pinId });
    } else if (
      traceStart.componentId === componentId &&
      traceStart.pinId === pinId
    ) {
      // Same pin clicked again, do nothing or show a message
      alert("Cannot connect a pin to itself.");
    } else {
      // Create a new trace
      const newTrace: TraceType = {
        id: uuidv4(),
        fromComponentId: traceStart.componentId,
        fromPinId: traceStart.pinId,
        toComponentId: componentId,
        toPinId: pinId,
        layer: "top",
        path: [
          // Define a simple straight path for demonstration
          { x: traceStart.componentId, y: traceStart.pinId }, // Replace with actual positions
          { x: componentId, y: pinId },
        ],
      };
      console.log("Adding trace:", newTrace); // Debugging
      addTrace(newTrace);
      setRoutingMode(false);
      setTraceStart(null);
    }
  };

  return (
    <div
      className="relative ml-64 mr-64 flex-grow overflow-auto bg-white p-4"
      ref={canvasRef}
      style={{
        minWidth: "2000px", // Ensures the grid is large enough
        minHeight: "2000px",
      }}
    >
      <div
        ref={drop}
        className="relative h-full w-full"
        style={{
          backgroundSize: `${GRID_SIZE}mm ${GRID_SIZE}mm`,
          backgroundImage:
            "linear-gradient(to right, #e0e0e0 1px, transparent 1px), linear-gradient(to bottom, #e0e0e0 1px, transparent 1px)",
        }}
      >
        {/* Render Traces */}
        <svg className="pointer-events-none absolute left-0 top-0 h-full w-full">
          {traces.map((trace) => (
            <PCBTrace key={trace.id} trace={trace} />
          ))}
        </svg>

        {/* Render Components */}
        {components.map((comp) => (
          <PCBDraggableComponent
            key={comp.id}
            component={comp}
            onPinClick={handlePinClick}
          />
        ))}

        {/* Routing Controls */}
        <div className="absolute left-1/2 top-4 -translate-x-1/2 transform space-x-2">
          {!routingMode ? (
            <button
              onClick={handleStartRouting}
              className="rounded bg-purple-500 px-4 py-2 text-white"
            >
              Start Routing
            </button>
          ) : (
            <button
              onClick={handleCancelRouting}
              className="rounded bg-red-500 px-4 py-2 text-white"
            >
              Cancel Routing
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PCBEditorCanvas;
