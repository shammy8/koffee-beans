import { Spending } from '@koffee-beans/api-interfaces';

export interface CreateSpendingDto extends Partial<Spending> {}
export interface UpdateSpendingDto extends Partial<Spending> {}
