import { Injectable } from '@nestjs/common';
import * as plaid from 'plaid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlaidService {
  client!: plaid.Client;

  constructor(private config: ConfigService) {
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
}
