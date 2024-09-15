
import { ComponentType, WireType } from "../types";

export const exportWorkspace = (components: ComponentType[], wires: WireType[]) => {
  const data = { components, wires };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "workspace.json";
  a.click();
  URL.revokeObjectURL(url);
};

export const importWorkspace = (file: File, setComponents: Function, setWires: Function) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target?.result as string);
      setComponents(data.components || []);
      setWires(data.wires || []);
    } catch (error) {
      alert("Invalid file format");
    }
  };
  reader.readAsText(file);
};

