import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getAccessTokenDTO, getTransactionsDTO } from './plaid.dto';
import { PlaidService } from './plaid.service';

@ApiTags('Plaid')
@Controller('plaid')
export class PlaidController {
  constructor(private plaidService: PlaidService) {}

  // TODO create interfaces
  @Post('create_link_token')
  createLinkToken() {
    return this.plaidService.createLinkToken();
  }

  @Post('get_access_token')
  getAccessToken(@Body() body: getAccessTokenDTO) {
    return this.plaidService.getAccessToken(body);
  }

  @Post('transactions')
  getTransactions(@Body() body: getTransactionsDTO) {
    return this.plaidService.getTransactions(body);
  }
}
