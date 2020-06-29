export type ClientCredential = {
  clientId: string;
  clientSecret?: string;
  password?: string; // TODO パスワード不要かも？
  userId?: number;
  dbConfName?: string // TODO とりあえず追加してみたまだ未使用
};
