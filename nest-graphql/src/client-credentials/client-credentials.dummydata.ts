import { ClientCredential } from "./client-credentials";

export const clientCredentialDummy: ClientCredential[] = [
  {
    clientId: 'demo',
    clientSecret: 'abcdefgh', // この値はユーザごとに違う
    userId: 2,
  },
  {
    clientId: 'watanabe',
    clientSecret: 'abcdefgh',
    userId: 1,
  },
  {
    clientId: 'recruit',
    clientSecret: 'qwertyui',
    userId: 1,
  },
];
