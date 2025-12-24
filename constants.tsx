
import { FlyerData, ThemeColors } from './types';

export const DEFAULT_THEME: ThemeColors = {
  bg: "#ffffff",
  heading: "#1e3a8a", // blue-900
  accent: "#1e40af",  // blue-800
  text: "#374151"     // gray-700
};

export const DEFAULT_FLYER_DATA: FlyerData = {
  heading: "GRANT SCHEME",
  tagline: "Grants are not loans and are awarded to individuals every day",
  amount: "$43.7bn",
  subHeading: "Total Commitment to Federal Assistance",
  description: "To support general welfare, health, big & small businesses, college, housing, public works & others",
  terms: "The program has predefined funding tiers that determine eligibility amount, while applicants must select an approved grant amount affordable. These fees are required for tax processing, delivery fees, and authorization compliance review",
  tiers: [
    { pay: "$200", receive: "$1,000" },
    { pay: "$1,000", receive: "$10,000" },
    { pay: "$7,000", receive: "$70,000" },
    { pay: "$15,000", receive: "$150,000" },
    { pay: "$40,000", receive: "$400,000" },
    { pay: "$100,000", receive: "$1,000,000" }
  ],
  disbursement: "Final disbursement is executed immediately via FedEx, after the payment of the selected mandatory funding tier for tax compliance, and delivery fees has been made",
  contact: "Contact us: Send a message to 1234567890 text \"APPLY NOW\"."
};
