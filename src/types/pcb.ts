export interface ComponentType {
  id: string;
  type: string;
  x: number;
  y: number;
  rotation: number; // in degrees
  layer: string; // layer ID
  pins: PinType[];
}

export interface PinType {
  id: string;
  name: string;
  xOffset: number;
  yOffset: number;
}

export interface TraceType {
  id: string;
  fromComponentId: string;
  fromPinId: string;
  toComponentId: string;
  toPinId: string;
  layer: string; // layer ID
  path: Array<{ x: number; y: number }>; // array of points
}

export interface LayerType {
  id: string;
  name: string;
  visible: boolean;
}

export interface DesignRules {
  traceWidth: number; // in mm
  traceSpacing: number; // in mm
}
