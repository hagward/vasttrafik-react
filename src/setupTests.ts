const localStorageMock = (() => {
  const store = {};
  return {
    getItem: (key: string) => store[key],
    setItem: (key: string, data: string) => store[key] = data,
  };
})();
(window.localStorage as any) = localStorageMock;
