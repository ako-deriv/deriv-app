const { getLanguage } = require('deriv-translations/lib/i18n');

const Language = (() => {
    const urlForLanguage = (lang, url = window.location.href) =>
        url.replace(new RegExp(`/${getLanguage()}/`, 'i'), `/${(lang || 'EN').trim().toLowerCase()}/`);

    return {
        urlFor   : urlForLanguage,
    };
})();

module.exports = Language;
