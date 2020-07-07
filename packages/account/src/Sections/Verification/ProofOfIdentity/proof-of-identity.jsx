import React from 'react';
import { withRouter } from 'react-router-dom';
import { AutoHeightWrapper, Button } from '@deriv/components';
import { localize } from '@deriv/translations';
import { routes, getPlatformRedirect } from '@deriv/shared';
import { connect } from 'Stores/connect';
import { WS } from 'Services/ws-methods';
import DemoMessage from 'Components/demo-message';
import MissingPersonalDetails from 'Components/poi-missing-personal-details';
import ProofOfIdentityContainer from './proof-of-identity-container.jsx';

class ProofOfIdentity extends React.Component {
    redirectText = (from_platform) => {
        switch (from_platform) {
            case 'P2P':
                return localize('Back To P2P');
            default:
                return localize('Back');
        }
    };

    routeBackTo = (redirect_route) => {
        this.props.routeBackInApp(this.props.history, [redirect_route]);
    };

    render() {
        const from_platform = getPlatformRedirect(this.props.app_routing_history);
        const should_show_redirect_btn = from_platform.name === 'P2P';

        if (this.props.is_virtual) return <DemoMessage />;
        if (this.props.has_missing_required_field) return <MissingPersonalDetails />;

        return (
            <AutoHeightWrapper default_height={200}>
                {({ setRef, height }) => (
                    <div ref={setRef} className='proof-of-identity'>
                        <ProofOfIdentityContainer
                            serviceToken={WS.serviceToken}
                            notificationEvent={WS.notificationEvent}
                            getAccountStatus={WS.authorized.getAccountStatus}
                            addNotificationByKey={this.props.addNotificationByKey}
                            removeNotificationByKey={this.props.removeNotificationByKey}
                            removeNotificationMessage={this.props.removeNotificationMessage}
                            refreshNotifications={this.props.refreshNotifications}
                            height={height}
                            redirectButton={
                                should_show_redirect_btn && (
                                    <Button primary onClick={() => this.routeBackTo(from_platform.route)}>
                                        {this.redirectText(from_platform.name)}
                                    </Button>
                                )
                            }
                        />
                    </div>
                )}
            </AutoHeightWrapper>
        );
    }
}

export default connect(({ client, ui, common }) => ({
    has_missing_required_field: client.has_missing_required_field,
    is_virtual: client.is_virtual,
    refreshNotifications: client.refreshNotifications,
    addNotificationByKey: ui.addNotificationMessageByKey,
    removeNotificationByKey: ui.removeNotificationByKey,
    removeNotificationMessage: ui.removeNotificationMessage,
    routeBackInApp: common.routeBackInApp,
    app_routing_history: common.app_routing_history,
}))(withRouter(ProofOfIdentity));
