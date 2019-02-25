/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import 'jquery-ui/ui/widgets/dialog';
import 'notifyjs-browser';
import '../../common/binary-ui/dropdown';
import Elevio from '../../common/elevio';
import View from './View';

$.ajaxSetup({
    cache: false,
});

// eslint-disable-next-line no-underscore-dangle
window._trackJs = {
    token      : '346262e7ffef497d85874322fff3bbf8',
    application: 'binary-bot',
    enabled    : window.location.hostname !== 'localhost',
    console    : {
        display: false,
    },
};

// Should stay below the window._trackJs config
require('trackjs');

const view = new View();

view.initPromise.then(() => {
    $('.show-on-load').show();
    $('.barspinner').hide();
    window.dispatchEvent(new Event('resize'));
    Elevio.init();
    trackJs.configure({
        userId: $('.account-id')
            .first()
            .text(),
    });
});
