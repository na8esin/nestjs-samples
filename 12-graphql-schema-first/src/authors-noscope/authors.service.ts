import { Injectable } from '@nestjs/common';
import { Author } from '../graphql.schema';
import { AuthorsLoaderNorequest } from './authors.loader-norequest';

@Injectable()
export class AuthorsService {
  private readonly authors: Author[] = [{ id: 1, name: 'john', age: 31 }];

  constructor(private readonly loader: AuthorsLoaderNorequest){}

  create(author: Author): Author {
    author.id = this.authors.length + 1;
    this.authors.push(author);
    return author;
  }

  findAll(): Author[] {
    console.log(this.authors);
    return this.authors;
  }

  findOneById(id: number): Author {
    return this.authors.find(e => e.id === id);
  }

  batchLoadFn = async(id) => {
    return await id;
  }
}
