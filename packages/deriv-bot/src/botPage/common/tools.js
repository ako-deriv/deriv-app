export const roundBalance = ({ currency, balance }) => {
    const point = ['BTC', 'LTC'].includes(currency) ? 8 : 2;
    return Number(balance).toFixed(point);
};

const hasOwnProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

export const isVirtual = tokenInfo => hasOwnProperty(tokenInfo, 'loginInfo') && tokenInfo.loginInfo.is_virtual;
