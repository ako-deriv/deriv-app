import { translate } from '../../../utils/lang/i18n';

Blockly.Blocks.text_print = {
    init() {
        this.jsonInit(this.definition());
    },
    definition(){
        return {
            message0: translate('print %1'),
            args0   : [
                {
                    type: 'input_value',
                    name: 'TEXT',
                },
            ],
            colour           : Blockly.Colours.Special3.colour,
            colourSecondary  : Blockly.Colours.Special3.colourSecondary,
            colourTertiary   : Blockly.Colours.Special3.colourTertiary,
            previousStatement: null,
            nextStatement    : null,
            tooltip          : translate('Displays a dialog window with a message'),
            category         : Blockly.Categories.Text,
        };
    },
    meta(){
        return {
            'display_name': translate('Print'),
            'description' : translate('This block displays a dialog window with a given message.'),
        };
    },
    getRequiredInputs() {
        return {
            TEXT: null,
        };
    },
};

Blockly.JavaScript.text_print = block => {
    const msg = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_NONE) || '\'\'';
    const code = `window.alert(${msg});\n`;
    return code;
};
