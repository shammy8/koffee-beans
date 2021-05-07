import { Body, Controller, Post } from '@nestjs/common';
import { PlaidService } from './plaid.service';

@Controller('plaid')
export class PlaidController {
  constructor(private plaidService: PlaidService) {}

  // TODO create interfaces
  @Post('create_link_token')
  async createLinkToken() {
    return this.plaidService.createLinkToken();
  }

  @Post('get_access_token')
  async getAccessToken(
    @Body('publicToken') publicToken: string
    // @Body('metadata') metadata: any
  ) {
    return this.plaidService.getAccessToken(publicToken);
  }

  @Post('transactions')
  async getTransactions(@Body('accessToken') accessToken: string) {
    return this.plaidService.getTransactions(accessToken);
  }
}
