import LocalStorage from '../../utils/localStorage.js';

jest.mock('../../utils/localStorage.js');

describe('Local storage mock operations', () => {
  beforeAll(() => {
    LocalStorage.mockImplementation(() => ({
      localData: [],
      loadInputData() {
        return this.localData;
      },
      saveData(data) {
        this.localData.push(data);
      },
    }));
  });
  it('loadInputData length should be greater than 1', () => {
    const localStorage = new LocalStorage();
    localStorage.saveData('object 1');
    expect(localStorage.loadInputData().length).toBe(1);
  });
});
