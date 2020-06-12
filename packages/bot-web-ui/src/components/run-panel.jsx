import { Money, Button, Drawer, Tabs, Popover } from '@deriv/components';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import { localize } from '@deriv/translations';
import Dialog from './dialog.jsx';
import Journal from './journal.jsx';
import Summary from './summary.jsx';
import Transactions from './transactions.jsx';
import { popover_zindex } from '../constants/z-indexes';
import { connect } from '../stores/connect';
import '../assets/sass/run-panel.scss';

const drawerContent = ({ active_index, setActiveTabIndex }) => {
    return (
        <Tabs active_index={active_index} onTabItemClick={setActiveTabIndex} top>
            <div id='db-run-panel-tab__summary' label={localize('Summary')}>
                <Summary />
            </div>
            <div id='db-run-panel-tab__transactions' label={localize('Transactions')}>
                <Transactions />
            </div>
            <div id='db-run-panel-tab__journal' label={localize('Journal')}>
                <Journal />
            </div>
        </Tabs>
    );
};

const StatisticsTile = props => (
    <div className='run-panel__tile'>
        <Popover
            className='run-panel__info'
            alignment={props.alignment}
            message={props.tooltip}
            zIndex={popover_zindex.SUMMARY_TOOLTIPS}
        >
            <div className='run-panel__tile-title'>{props.title}</div>
            <div className={classNames('run-panel__tile-content', props.contentClassName)}>{props.content}</div>
        </Popover>
    </div>
);

const drawerFooter = ({
    active_index,
    dialog_options,
    is_clear_stat_disabled,
    is_dialog_open,
    onCancelButtonClick,
    onClearStatClick,
    onOkButtonClick,
    total_stake,
    total_payout,
    number_of_runs,
    lost_contracts,
    won_contracts,
    total_profit,
    currency,
}) => {
    const is_journal_tab = active_index === 2;
    return (
        <div className='run-panel__footer'>
            {!is_journal_tab && (
                <div className='run-panel__stat'>
                    <StatisticsTile
                        title={localize('Total stake')}
                        alignment='top'
                        content={<Money amount={total_stake} currency={currency} />}
                        tooltip={localize(
                            'Total stake since you last cleared your stats. Refreshing the page will also clear your stats.'
                        )}
                    />
                    <StatisticsTile
                        title={localize('Total payout')}
                        alignment='top'
                        content={<Money amount={total_payout} currency={currency} />}
                        tooltip={localize(
                            'Total payout since you last cleared your stats. Refreshing the page will also clear your stats.'
                        )}
                    />
                    <StatisticsTile
                        title={localize('No. of runs')}
                        alignment='top'
                        content={number_of_runs}
                        tooltip={localize(
                            'The number of times your bot has run since you last cleared your stats. Each run includes the execution of all the root blocks. Refreshing the page will also clear your stats.'
                        )}
                    />
                    <StatisticsTile
                        title={localize('Contracts lost')}
                        alignment='bottom'
                        content={lost_contracts}
                        tooltip={localize(
                            'The number of contracts you have lost since you last cleared your stats. Refreshing the page will also clear your stats.'
                        )}
                    />
                    <StatisticsTile
                        title={localize('Contracts won')}
                        alignment='bottom'
                        content={won_contracts}
                        tooltip={localize(
                            'The number of contracts you have won since you last cleared your stats. Refreshing the page will also clear your stats.'
                        )}
                    />
                    <StatisticsTile
                        title={localize('Profit/Loss')}
                        content={<Money amount={total_profit} currency={currency} has_sign={true} />}
                        alignment='bottom'
                        contentClassName={classNames('run-panel__stat-amount', {
                            'run-panel__stat-amount--positive': total_profit > 0,
                            'run-panel__stat-amount--negative': total_profit < 0,
                        })}
                        tooltip={localize(
                            'Your total profit/loss since you last cleared your stats. It is the difference between your total payout and your total stake. Refreshing the page will also clear your stats.'
                        )}
                    />
                </div>
            )}
            <Button
                id='db-run-panel__clear-button'
                className='run-panel__footer-button'
                is_disabled={is_clear_stat_disabled}
                text={localize('Clear stat')}
                onClick={onClearStatClick}
                has_effect
                secondary
            />
            <Dialog
                title={dialog_options.title}
                is_open={is_dialog_open}
                onOkButtonClick={onOkButtonClick}
                onCancelButtonClick={onCancelButtonClick}
            >
                {dialog_options.message}
            </Dialog>
        </div>
    );
};

class RunPanel extends React.PureComponent {
    componentDidMount() {
        this.props.onMount();
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    render() {
        const { active_index, setActiveTabIndex } = this.props;
        const content = drawerContent({ active_index, setActiveTabIndex });
        const footer = drawerFooter({ ...this.props, active_index });

        return (
            <Drawer
                className='run-panel'
                is_open={this.props.is_drawer_open}
                toggleDrawer={this.props.toggleDrawer}
                contentClassName='run-panel__content'
                footer={footer}
            >
                {content}
            </Drawer>
        );
    }
}

RunPanel.propTypes = {
    active_index: PropTypes.number,
    dialog_options: PropTypes.object,
    is_clear_stat_disabled: PropTypes.bool,
    is_dialog_open: PropTypes.bool,
    is_drawer_open: PropTypes.bool,
    is_stop_button_disabled: PropTypes.bool,
    is_stop_button_visible: PropTypes.bool,
    onCancelButtonClick: PropTypes.func,
    onClearStatClick: PropTypes.func,
    onMount: PropTypes.func,
    onOkButtonClick: PropTypes.func,
    onRunButtonClick: PropTypes.func,
    onStopButtonClick: PropTypes.func,
    onUnmount: PropTypes.func,
    setActiveTabIndex: PropTypes.func,
    toggleDrawer: PropTypes.func,
    currency: PropTypes.string,
    lost_contracts: PropTypes.number,
    number_of_runs: PropTypes.number,
    total_payout: PropTypes.number,
    total_profit: PropTypes.number,
    total_stake: PropTypes.number,
    won_contracts: PropTypes.number,
};

export default connect(({ run_panel, core }) => ({
    active_index: run_panel.active_index,
    dialog_options: run_panel.dialog_options,
    is_clear_stat_disabled: run_panel.is_clear_stat_disabled,
    is_dialog_open: run_panel.is_dialog_open,
    is_drawer_open: run_panel.is_drawer_open,
    is_stop_button_disabled: run_panel.is_stop_button_disabled,
    is_stop_button_visible: run_panel.is_stop_button_visible,
    onCancelButtonClick: run_panel.onCancelButtonClick,
    onClearStatClick: run_panel.onClearStatClick,
    onMount: run_panel.onMount,
    onOkButtonClick: run_panel.onOkButtonClick,
    onRunButtonClick: run_panel.onRunButtonClick,
    onStopButtonClick: run_panel.onStopButtonClick,
    onUnmount: run_panel.onUnmount,
    setActiveTabIndex: run_panel.setActiveTabIndex,
    toggleDrawer: run_panel.toggleDrawer,
    currency: core.client.currency,
    lost_contracts: run_panel.state.lost_contracts,
    number_of_runs: run_panel.state.number_of_runs,
    total_payout: run_panel.state.total_payout,
    total_profit: run_panel.state.total_profit,
    total_stake: run_panel.state.total_stake,
    won_contracts: run_panel.state.won_contracts,
}))(RunPanel);
