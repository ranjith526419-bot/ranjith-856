export interface ChallengeItem {
  id: string;
  number: number;
  title: string;
  iconName: string;
  problem: string;
  aiSolution: string;
  problemPoints: string[];
  solutionPoints: string[];
  tag: string;
}

export type FarmerType =
  | 'Crop Farmer'
  | 'Dairy Farmer'
  | 'Horticulture Farmer'
  | 'Poultry Farmer'
  | 'Organic Farmer'
  | 'Mixed Agriculture'
  | 'Other';

export interface FarmerUser {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  farmerType: FarmerType;
  registeredAt: string;
  password?: string;
}

