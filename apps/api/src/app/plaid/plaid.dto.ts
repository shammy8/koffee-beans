import { ApiProperty } from '@nestjs/swagger';
import { PlaidOnSuccessArgs, PlaidSuccessMetadata } from 'ngx-plaid-link';
import { TokenResponse } from 'plaid';
// import { MaxLength } from 'class-validator';

export class getAccessTokenDTO implements Partial<PlaidOnSuccessArgs> {
  @ApiProperty({ required: false }) // TODO required should be true in real mode
  // @MaxLength(10)
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
