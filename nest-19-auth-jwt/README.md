# nest-19-auth-jwt
## test
```
curl -sS -X "POST" "http://localhost:3000/api/login" -d "username=john" -d "password=changeme"
```
```
curl -sS -X "POST" "http://localhost:3000/api/login2" -d "client_id=demo" -d "client_secret=bbbb"
```
### response example
```
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTU2ODg2OTczNCwiZXhwIjoxNTY4ODY5Nzk0fQ.vVCV3haGvJ7SrZob9qBsujlYatCyIGWAdtAOFoJ-ZUQ"}
```

## test2
```
curl -sS "http://localhost:3000/api/me" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTU2ODg4MTE4MywiZXhwIjoxNTY4ODgxMjQzfQ.ditBhLSfJ1wO8CAnVPvfVerg-lpSCaP4sRBfD1kWDhc"
```
### response example
`{"userId":1,"username":"john"}`


## add package
```
npm install --save passport-oauth2-client-password
npm install --save-dev @types/passport-oauth2-client-password
```

## グローバルなガードを一部で除外することができない
https://github.com/nestjs/nest/issues/964
