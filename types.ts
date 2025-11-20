export enum MachineType {
  WORK = 'WORK', // Added Work concept
  LEVER = 'LEVER',
  WHEEL_AXLE = 'WHEEL_AXLE',
  PULLEY = 'PULLEY',
  INCLINED_PLANE = 'INCLINED_PLANE',
  WEDGE = 'WEDGE',
  SCREW = 'SCREW'
}

export interface MachineInfo {
  id: MachineType;
  name: string; // Arabic Name
  scientificName: string; // English/Scientific Name
  description: string;
  physicsConcept: string; // New field for physics explanation
  example: string;
  imageUrl: string; // Changed from icon to imageUrl
  color: string;
}

export interface GameScenario {
  scenario: string;
  correctMachine: MachineType;
  explanation: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

export type AppView = 'HOME' | 'LEARN' | 'GAME';