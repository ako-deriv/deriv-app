import { localize } from 'deriv-translations/lib/i18n';

Blockly.Blocks.controls_repeat_ext = {
    init() {
        this.jsonInit(this.definition());
    },
    definition(){
        return {
            message0: localize('repeat %1 times'),
            args0   : [
                {
                    type : 'input_value',
                    name : 'TIMES',
                    check: 'Number',
                },
            ],
            message1: localize('do %1'),
            args1   : [
                {
                    type: 'input_statement',
                    name: 'DO',
                },
            ],
            colour           : Blockly.Colours.Base.colour,
            colourSecondary  : Blockly.Colours.Base.colourSecondary,
            colourTertiary   : Blockly.Colours.Base.colourTertiary,
            previousStatement: null,
            nextStatement    : null,
            tooltip          : localize('Repeats inside instructions specified number of times'),
            category         : Blockly.Categories.Loop,
        };
    },
    meta(){
        return {
            'display_name': localize('Repeat (2)'),
            'description' : localize('This block is similar to the block above, except that the number of times it repeats is determined by a given variable.'),
        };
    },
    getRequiredValueInputs() {
        return {
            TIMES: null,
        };
    },
};

Blockly.JavaScript.controls_repeat_ext = block => {
    let repeats;
    if (block.getField('TIMES')) {
        repeats = String(Number(block.getFieldValue('TIMES')));
    } else {
        repeats = Blockly.JavaScript.valueToCode(block, 'TIMES') || '0';
    }

    const branch = Blockly.JavaScript.statementToCode(block, 'DO');
    let code = '';

    // eslint-disable-next-line no-underscore-dangle
    const loopVar = Blockly.JavaScript.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
    let endVar = repeats;

    if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
        // eslint-disable-next-line no-underscore-dangle
        endVar = Blockly.JavaScript.variableDB_.getDistinctName('repeat_end', Blockly.Variables.NAME_TYPE);
        code += `var ${endVar} = ${repeats};\n`;
    }

    code += `
    for (var ${loopVar} = 0; ${loopVar} < ${endVar}; ${loopVar}++) {
        ${branch}
    }\n`;
    return code;
};
