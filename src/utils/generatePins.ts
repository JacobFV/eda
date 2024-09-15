// src/utils/generatePins.ts

import { PinType } from "../types/pcb";
import { v4 as uuidv4 } from "uuid";

export const generatePinsForType = (type: string): PinType[] => {
  switch (type.toLowerCase()) {
    case "resistor":
      return [
        { id: uuidv4(), name: "A", xOffset: 0, yOffset: 0 },
        { id: uuidv4(), name: "B", xOffset: 5, yOffset: 0 },
      ];
    case "capacitor":
      return [
        { id: uuidv4(), name: "Positive", xOffset: 0, yOffset: 0 },
        { id: uuidv4(), name: "Negative", xOffset: 5, yOffset: 0 },
      ];
    // Add cases for other component types
    default:
      return [];
  }
};
