import { Injectable, HttpService } from '@nestjs/common';
import { Author } from '../graphql.schema';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AuthorsService {
  constructor(private readonly httpService: HttpService) {}

  private readonly authors: Author[] =
    [{ id: 1, firstName: 'Takayuki', lastName: 'Watanabe' }];

  findOneById(id: number): Author {
    return this.authors.find(authors => authors.id === id);
  }

  // 戻り値が使いづらい形だが、わかりやすいのでそのまま
  findAll():Observable<AxiosResponse<Author[]>> {
    return this.httpService.get('http://localhost:3001')
  }
}
