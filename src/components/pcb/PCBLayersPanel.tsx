import React, { useState } from "react";
import { usePCBEditorStore } from "../../context/PCBEditorContext";
import { v4 as uuidv4 } from "uuid";

const PCBLayersPanel: React.FC = () => {
  const layers = usePCBEditorStore((state) => state.layers);
  const addLayer = usePCBEditorStore((state) => state.addLayer);
  const updateLayer = usePCBEditorStore((state) => state.updateLayer);
  const removeLayer = usePCBEditorStore((state) => state.removeLayer);

  const [newLayerName, setNewLayerName] = useState("");

  const handleAddLayer = () => {
    if (newLayerName.trim() === "") return;
    addLayer({
      id: uuidv4(),
      name: newLayerName.trim(),
      visible: true,
    });
    setNewLayerName("");
  };

  const handleToggleVisibility = (id: string) => {
    const layer = layers.find((l) => l.id === id);
    if (layer) {
      updateLayer(id, { visible: !layer.visible });
    }
  };

  const handleRemoveLayer = (id: string) => {
    if (confirm("Are you sure you want to remove this layer?")) {
      removeLayer(id);
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-64 overflow-y-auto bg-gray-100 p-4">
      <h2 className="mb-4 text-xl font-bold">Layers</h2>
      <ul>
        {layers.map((layer) => (
          <li key={layer.id} className="mb-2 flex items-center">
            <input
              type="checkbox"
              checked={layer.visible}
              onChange={() => handleToggleVisibility(layer.id)}
              className="mr-2"
            />
            <span className="flex-grow">{layer.name}</span>
            <button
              onClick={() => handleRemoveLayer(layer.id)}
              className="text-red-500"
              title="Remove Layer"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <input
          type="text"
          value={newLayerName}
          onChange={(e) => setNewLayerName(e.target.value)}
          placeholder="New Layer Name"
          className="mb-2 w-full rounded border p-2"
        />
        <button
          onClick={handleAddLayer}
          className="w-full rounded bg-blue-500 p-2 text-white"
        >
          Add Layer
        </button>
      </div>
    </div>
  );
};

export default PCBLayersPanel;
