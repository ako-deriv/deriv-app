import config        from '../../../../constants';
import { translate } from '../../../../utils/lang/i18n';

Blockly.Blocks.read_details = {
    init() {
        this.jsonInit(this.definition());
    },
    definition(){
        return {
            message0: translate('Contract Details: %1'),
            args0   : [
                {
                    type   : 'field_dropdown',
                    name   : 'DETAIL_INDEX',
                    options: config.lists.DETAILS,
                },
            ],
            output         : null,
            outputShape    : Blockly.OUTPUT_SHAPE_ROUND,
            colour         : Blockly.Colours.Analysis.colour,
            colourSecondary: Blockly.Colours.Analysis.colourSecondary,
            colourTertiary : Blockly.Colours.Analysis.colourTertiary,
            tooltip        : translate('Reads a selected property from contract details list'),
            category       : Blockly.Categories.After_Purchase,
        };
    },
    meta(){
        return {
            'display_name': translate('Contract Details'),
            'description' : translate('Contract Details block returns one of properties of the last sold or expired contract.'),

        };
    },
    onchange(event) {
        if (!this.workspace || this.isInFlyout || this.workspace.isDragging()) {
            return;
        }

        if (event.type === Blockly.Events.BLOCK_CREATE || event.type === Blockly.Events.END_DRAG) {
            if (this.isDescendantOf('after_purchase')) {
                if (this.disabled) {
                    this.setDisabled(false);
                }
            } else if (!this.disabled) {
                this.setDisabled(true);
            }
        }
    },
};

Blockly.JavaScript.read_details = block => {
    const detailIndex = block.getFieldValue('DETAIL_INDEX');

    const code = `Bot.readDetails(${detailIndex})`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
