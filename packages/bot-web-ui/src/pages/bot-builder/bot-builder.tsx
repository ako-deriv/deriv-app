import React from 'react';
import classNames from 'classnames';
import { Analytics } from '@deriv/analytics'; //BotTAction will add ones that PR gets merged
import { observer, useStore } from '@deriv/stores';
import { Localize } from '@deriv/translations';
import BotSnackbar from 'Components/bot-snackbar';
import { DBOT_TABS } from 'Constants/bot-contents';
import LoadModal from '../../components/load-modal';
import { useDBotStore } from '../../stores/useDBotStore';
import SaveModal from '../dashboard/load-bot-preview/save-modal';
import BotBuilderTourHandler from '../tutorials/dbot-tours/bot-builder-tour';
import QuickStrategy1 from './quick-strategy';
import WorkspaceWrapper from './workspace-wrapper';

const BotBuilder = observer(() => {
    const { ui } = useStore();
    const { dashboard, app, run_panel, toolbar, quick_strategy } = useDBotStore();
    const { active_tab, active_tour, is_preview_on_popup } = dashboard;
    const { is_open } = quick_strategy;
    const { is_running } = run_panel;
    const is_blockly_listener_registered = React.useRef(false);
    const [show_snackbar, setShowSnackbar] = React.useState(false);
    const { is_mobile } = ui;
    const { onMount, onUnmount } = app;
    const el_ref = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        const is_bot_builder = active_tab === DBOT_TABS.BOT_BUILDER;
        if (is_bot_builder) {
            Analytics.trackEvent('ce_bot_builder_form', {
                action: 'open',
                form_source: 'ce_bot_builder_form',
            });
        }
        return () => {
            if (is_bot_builder) {
                Analytics.trackEvent('ce_bot_builder_form', {
                    action: 'close',
                    form_source: 'ce_bot_builder_form',
                });
            }
        };
    }, [active_tab]);

    React.useEffect(() => {
        onMount();
        return () => onUnmount();
    }, [onMount, onUnmount]);

    React.useEffect(() => {
        const workspace = window.Blockly?.derivWorkspace;
        if (workspace && is_running && !is_blockly_listener_registered.current) {
            is_blockly_listener_registered.current = true;
            workspace.addChangeListener(handleBlockChangeOnBotRun);
        } else {
            setShowSnackbar(false);
            removeBlockChangeListener();
        }

        return () => {
            if (workspace && is_blockly_listener_registered.current) {
                removeBlockChangeListener();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [is_running]);

    const handleBlockChangeOnBotRun = (e: Event) => {
        const { is_reset_button_clicked, setResetButtonState } = toolbar;
        if (e.type !== 'ui' && !is_reset_button_clicked) {
            setShowSnackbar(true);
            removeBlockChangeListener();
        } else if (is_reset_button_clicked) {
            setResetButtonState(false);
            removeBlockChangeListener();
        }
    };

    const removeBlockChangeListener = () => {
        is_blockly_listener_registered.current = false;
        window.Blockly?.derivWorkspace?.removeChangeListener(handleBlockChangeOnBotRun);
    };

    return (
        <>
            <BotSnackbar
                is_open={show_snackbar}
                message={<Localize i18n_default_text='Changes you make will not affect your running bot.' />}
                handleClose={() => setShowSnackbar(false)}
            />
            <div
                className={classNames('bot-builder', {
                    'bot-builder--active': active_tab === 1 && !is_preview_on_popup,
                    'bot-builder--inactive': is_preview_on_popup,
                    'bot-builder--tour-active': active_tour,
                })}
            >
                {is_preview_on_popup ? null : (
                    <div id='scratch_div' ref={el_ref}>
                        <WorkspaceWrapper />
                    </div>
                )}
            </div>
            {active_tab === 1 && <BotBuilderTourHandler is_mobile={is_mobile} />}
            {/* removed this outside from toolbar becuase it needs to loaded seperately without dependency */}
            <LoadModal />
            <SaveModal />
            {is_open && <QuickStrategy1 />}
        </>
    );
});

export default BotBuilder;
