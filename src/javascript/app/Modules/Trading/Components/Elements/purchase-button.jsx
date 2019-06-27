import classNames                 from 'classnames';
import PropTypes                  from 'prop-types';
import React                      from 'react';
import { localize }               from '_common/localize';
import Button                     from 'App/Components/Form/button.jsx';
import Icon                       from 'Assets/icon.jsx';
import { getContractTypeDisplay } from 'Constants/contract';

const PurchaseButton = ({
    // buy_info,
    index,
    info,
    is_contract_mode,
    is_disabled,
    is_high_low,
    is_loading,
    is_purchased_arr,
    should_fade,
    onClickPurchase,
    type,
}) => {
    const getIconType = () => {
        if (!should_fade && is_loading) return '';
        return (is_high_low) ? `${type.toLowerCase()}_barrier` : type.toLowerCase();
    };
    const is_purchased = (is_purchased_arr.length > 0) ? !!(is_purchased_arr[index]) : false;

    return (
        <Button
            is_disabled={is_contract_mode || is_disabled}
            id={`purchase_${type}`}
            className={classNames(
                'btn-purchase',
                {
                    'btn-purchase--disabled'       : (is_contract_mode || is_disabled) && !is_loading,
                    'btn-purchase--animated--slide': is_loading && !should_fade,
                    'btn-purchase--animated--fade' : is_loading && should_fade,
                    'btn-purchase--swoosh'         : is_purchased,
                })}
            onClick={() => {
                onClickPurchase(info.id, info.stake, type, index);
            }}
        >
            <React.Fragment>
                <div className='btn-purchase__info btn-purchase__info--left'>
                    <div className='btn-purchase__type-wrapper'>
                        <div className='btn-purchase__icon_wrapper'>
                            <Icon
                                icon='IconTradeType'
                                className='btn-purchase__icon'
                                type={getIconType()}
                            />
                        </div>
                        <div className='btn-purchase__text_wrapper'>
                            <span className='btn-purchase__text'>
                                {(!should_fade && is_loading) ? '' : localize('[_1]', getContractTypeDisplay(type, is_high_low))}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='btn-purchase__effect-detail' />
                <div className='btn-purchase__effect-detail--arrow' />
                <div className='btn-purchase__info btn-purchase__info--right'>
                    <div className='btn-purchase__text_wrapper'>
                        <span className='btn-purchase__text'>{!(is_loading || is_disabled) ? info.returns : ''}</span>
                    </div>
                </div>
            </React.Fragment>
        </Button>
    );
};

PurchaseButton.propTypes = {
    buy_info        : PropTypes.object,
    currency        : PropTypes.string,
    index           : PropTypes.number,
    info            : PropTypes.object,
    is_contract_mode: PropTypes.bool,
    is_disabled     : PropTypes.bool,
    is_high_low     : PropTypes.bool,
    is_loading      : PropTypes.bool,
    is_purchased_arr: PropTypes.array,
    onClickPurchase : PropTypes.func,
    type            : PropTypes.string,
};

export default PurchaseButton;
