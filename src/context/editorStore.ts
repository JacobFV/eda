import { create } from "zustand";
import { ComponentType, WireType } from "../types";

interface EditorState {
  components: ComponentType[];
  wires: WireType[];
  addComponent: (component: ComponentType) => void;
  updateComponent: (id: string, updated: Partial<ComponentType>) => void;
  addWire: (wire: WireType) => void;
  setComponents: (components: ComponentType[]) => void;
  setWires: (wires: WireType[]) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  components: [],
  wires: [],
  addComponent: (component) =>
    set((state) => ({ components: [...state.components, component] })),
  updateComponent: (id, updated) =>
    set((state) => ({
      components: state.components.map((comp) =>
        comp.id === id ? { ...comp, ...updated } : comp,
      ),
    })),
  addWire: (wire) => set((state) => ({ wires: [...state.wires, wire] })),
  setComponents: (components) => set(() => ({ components })),
  setWires: (wires) => set(() => ({ wires })),
}));

// Persist to localStorage
useEditorStore.subscribe((state) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "eda-workspace",
      JSON.stringify({
        components: state.components,
        wires: state.wires,
      }),
    );
  }
});

// Initialize from localStorage
if (typeof window !== "undefined") {
  const saved = localStorage.getItem("eda-workspace");
  if (saved) {
    const { components, wires } = JSON.parse(saved);
    useEditorStore.setState({ components, wires });
  }
}
