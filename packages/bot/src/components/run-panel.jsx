import { Button, Drawer, Tabs }               from 'deriv-components';
import classNames                             from 'classnames';
import PropTypes                              from 'prop-types';
import React                                  from 'react';
import Dialog                                 from './dialog.jsx';
import { InfoOutlineIcon, RunIcon, StopIcon } from './Icons.jsx';
import Journal                                from './journal.jsx';
import { connect }                            from '../stores/connect';
import { translate }                          from '../utils/tools';
import '../assets/sass/run-panel.scss';

const drawerContent = () => {
    return (
        <Tabs>
            <div label={translate('Summary')} />
            <div label={translate('Transactions')} />
            <div label={translate('Journal')}>
                <Journal />
            </div>
        </Tabs>
    );
};

const drawerFooter = ({
    closeModal,
    is_dialog_visible,
    is_running,
    is_run_button_clicked,
    onClearStatClick,
    onRunButtonClick,
    onStopButtonClick,
}) => {
    return (
        <div className='run-panel__footer'>
            <Button
                className={classNames(
                    'btn--flat',
                    'run-panel__button'
                )}
                text={translate('Clear stat')}
                onClick={onClearStatClick}
                has_effect
            />

            {
                (is_run_button_clicked || is_running) ?
                    <Button
                        className={classNames(
                            'btn--primary',
                            'run-panel__button',
                            { 'run-panel__button--disable': !is_run_button_clicked }
                        )}
                        text={translate('Stop bot')}
                        icon={<StopIcon />}
                        onClick={onStopButtonClick}
                        has_effect
                    /> :
                    <Button
                        className={classNames(
                            'btn--primary',
                            'run-panel__button',
                            'run-panel__button--run'
                        )}
                        text={translate('Run bot')}
                        icon={<RunIcon />}
                        onClick={onRunButtonClick}
                        has_effect
                    />
            }

            <Dialog
                title={translate('Run Error!')}
                is_open={is_dialog_visible}
                closeModal={closeModal}
            >
                {translate('Please log in.')}
            </Dialog>
            <InfoOutlineIcon className='run-panel__icon-info' />
        </div>
    );
};

class RunPanel extends React.PureComponent {
    componentWillUnmount() {
        this.props.onUnmount();
    }

    render() {
        const content = drawerContent();
        const footer = drawerFooter(this.props);

        return (
            <Drawer
                className='run-panel'
                is_open={true}
                footer={footer}
            >
                {content}
            </Drawer>
        );
    }
}

RunPanel.propTypes = {
    closeModal           : PropTypes.func,
    is_dialog_visible    : PropTypes.bool,
    is_run_button_clicked: PropTypes.bool,
    is_running           : PropTypes.bool,
    onClearStatClick     : PropTypes.func,
    onRunButtonClick     : PropTypes.func,
    onStopButtonClick    : PropTypes.func,
    onUnmount            : PropTypes.func,
};

export default connect(({ runPanel }) => ({
    closeModal           : runPanel.closeModal,
    is_dialog_visible    : runPanel.is_dialog_visible,
    is_running           : runPanel.is_running,
    is_run_button_clicked: runPanel.is_run_button_clicked,
    onClearStatClick     : runPanel.onClearStatClick,
    onRunButtonClick     : runPanel.onRunButtonClick,
    onStopButtonClick    : runPanel.onStopButtonClick,
    onUnmount            : runPanel.onUnmount,
}))(RunPanel);
