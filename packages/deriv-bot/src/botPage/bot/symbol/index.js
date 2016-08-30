import tools from 'binary-common-utils/tools';
import Observer from 'binary-common-utils/observer';
import config from '../../../common/const';
import ActiveSymbols from './activeSymbols';

export default class _Symbol {
  constructor(api) {
    this.observer = new Observer();
    this.api = api._originalApi;
    this.assetIndex = {};
    this.initPromise = new Promise((resolve) => {
      tools.asyncChain()
        .pipe((done) => {
          this.api.getActiveSymbolsBrief().then((response) => {
            this.activeSymbols = new ActiveSymbols(response.active_symbols);
            done();
          }, (error) => {
            this.observer.emit('api.error', error);
          });
        })
        .pipe((done) => {
          this.api.getAssetIndex().then((response) => {
            this.parseAssetIndex(response.asset_index);
            done();
          }, (error) => {
            this.observer.emit('api.error', error);
          });
        })
        .pipe(resolve)
        .exec();
    });
  }
  parseAssetIndex(assetIndex) {
    for (let symbol of assetIndex) {
      this.assetIndex[symbol[0].toLowerCase()] = {};
      for (let category of symbol[2]) {
        this.assetIndex[symbol[0].toLowerCase()][category[0].toLowerCase()] = category[2];
      }
    }
  }
  getLimitation(symbol, condition) {
    let category = this.getCategoryForCondition(condition);
    return {
      minDuration: this.assetIndex[symbol][category],
    };
  }
  getAllowedConditionsForSymbol(symbol) {
    return this.getAllowedConditionsOrCategoriesForSymbol(symbol).conditions;
  }
  getAllowedCategoriesForSymbol(symbol) {
    return this.getAllowedConditionsOrCategoriesForSymbol(symbol).categories;
  }
  getAllowedConditionsOrCategoriesForSymbol(symbol) {
    let allowedConditions = [];
    let allowedCategories = [];
    let index = this.assetIndex[symbol.toLowerCase()];
    if (index) {
      for (let conditionName of Object.keys(config.conditionsCategory)) {
        if (conditionName in index) {
          allowedConditions = allowedConditions.concat(config.conditionsCategory[conditionName]);
          allowedCategories.push(conditionName);
        }
      }
    }
    return {
      conditions: allowedConditions,
      categories: allowedCategories,
    };
  }
  isConditionAllowedInSymbol(symbol, condition) {
    let allowedConditions = this.getAllowedConditionsForSymbol(symbol);
    return allowedConditions.indexOf(condition) >= 0;
  }
  getConditionName(condition) {
    let opposites = config.opposites[condition.toUpperCase()];
    return tools.getObjectValue(opposites[0]) + '/' + tools.getObjectValue(opposites[1]);
  }
  getCategoryForCondition(condition) {
    for (let category of Object.keys(config.conditionsCategory)) {
      if (config.conditionsCategory[category].indexOf(condition.toLowerCase()) >= 0) {
        return category;
      }
    }
    return null;
  }
  getCategoryNameForCondition(condition) {
    return config.conditionsCategoryName[this.getCategoryForCondition(condition)];
  }
  getAllowedCategoryNames(symbol) {
    let allowedCategories = this.getAllowedCategoriesForSymbol(symbol);
    return allowedCategories.map((el) => config.conditionsCategoryName[el]);
  }
  findSymbol(symbol) {
    let activeSymbols = this.activeSymbols.getSymbolNames();
    let result;
    Object.keys(activeSymbols).forEach((key) => {
      if (key.toLowerCase() === symbol.toLowerCase()) {
        if (!result) {
          result = {};
        }
        result[key] = activeSymbols[key];
      }
    });
    return result;
  }
}
