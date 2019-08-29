import classNames   from 'classnames';
import PropTypes    from 'prop-types';
import React        from 'react';
import { Button }   from 'deriv-components';
import { localize } from 'App/i18n';
import Lazy         from 'App/Containers/Lazy';
import { Modal }    from 'App/Components/Elements/modal.jsx';
import UILoader     from '../../Elements/ui-loader.jsx';

const WalletInformation = React.lazy(() => import(/* webpackChunkName: "wallet-information" */'Modules/Reports/Containers/wallet-information.jsx'));

const Deposit      = () => import('App/Containers/CashierModal/deposit.jsx');
const Withdrawal   = () => import('App/Containers/CashierModal/withdrawal.jsx');
const PaymentAgent = () => import('App/Containers/CashierModal/payment-agent.jsx');

class ToggleCashier extends React.PureComponent {
    onClickDeposit = () => { this.props.toggleCashier('deposit'); };

    render() {
        const {
            active_tab,
            className,
            disableApp,
            enableApp,
            is_cashier_visible,
            is_payment_agent_visible,
            toggleCashier,
        } = this.props;

        const modal_content = [
            {
                container: 'deposit',
                icon     : 'IconDepositSmall',
                label    : localize('Deposit'),
                // eslint-disable-next-line react/display-name
                value    : () => (
                    <Lazy
                        ctor={Deposit}
                        should_load={true}
                        has_progress={true}
                    />
                ),
            }, {
                container: 'withdraw',
                icon     : 'IconWithdrawalSmall',
                label    : localize('Withdrawal'),
                // eslint-disable-next-line react/display-name
                value    : () => (
                    <Lazy
                        ctor={Withdrawal}
                        should_load={true}
                        has_progress={true}
                    />
                ),
            }, {
                container   : 'payment_agent',
                icon        : 'IconPaymentAgent',
                is_invisible: !is_payment_agent_visible,
                label       : localize('Payment agent'),
                // eslint-disable-next-line react/display-name
                value       : () => (
                    <Lazy
                        ctor={PaymentAgent}
                        should_load={true}
                        has_progress={true}
                    />
                ),
            },
        ];

        const selected_tab = modal_content.find(tab => tab.container === active_tab) || {};

        return (
            <React.Fragment>
                <Button
                    className={classNames(className, 'btn--primary btn--primary--orange')}
                    has_effect
                    text={localize('Deposit')}
                    onClick={this.onClickDeposit}
                />
                <React.Suspense fallback={<UILoader />}>
                    <Modal
                        className='cashier'
                        disableApp={disableApp}
                        enableApp={enableApp}
                        modal_content={modal_content}
                        header={<WalletInformation />}
                        is_open={is_cashier_visible}
                        selected_index={modal_content.indexOf(selected_tab)}
                        title={localize('Cashier')}
                        toggleModal={toggleCashier}
                    />
                </React.Suspense>
            </React.Fragment>
        );
    }
}

ToggleCashier.propTypes = {
    active_tab              : PropTypes.string,
    className               : PropTypes.string,
    disableApp              : PropTypes.func,
    enableApp               : PropTypes.func,
    is_open                 : PropTypes.bool,
    is_payment_agent_visible: PropTypes.bool,
    toggleModal             : PropTypes.func,
};

export default ToggleCashier;
