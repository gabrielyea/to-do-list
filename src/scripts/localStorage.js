class LocalStorage {
  /**
   * Saves a data list.
   ** Preferably shold be used as a callback or observer.
   * @param {Object} data An array or list of elements.
   */
  saveData = ({ data }) => {
    console.table(data);
    window.localStorage.clear();
    window.localStorage.setItem('userData', JSON.stringify(data));
  };

  /**
   * Gets all loaded user data from previous session.
   *
   * @returns loaded data
   */
  loadInputData = () => {
    if (localStorage.getItem('userData') !== null) {
      const loadedData = JSON.parse(window.localStorage.getItem('userData'));
      console.table(loadedData);
      return loadedData;
    }
    return null;
  };
}

const storage = new LocalStorage();
export { storage as default };
