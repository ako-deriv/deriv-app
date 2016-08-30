'use strict';
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#2jo335


import RelationChecker from '../../relationChecker';
import { translator } from 'translator';


Blockly.Blocks.ticks = {
  init: function() {
    this.appendDummyInput()
        .appendField(translator.translateText("Ticks List"));
    this.setOutput(true, "Array");
    this.setColour("#f2f2f2");
    this.setTooltip(translator.translateText('Returns the list of tick values'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
	onchange: function(ev) {
		var relationChecker = new RelationChecker();
		relationChecker.inside_strategy(this, ev, 'Ticks List');
	},
};
