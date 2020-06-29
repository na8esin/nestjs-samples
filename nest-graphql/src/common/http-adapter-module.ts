import { Global, Module, HttpModule, HttpModuleAsyncOptions, DynamicModule } from "@nestjs/common";
import { ConfigModule } from "../config/config-module";
import { ConfigService } from "../config/config.service";
import { HttpAdapter } from "../http/http-adapter";

@Global()
@Module({
  imports: [
    HttpModule.register({
      baseURL: 'http://127.0.0.1:8765/private-api/'
    }),
  ],
  providers: [HttpAdapter],
  exports: [HttpModule, HttpAdapter]
})
export class StaticCommonModule { }

// registerAsync用
const options: HttpModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    baseURL: configService.get('PRIVATE_API_BASEURL'),
  }),
  inject: [ConfigService],
}

@Global()
@Module({
  imports: [
    HttpModule.registerAsync(options),
  ],
  providers: [HttpAdapter],
  exports: [HttpModule, HttpAdapter]
})
export class HttpAdapterModule { }

@Global()
@Module({})
export class DynamicCommonModule {
  static async register(baseURL?: string): Promise<DynamicModule> {
    return {
      module: DynamicCommonModule,
      imports: [
        HttpModule.register({
          baseURL
        }),
      ],
      exports: [HttpModule]
    }
  };
}
