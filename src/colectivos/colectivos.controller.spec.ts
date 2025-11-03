import { Test, TestingModule } from '@nestjs/testing';
import { ColectivosController } from './colectivos.controller';
import { ColectivosService } from './colectivos.service';

describe('ColectivosController', () => {
  let controller: ColectivosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColectivosController],
      providers: [ColectivosService],
    }).compile();

    controller = module.get<ColectivosController>(ColectivosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
