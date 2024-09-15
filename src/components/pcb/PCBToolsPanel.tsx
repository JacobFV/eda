import React, { useRef } from "react";
import { usePCBEditorStore } from "../../context/PCBEditorContext";
import {
  exportPCBWorkspace,
  importPCBWorkspace,
} from "../../utils/pcbFileUtils";

const PCBToolsPanel: React.FC = () => {
  const components = usePCBEditorStore((state) => state.components);
  const traces = usePCBEditorStore((state) => state.traces);
  const layers = usePCBEditorStore((state) => state.layers);
  const setComponents = usePCBEditorStore((state) => state.addComponent);
  const setTraces = usePCBEditorStore((state) => state.addTrace);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportPCBWorkspace(components, traces, layers);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importPCBWorkspace(file, setComponents, setTraces);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 flex w-full justify-center space-x-4 bg-gray-100 p-4">
      <button
        onClick={handleExport}
        className="rounded bg-green-500 px-4 py-2 text-white"
      >
        Export PCB
      </button>
      <button
        onClick={handleImport}
        className="rounded bg-yellow-500 px-4 py-2 text-white"
      >
        Import PCB
      </button>
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      {/* Additional tools can be added here */}
    </div>
  );
};

export default PCBToolsPanel;
