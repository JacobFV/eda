// src/components/shared/DetailsPanel.tsx

import React, { useMemo } from "react";
import { usePCBEditorStore } from "../../context/PCBEditorContext";
import { ComponentType } from "../../types/pcb";

interface DetailsPanelProps {}

const DetailsPanel: React.FC<DetailsPanelProps> = () => {
  const selectedComponentIds = usePCBEditorStore(
    (state) => state.selectedComponentIds,
  );
  const components = usePCBEditorStore((state) => state.components);
  const updateComponent = usePCBEditorStore((state) => state.updateComponent);

  const selectedComponents = useMemo(() => {
    return components.filter((comp) => selectedComponentIds.includes(comp.id));
  }, [components, selectedComponentIds]);

  if (selectedComponents.length === 0) {
    return (
      <div className="fixed bottom-0 left-64 right-64 bg-gray-200 p-4">
        <h2 className="text-lg font-bold">Details Panel</h2>
        <p>No component selected.</p>
      </div>
    );
  }

  // Determine if multiple components are selected
  const isMultiple = selectedComponents.length > 1;

  // Function to handle field changes
  const handleChange = (id: string, field: keyof ComponentType, value: any) => {
    updateComponent(id, { [field]: value });
  };

  return (
    <div className="max-h-1/3 fixed bottom-0 left-64 right-64 overflow-y-auto bg-gray-200 p-4">
      <h2 className="mb-4 text-lg font-bold">Details Panel</h2>
      {isMultiple ? (
        <div>
          <p>{selectedComponents.length} components selected.</p>
          {/* Add bulk edit fields if necessary */}
        </div>
      ) : (
        selectedComponents.map((comp) => (
          <div key={comp.id} className="mb-4">
            <h3 className="font-semibold">{comp.type}</h3>
            <label className="mb-2 block">
              X Position:
              <input
                type="number"
                value={comp.x}
                onChange={(e) =>
                  handleChange(comp.id, "x", Number(e.target.value))
                }
                className="mt-1 block w-full rounded border p-1"
              />
            </label>
            <label className="mb-2 block">
              Y Position:
              <input
                type="number"
                value={comp.y}
                onChange={(e) =>
                  handleChange(comp.id, "y", Number(e.target.value))
                }
                className="mt-1 block w-full rounded border p-1"
              />
            </label>
            <label className="mb-2 block">
              Rotation:
              <input
                type="number"
                value={comp.rotation}
                onChange={(e) =>
                  handleChange(comp.id, "rotation", Number(e.target.value))
                }
                className="mt-1 block w-full rounded border p-1"
              />
            </label>
            <label className="mb-2 block">
              Layer:
              <select
                value={comp.layer}
                onChange={(e) => handleChange(comp.id, "layer", e.target.value)}
                className="mt-1 block w-full rounded border p-1"
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                {/* Add more layers as needed */}
              </select>
            </label>
            {/* Add more fields as necessary */}
          </div>
        ))
      )}
    </div>
  );
};

export default DetailsPanel;
