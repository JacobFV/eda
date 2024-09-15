import React, { useRef } from "react";
import { useEditorStore } from "@/context/editorStore";
import { exportWorkspace, importWorkspace } from "@/utils/fileUtils";

const ToolsPanel: React.FC = () => {
  const components = useEditorStore((state) => state.components);
  const wires = useEditorStore((state) => state.wires);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportWorkspace(components, wires);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importWorkspace(
        file,
        (newComponents: ComponentType[]) => {
          // Set imported components and wires
        },
        (newWires: WireType[]) => {
          // Set imported wires
        },
      );
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-60 bg-gray-100 p-2">
      <h2 className="mb-4 text-xl font-bold">Tools</h2>
      <button
        onClick={handleExport}
        className="mb-2 w-full rounded bg-green-500 p-2 text-white"
      >
        Export
      </button>
      <button
        onClick={handleImport}
        className="mb-2 w-full rounded bg-yellow-500 p-2 text-white"
      >
        Import
      </button>
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ToolsPanel;
