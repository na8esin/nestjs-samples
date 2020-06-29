- auth.resolvers.login()の内部処理に行く前に
- GqlAuthGuard.getRequest()でrequest詰めなおし
  - そうしないと、passport-oauth2-client-passwordの内部で落ちる
    - https://github.com/jaredhanson/passport-oauth2-client-password/blob/master/lib/strategy.js#L38
- Oauth2ClientPasswordStrategy.validate()
  - authService.validateUser()
- CurrentUserデコレーターが実行
  - Oauth2ClientPasswordStrategy.validate()の返却値をコンテキストから取り出す
- auth.resolvers.login()の内部処理
  - userオブジェクトは、ちゃんとauthService.validateUser()の戻り値になっている
    - user_idが含まれている