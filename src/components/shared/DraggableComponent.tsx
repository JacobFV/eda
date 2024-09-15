// src/components/shared/DraggableComponent.tsx

import { usePCBEditorStore } from "@/context/PCBEditorContext";
import React from "react";
import { useDrag } from "react-dnd";

interface DraggableComponentProps {
  id: string;
  type: string; // Ensure this is required
  children: React.ReactNode;
  onRemove?: () => void;
  style?: React.CSSProperties;
  isSelected?: boolean;
  multiSelect?: boolean;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  id,
  type,
  children,
  onRemove,
  style,
  isSelected,
  multiSelect = true,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type, // Must be a defined string or symbol
      item: { id, type },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [id, type], // Dependencies
  );

  const selectComponent = usePCBEditorStore((state) => state.selectComponent);
  const deselectComponent = usePCBEditorStore(
    (state) => state.deselectComponent,
  );
  const clearSelection = usePCBEditorStore((state) => state.clearSelection);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (e.shiftKey || e.ctrlKey || e.metaKey) {
      // Multi-selection
      if (isSelected) {
        deselectComponent(id);
      } else {
        selectComponent(id, true);
      }
    } else {
      // Single selection
      if (!isSelected) {
        clearSelection();
        selectComponent(id, false);
      }
    }
  };

  return (
    <div
      ref={drag}
      onClick={handleClick}
      className={`relative cursor-grab rounded border p-2 ${
        isSelected ? "border-blue-500" : "border-gray-300"
      } ${isDragging ? "opacity-50" : "opacity-100"}`}
      style={style}
    >
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute right-0 top-0 text-sm text-red-500"
          title="Remove Component"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default DraggableComponent;
