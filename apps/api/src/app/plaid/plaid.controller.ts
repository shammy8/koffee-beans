import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PlaidService } from './plaid.service';

// TODO move to service
@Controller('plaid')
export class PlaidController {
  constructor(
    private plaidService: PlaidService,
    private config: ConfigService
  ) {}

  // TODO create interfaces
  @Post('create_link_token')
  async createLinkToken() {
    const countryCodes = this.config.get('PLAID_COUNTRY_CODES');
    if (countryCodes === undefined) return;

    try {
      const res = await this.plaidService.client.createLinkToken({
        user: {
          client_user_id: 'todo put real user id',
        },
        client_name: 'Koffee Beans',
        products: ['auth', 'transactions'],
        country_codes: [countryCodes],
        language: 'en',
        webhook: 'http://sample-web-hook.com',
        account_filters: {
          depository: {
            account_subtypes: ['checking', 'savings'],
          },
        },
      });
      return { linkToken: res.link_token };
    } catch (err) {
      return err; // TODO use nest errors
    }
  }

  @Post('get_access_token')
  async getAccessToken(
    @Body('publicToken') publicToken: string,
    @Body('metadata') metadata: any
  ) {
    const res = await this.plaidService.client
      .exchangePublicToken(publicToken)
      .catch((err) => {
        return err;
      });
    return res;
  }

  @Post('transactions')
  async getTransactions(@Body('accessToken') accessToken: string) {
    const res = await this.plaidService.client
      .getAllTransactions(accessToken, '2020-05-04', '2021-05-04')
      .catch((err) => {
        return err;
      });
    return { transactions: res.transactions };
  }

  // TODO need to check how to use this
  // don't think the below is correct
  // @Post('get_link_token')
  // async getLinkToken(@Body('link-token') linkToken: string) {
  //   // TODO add nest body validation
  //   const res = await this.plaidService.client
  //     .getLinkToken(linkToken)
  //     .catch((err) => {
  //       if (!linkToken) {
  //         return `${err} no link token`;
  //       }
  //       return err;
  //     });
  //   return res;
  // }
}
