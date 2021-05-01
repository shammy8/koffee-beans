export interface Spending {
  id: string;
  cost: number;
  shop: string;
  category: string; // some type of lookup
  notes: string;
}
