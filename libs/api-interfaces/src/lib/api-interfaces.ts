export interface Spending {
  id: string;
  cost: number;
  description: string;
  account: string; // the account from plaid or can be account type of cash
  category: string; // some type of lookup, allow user to add own category
  notes: string;
}
