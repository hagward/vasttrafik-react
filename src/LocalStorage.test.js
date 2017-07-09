import LocalStorage from './LocalStorage';

describe('getItem', () => {
  it('returns item from browser local storage', () => {
    const window = {
      localStorage: {
        item: 'test'
      }
    };

    const localStorage = new LocalStorage(window);

    expect(localStorage.getItem('item')).toEqual('test');
  });

  it('does not fail if browser local storage is not defined', () => {
    const localStorage = new LocalStorage();
    localStorage.setItem('item', 'test');

    expect(localStorage.getItem('item')).toEqual('test');
  });
});
