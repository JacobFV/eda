
export interface ComponentType {
  id: string;
  type: string;
  x: number;
  y: number;
  // Add more properties as needed
}

export interface WireType {
  id: string;
  from: string; // Component ID
  to: string;   // Component ID
}

