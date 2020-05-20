import PropTypes from 'prop-types';
import React from 'react';
import { Button, Icon } from '@deriv/components';
import { localize } from '@deriv/translations';

const IncrementButtons = ({
    decrementValue,
    id,
    incrementValue,
    max_is_disabled,
    min_is_disabled,
    is_incrementable_on_long_press,
}) => {
    const ref_interval = React.useRef();
    const ref_timeout = React.useRef();

    const handleButtonPress = onChange => ev => {
        ref_timeout.current = setTimeout(() => {
            let step = 1;
            onChange(ev, step);
            ref_interval.current = setInterval(() => {
                onChange(ev, ++step);
            }, 50);
        }, 300);
    };

    const handleButtonRelease = () => {
        clearInterval(ref_interval.current);
        clearTimeout(ref_timeout.current);
    };

    const getPressEvents = onChange => {
        if (!is_incrementable_on_long_press) return {};
        return {
            onContextMenu: e => e.preventDefault(),
            onTouchStart: handleButtonPress(onChange),
            onTouchEnd: handleButtonRelease,
            onMouseDown: handleButtonPress(onChange),
            onMouseUp: handleButtonRelease,
            onMouseLeave: handleButtonRelease,
        };
    };

    return (
        <React.Fragment>
            <Button
                id={`${id}_add`}
                className={'input-wrapper__button input-wrapper__button--increment'}
                is_disabled={max_is_disabled}
                onClick={incrementValue}
                tabIndex='-1'
                aria-label={localize('Increment value')}
                {...getPressEvents(incrementValue)}
            >
                <Icon
                    icon='IcAdd'
                    className={'input-wrapper__icon input-wrapper__icon--plus'}
                    color={max_is_disabled ? 'disabled' : undefined}
                />
            </Button>
            <Button
                id={`${id}_sub`}
                className={'input-wrapper__button input-wrapper__button--decrement'}
                is_disabled={min_is_disabled}
                onClick={decrementValue}
                tabIndex='-1'
                aria-label={localize('Decrement value')}
                {...getPressEvents(decrementValue)}
            >
                <Icon
                    icon='IcMinus'
                    className={'input-wrapper__icon input-wrapper__icon--minus'}
                    color={min_is_disabled ? 'disabled' : undefined}
                />
            </Button>
        </React.Fragment>
    );
};

IncrementButtons.propTypes = {
    decrementValue: PropTypes.func,
    id: PropTypes.string,
    incrementValue: PropTypes.func,
    max_is_disabled: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    min_is_disabled: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

export default IncrementButtons;
