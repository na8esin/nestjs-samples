import DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { Author } from 'src/graphql.schema';

@Injectable()
export class AuthorsLoaderNorequest {
  createLoader(batch) {
    return new DataLoader<number, Author>(batch);
  }
}