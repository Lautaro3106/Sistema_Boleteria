import { Test, TestingModule } from '@nestjs/testing';
import { ColectivosService } from './colectivos.service';

describe('ColectivosService', () => {
  let service: ColectivosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColectivosService],
    }).compile();

    service = module.get<ColectivosService>(ColectivosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
