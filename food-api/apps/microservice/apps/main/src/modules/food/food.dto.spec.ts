import { FoodDto } from './food.dto';

describe('FoodDto', () => {
  it('should be defined', () => {
    expect(new FoodDto()).toBeDefined();
  });
});
