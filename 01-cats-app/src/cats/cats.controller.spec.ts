import { Test } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsService = module.get<CatsService>(CatsService);
    catsController = module.get<CatsController>(CatsController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      console.log(catsService);

      const PixelCat: Cat =        {
        age: 2,
        breed: 'Bombay',
        name: 'Pixel',
      };

      const result: Cat[] = [PixelCat];
      //jest.spyOn(catsService, 'findAll').mockImplementation(() => result);
      catsService.create(PixelCat);
      console.log(catsService.findAll());
      console.log(catsController.findAll());
      expect(await catsController.findAll()).toStrictEqual(result);
    });
  });
});
