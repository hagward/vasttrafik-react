const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
(window.localStorage as any) = localStorageMock;
