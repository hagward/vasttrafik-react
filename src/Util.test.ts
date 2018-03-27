import Util from './Util';

describe('Util', () => {
  describe('list', () => {
    it('returns object wrapped in an array', () => {
      expect(Util.list('test')).toEqual(['test']);
    });

    it('returns object if it already is an array', () => {
      expect(Util.list(['test'])).toEqual(['test']);
    });
  });

  describe('first', () => {
    it('returns the first element of an array', () => {
      expect(Util.first(['a', 'b', 'c'])).toEqual('a');
    });

    it('returns undefined if array is empty', () => {
      expect(Util.first([])).toEqual(undefined);
    });
  });

  describe('last', () => {
    it('returns the last element of an array', () => {
      expect(Util.last(['a', 'b', 'c'])).toEqual('c');
    });

    it('returns undefined if array is empty', () => {
      expect(Util.last([])).toEqual(undefined);
    });
  });

  describe('shortLocation', () => {
    it('returns everything before the first comma', () => {
      expect(Util.shortLocation('left,right')).toEqual('left');
    });

    it('returns everything if there is no comma', () => {
      expect(Util.shortLocation('leftright')).toEqual('leftright');
    });
  });
});
