import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { Author } from 'src/graphql.schema';

@Injectable({ scope: Scope.REQUEST })
export class AuthorsLoader {

  createLoader(batch) {
    return new DataLoader<number, Author>(batch);
  }
}