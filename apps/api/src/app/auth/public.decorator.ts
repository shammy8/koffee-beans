import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

// this decorator allows people to call the endpoint without an access token
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
