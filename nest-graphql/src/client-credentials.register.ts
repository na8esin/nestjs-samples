import { NestFactory } from "@nestjs/core";
import { Module, Logger } from "@nestjs/common";
import { ClientCredentialsModule } from "./client-credentials/client-credentials.module";
import { ConfigModule } from "./config/config-module";
import { ClientCredentialsService } from "./client-credentials/client-credentials.service";
import { clientCredentialDummy } from "./client-credentials/client-credentials.dummydata";

@Module({
    imports: [
        ClientCredentialsModule,
        ConfigModule,
    ],
    providers: [
        Logger,
    ],
})
class ApplicationModule { }

// ダミーデータをあらかじめredisに登録
async function bootstrap() {
    const app = await NestFactory.createApplicationContext(ApplicationModule);
    const clientCredentialsService = app.get(ClientCredentialsService);
    const client = clientCredentialsService.getClient();

    for (const clientCredential of clientCredentialDummy) {
        await client.set(
            clientCredentialsService.getCreatedKey(
                clientCredential.clientId,
                clientCredential.clientSecret,
            ),
            JSON.stringify(clientCredential),
        );
    }
    await app.close();
}
bootstrap();