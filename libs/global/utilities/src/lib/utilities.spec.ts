import { isNullOrUndefined } from './utilities';

describe('utility functions', () => {
  describe(isNullOrUndefined.name, () => {
    it('should return true given an undefined object', () =>
      expect(isNullOrUndefined(undefined)).toBe(true));

    it('should return true given a null object', () =>
      expect(isNullOrUndefined(null)).toBe(true));

    it('should return false given an valid object', () =>
      expect(isNullOrUndefined({})).toBe(false));
  });
});
