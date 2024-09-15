import React from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ComponentType, TraceType, LayerType, DesignRules } from "../types/pcb";

interface PCBEditorState {
  components: ComponentType[];
  traces: TraceType[];
  layers: LayerType[];
  designRules: DesignRules;
  addComponent: (component: ComponentType) => void;
  updateComponent: (id: string, updated: Partial<ComponentType>) => void;
  removeComponent: (id: string) => void;
  addTrace: (trace: TraceType) => void;
  updateTrace: (id: string, updated: Partial<TraceType>) => void;
  removeTrace: (id: string) => void;
  addLayer: (layer: LayerType) => void;
  updateLayer: (id: string, updated: Partial<LayerType>) => void;
  removeLayer: (id: string) => void;
  setDesignRules: (rules: DesignRules) => void;
}

export const usePCBEditorStore = create<PCBEditorState>(
  persist(
    (set) => ({
      components: [],
      traces: [],
      layers: [
        { id: "top", name: "Top Layer", visible: true },
        { id: "bottom", name: "Bottom Layer", visible: true },
      ],
      designRules: {
        traceWidth: 0.2, // in mm
        traceSpacing: 0.15, // in mm
      },
      addComponent: (component) =>
        set((state) => ({ components: [...state.components, component] })),
      updateComponent: (id, updated) =>
        set((state) => ({
          components: state.components.map((comp) =>
            comp.id === id ? { ...comp, ...updated } : comp,
          ),
        })),
      removeComponent: (id) =>
        set((state) => ({
          components: state.components.filter((comp) => comp.id !== id),
          traces: state.traces.filter(
            (trace) =>
              trace.fromComponentId !== id && trace.toComponentId !== id,
          ),
        })),
      addTrace: (trace) =>
        set((state) => ({ traces: [...state.traces, trace] })),
      updateTrace: (id, updated) =>
        set((state) => ({
          traces: state.traces.map((trace) =>
            trace.id === id ? { ...trace, ...updated } : trace,
          ),
        })),
      removeTrace: (id) =>
        set((state) => ({
          traces: state.traces.filter((trace) => trace.id !== id),
        })),
      addLayer: (layer) =>
        set((state) => ({ layers: [...state.layers, layer] })),
      updateLayer: (id, updated) =>
        set((state) => ({
          layers: state.layers.map((layer) =>
            layer.id === id ? { ...layer, ...updated } : layer,
          ),
        })),
      removeLayer: (id) =>
        set((state) => ({
          layers: state.layers.filter((layer) => layer.id !== id),
        })),
      setDesignRules: (rules) => set(() => ({ designRules: rules })),
    }),
    {
      name: "pcb-editor-storage", // unique name
      getStorage: () => localStorage, // specify storage
    },
  ),
);

interface PCBEditorProviderProps {
  children: React.ReactNode;
}

export const PCBEditorProvider: React.FC<PCBEditorProviderProps> = ({
  children,
}) => {
  return <>{children}</>;
};
