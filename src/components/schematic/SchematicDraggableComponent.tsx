// src/components/DraggableComponent.tsx

import React from "react";
import { useDrag } from "react-dnd";
import { useEditorStore } from "../../context/editorStore";
import { ComponentType } from "../../types";
import { v4 as uuidv4 } from "uuid";

interface DraggableComponentProps {
  component: ComponentType;
}

const GRID_SIZE = 20;

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  component,
}) => {
  const updateComponent = useEditorStore((state) => state.updateComponent);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "existingComponent",
      item: { id: component.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [component.id],
  );

  const handleDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const editor = document.getElementById("editor-canvas");
    if (!editor) return;

    const startX = e.clientX;
    const startY = e.clientY;

    const origX = component.x;
    const origY = component.y;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      const newX = Math.round((origX + deltaX) / GRID_SIZE) * GRID_SIZE;
      const newY = Math.round((origY + deltaY) / GRID_SIZE) * GRID_SIZE;

      updateComponent(component.id, { x: newX, y: newY });
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={drag}
      onMouseDown={handleDrag}
      className={`absolute cursor-move rounded border bg-blue-200 p-2 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      style={{ top: component.y, left: component.x }}
    >
      {component.type}
    </div>
  );
};

export default DraggableComponent;
