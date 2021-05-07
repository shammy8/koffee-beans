import { Injectable } from '@nestjs/common';
import * as plaid from 'plaid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlaidService {
  client!: plaid.Client;

  constructor(private config: ConfigService) {
    this.createPlaidClient();
  }

  createPlaidClient() {
    const clientID = this.config.get('PLAID_CLIENT_ID');
    const secret = this.config.get('PLAID_SECRET');
    if (clientID && secret) {
      this.client = new plaid.Client({
        clientID,
        secret,
        env: plaid.environments.sandbox,
        options: {},
      });
    }
  }

  async createLinkToken() {
    const countryCodes = this.config.get('PLAID_COUNTRY_CODES');
    if (countryCodes === undefined) return; // TODO return some error??

    try {
      // TODO check the options to createLinkToken
      const res = await this.client.createLinkToken({
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

  async getAccessToken(publicToken: string) {
    const res = await this.client
      .exchangePublicToken(publicToken)
      .catch((err) => {
        return err;
      });
    return res;
  }

  async getTransactions(accessToken: string) {
    const res = await this.client
      .getAllTransactions(accessToken, '2020-05-04', '2021-05-04')
      .catch((err) => {
        return err;
      });
    return { transactions: res.transactions };
  }
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
