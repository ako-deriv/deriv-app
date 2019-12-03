import { localize } from 'deriv-translations';

Blockly.Blocks.logic_compare = {
    init() {
        this.jsonInit(this.definition());
    },
    definition(){
        return {
            message0: '%1 %2 %3',
            args0   : [
                {
                    type: 'input_value',
                    name: 'A',
                },
                {
                    type   : 'field_dropdown',
                    name   : 'OP',
                    options: [
                        ['=', 'EQ'],
                        ['\u2260', 'NEQ'],
                        ['\u200F<', 'LT'],
                        ['\u200F\u2264', 'LTE'],
                        ['\u200F>', 'GT'],
                        ['\u200F\u2265', 'GTE'],
                    ],
                },
                {
                    type: 'input_value',
                    name: 'B',
                },
            ],
            output         : 'Boolean',
            outputShape    : Blockly.OUTPUT_SHAPE_ROUND,
            colour         : Blockly.Colours.Base.colour,
            colourSecondary: Blockly.Colours.Base.colourSecondary,
            colourTertiary : Blockly.Colours.Base.colourTertiary,
            tooltip        : localize('Compares two values'),
            category       : Blockly.Categories.Logic,
        };
    },
    meta(){
        return {
            'display_name': localize('Compare'),
            'description' : localize('This block compares two values and is used to build a conditional structure.'),
        };
    },
};

Blockly.JavaScript.logic_compare = block => {
    const operatorMapping = {
        EQ : '==',
        NEQ: '!=',
        LT : '<',
        LTE: '<=',
        GT : '>',
        GTE: '>=',
    };

    const operator = operatorMapping[block.getFieldValue('OP') || 'EQ'];
    const order = ['==', '!='].includes(operator)
        ? Blockly.JavaScript.ORDER_EQUALITY
        : Blockly.JavaScript.ORDER_RELATIONAL;

    const argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || 'false';
    const argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || 'false';

    const code = `${argument0} ${operator} ${argument1}`;
    return [code, order];
};
