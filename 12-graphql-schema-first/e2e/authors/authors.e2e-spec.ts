import { INestApplication } from "@nestjs/common";
import { GraphQLModule, GraphQLSchemaHost } from "@nestjs/graphql";
import { Test } from "@nestjs/testing";
import { graphql } from "graphql";
import { MockAuthorsModule } from "../../src/authors/mock-authors.module"
import { AuthorsService } from "../../src/authors/authors.service";
import { MockAuthorsService } from "../../src/authors/mock-authors.service";

describe('authors', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                MockAuthorsModule,
                GraphQLModule.forRoot({
                    playground: false,
                    typePaths: ['src/**/*.graphql'],
                    context: ({ req }) => ({ req }),
                }),
            ],
        }).compile();

        app = await moduleRef.createNestApplication();
        await app.init();
    });

    describe('findAll', () => {
        it('should return a normal', async () => {
            const service = await app.resolve('serviceProvider');
            //(await service).findAll();
            service.findAll();
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
