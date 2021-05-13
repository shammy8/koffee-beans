import { Injectable } from '@nestjs/common';
import * as plaid from 'plaid';
import { ConfigService } from '@nestjs/config';
import { getAccessTokenDTO, getTransactionsDTO } from './plaid.dto';

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

  async createLinkToken(): Promise<plaid.CreateLinkTokenResponse | undefined> {
    const countryCodes = this.config.get('PLAID_COUNTRY_CODES');
    if (countryCodes === undefined) return; // TODO return some error??

    try {
      // TODO check the options to createLinkToken
      return this.client.createLinkToken({
        user: {
          client_user_id: 'todo put real user id', // TODO
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
    } catch (err) {
      return err; // TODO use nest errors
    }
  }

  sandboxCreatePublicToken() {
    return this.client.sandboxPublicTokenCreate('ins_62', ['balance']);
  }

  async getAccessToken(
    publicToken: getAccessTokenDTO
  ): Promise<plaid.TokenResponse> {
    try {
      if (publicToken.token) {
        return this.client.exchangePublicToken(publicToken.token);
      } else {
        const sandboxPublicToken = await this.sandboxCreatePublicToken();
        return this.client.exchangePublicToken(sandboxPublicToken.public_token);
      }
    } catch (err) {
      return err;
    }
  }

  async getTransactions(
    transactionsBody: getTransactionsDTO
  ): Promise<plaid.TransactionsAllResponse> {
    try {
      const res = await this.client.getAllTransactions(
        transactionsBody.access_token,
        '2020-05-04',
        '2021-05-04'
      );
      return res;
    } catch (err) {
      return err;
    }
  }

  getBalance(body: getTransactionsDTO): Promise<plaid.AccountsResponse> {
    try {
      return this.client.getBalance(body.access_token);
    } catch (err) {
      return err;
    }
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
