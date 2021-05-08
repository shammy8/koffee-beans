import { PlaidOnSuccessArgs, PlaidSuccessMetadata } from 'ngx-plaid-link';
import { TokenResponse } from 'plaid';

export class getAccessTokenDTO implements PlaidOnSuccessArgs {
  token!: string;
  metadata!: PlaidSuccessMetadata;
}

export class getTransactionsDTO implements TokenResponse {
  access_token!: string;
  item_id!: string;
  request_id!: string;
}
