'use strict';
import 'babel-polyfill';
import 'blockly';
import './utils/draggable';
import Observer from 'binary-common-utils/observer';
import Bot from './bot';
import View from './view';
import logger from './view/logger';

$.ajaxSetup({
	cache: false
});

var bot = new Bot();
var observer = new Observer();
window.Bot = {
	start: bot.start.bind(bot),
	stop: bot.stop.bind(bot),
	toggleDebug: logger.toggleDebug.bind(logger),
	log: function (message, type) {
		observer.emit('ui.log.'+ type, message );
	},
	getTotalProfit: function getTotalProfit(){
		return bot.totalProfit;
	}
};
bot.initPromise.then(function(){
	var view = new View();
	view.initPromise.then(function(){
		$('.spinning').hide();
		view.tours.welcome.welcome();
	});
});
