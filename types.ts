
export interface GrantTier {
  pay: string;
  receive: string;
}

export interface ThemeColors {
  bg: string;
  heading: string;
  accent: string;
  text: string;
}

export interface FlyerData {
  heading: string;
  tagline: string;
  amount: string;
  subHeading: string;
  description: string;
  terms: string;
  tiers: GrantTier[];
  disbursement: string;
  contact: string;
}

export interface ImageEditState {
  originalImage: string | null;
  editedImage: string | null;
  isProcessing: boolean;
  error: string | null;
}
