const DataDragonHelper = require("leaguejs/lib/DataDragon/DataDragonHelper");
DataDragonHelper.storageRoot = [__dirname];

const getItems = () => {
  DataDragonHelper.gettingItemList();
};

getItems();
