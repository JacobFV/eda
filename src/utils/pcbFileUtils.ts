import { ComponentType, TraceType, LayerType } from "../types/pcb";
import { usePCBEditorStore } from "../context/PCBEditorContext";

interface PCBWorkspace {
  components: ComponentType[];
  traces: TraceType[];
  layers: LayerType[];
}

export const exportPCBWorkspace = (
  components: ComponentType[],
  traces: TraceType[],
  layers: LayerType[],
) => {
  const data: PCBWorkspace = { components, traces, layers };
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "pcb-workspace.json";
  a.click();
  URL.revokeObjectURL(url);
};

export const importPCBWorkspace = (
  file: File,
  addComponent: (component: ComponentType) => void,
  addTrace: (trace: TraceType) => void,
  setLayers: (layers: LayerType[]) => void,
) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data: PCBWorkspace = JSON.parse(e.target?.result as string);
      if (data.components && data.traces && data.layers) {
        // Clear existing workspace
        // Assuming there are actions to reset components and traces
        // Implement as needed
        // For now, we'll simply add the imported components and traces
        data.components.forEach((comp) => addComponent(comp));
        data.traces.forEach((trace) => addTrace(trace));
        setLayers(data.layers);
      } else {
        alert("Invalid PCB workspace file.");
      }
    } catch (error) {
      alert("Error parsing PCB workspace file.");
    }
  };
  reader.readAsText(file);
};
