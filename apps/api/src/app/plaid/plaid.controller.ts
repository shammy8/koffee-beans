import { UserAccessToken } from '@koffee-beans/api-interfaces';
import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { getAccessTokenDTO, getTransactionsDTO } from './plaid.dto';
import { PlaidService } from './plaid.service';

@ApiTags('Plaid')
@Controller('plaid')
export class PlaidController {
  constructor(
    private plaidService: PlaidService,
    private userService: UserService
  ) {}

  // TODO create interfaces
  @ApiBearerAuth() // for swagger to allow you to add bearer
  @Post('create_link_token')
  createLinkToken() {
    return this.plaidService.createLinkToken();
  }

  @ApiBearerAuth()
  @Post('get_access_token')
  async getAccessToken(
    @Body() body: getAccessTokenDTO,
    @Request() req: { user: UserAccessToken }
  ) {
    const accessToken = await this.plaidService.getAccessToken(body);
    await this.userService.addPlaidAccessToken(accessToken, req.user);
    return accessToken;
  }

  @ApiBearerAuth()
  @Post('transactions')
  getTransactions(@Body() body: getTransactionsDTO) {
    return this.plaidService.getTransactions(body);
  }

  @ApiBearerAuth()
  @Post('get_balance')
  getBalance(@Body() body: getTransactionsDTO) {
    return this.plaidService.getBalance(body);
  }
}
