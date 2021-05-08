import { ApiProperty } from '@nestjs/swagger';
import { PlaidOnSuccessArgs, PlaidSuccessMetadata } from 'ngx-plaid-link';
import { TokenResponse } from 'plaid';

export class getAccessTokenDTO implements Partial<PlaidOnSuccessArgs> {
  @ApiProperty()
  token!: string;
  @ApiProperty({ required: false })
  metadata?: PlaidSuccessMetadata;
}

export class getTransactionsDTO implements Partial<TokenResponse> {
  @ApiProperty()
  access_token!: string;
  @ApiProperty({ required: false })
  item_id?: string;
  @ApiProperty({ required: false })
  request_id?: string;
}
