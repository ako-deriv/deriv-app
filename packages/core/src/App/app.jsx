import PropTypes from 'prop-types';
import React from 'react';
import BinarySocket from '_common/base/socket_base';
import { autorun } from 'mobx';
import Cookies from 'js-cookie';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// Initialize i18n by importing it here
// eslint-disable-next-line no-unused-vars
import { DesktopWrapper } from '@deriv/components';
import { setUrlLanguage } from '@deriv/shared/utils/url';
import { isMobile } from '@deriv/shared/utils/screen';
import { initializeTranslations, getLanguage } from '@deriv/translations';
import Client from '_common/base/client_base';
import WS from 'Services/ws-methods';
import { MobxProvider } from 'Stores/connect';
import SmartTraderIFrame from 'Modules/SmartTraderIFrame';
import ErrorBoundary from './Components/Elements/Errors/error-boundary.jsx';
import CookieBanner from './Components/Elements/CookieBanner/cookie-banner.jsx';
import AppContents from './Containers/Layout/app-contents.jsx';
import Footer from './Containers/Layout/footer.jsx';
import Header from './Containers/Layout/header.jsx';
import AppNotificationMessages from './Containers/app-notification-messages.jsx';
import AppModals from './Containers/Modals';
import Routes from './Containers/Routes/routes.jsx';
// eslint-disable-next-line import/extensions
import initStore from './app.js';
// eslint-disable-next-line import/no-unresolved
import 'Sass/app.scss';

const eu_countries = [
    'it',
    'de',
    'fr',
    'lu',
    'gr',
    'mf',
    'es',
    'sk',
    'lt',
    'nl',
    'at',
    'bg',
    'si',
    'cy',
    'be',
    'ro',
    'hr',
    'pt',
    'pl',
    'lv',
    'ee',
    'cz',
    'fi',
    'hu',
    'dk',
    'se',
    'ie',
    'im',
    'gb',
];

const isEuCountry = clients_country => eu_countries.includes(clients_country);

const App = ({ root_store }) => {
    // state
    const [show_cookie_banner, setShowCookieBanner] = React.useState(false);
    // non-state vars
    const l = window.location;
    const base = l.pathname.split('/')[1];
    const has_base = /^\/(br_)/.test(l.pathname);
    const url_params = new URLSearchParams(l.search);

    React.useEffect(() => {
        initializeTranslations();
        setUrlLanguage(getLanguage());
    }, []);

    React.useEffect(() =>
        autorun(async () => {
            let clients_country = Cookies.get('clients_country');
            if (!clients_country) {
                const website_status = await BinarySocket.wait('website_status');
                clients_country = website_status.website_status.clients_country;
                Cookies.set('clients_country', clients_country, {
                    expires: 7,
                });
            }
            setShowCookieBanner(
                !root_store.client.loginid &&
                    isEuCountry(clients_country) &&
                    !(Cookies.get('has_cookie_accepted') === '1')
            );
        })
    );

    if (isMobile()) {
        React.useEffect(() => {
            const el_landscape_blocker = document.getElementById('landscape_blocker');

            const onFocus = () => {
                /* Prevent from showing Landscape blocker UI when keyboard is visible */
                el_landscape_blocker.classList.add('landscape-blocker--keyboard-visible');
                root_store.ui.setIsNativepickerVisible(true);
            };

            const onFocusOut = e => {
                if (e.target.classList.contains('dc-dropdown__display')) {
                    // if the next target is a dropdown, keep native picker open
                    return;
                }
                root_store.ui.setIsNativepickerVisible(false);
            };

            const onTouchStart = () => {
                if (document.activeElement.tagName !== 'INPUT') {
                    el_landscape_blocker.classList.remove('landscape-blocker--keyboard-visible');
                }
            };
            /**
             * Adding `focus` and `focusout` event listeners to document here to detect for on-screen keyboard on mobile browsers
             * and storing this value in UI-store to be used across the app stores.
             *  - when document gets `focus` event - keyboard is visible
             *  - when document gets `focusout` or `touchstart` event - keyboard is hidden
             *  - note: the `touchstart` event comes after `focusout` and and we want to
             *          remove `landscape-blocker--keyboard-visible` class as late as possible
             * [TODO]: find an alternative solution to detect for on-screen keyboard
             */
            document.addEventListener('focus', onFocus, true);
            document.addEventListener('focusout', onFocusOut, false);
            document.addEventListener('touchstart', onTouchStart, true);

            // componentWillUnmount lifecycle
            return () => {
                document.removeEventListener('focus', onFocus);
                document.removeEventListener('focusout', onFocusOut);
                document.removeEventListener('touchstart', onTouchStart);
            };
        }, []);
    }

    const platform_passthrough = {
        root_store,
        WS,
        client_base: Client,
    };
    // handle accept cookies
    const onAccept = async () => {
        Cookies.set('has_cookie_accepted', 1);
        setShowCookieBanner(false);
    };

    return (
        <Router basename={has_base ? `/${base}` : null}>
            <MobxProvider store={root_store}>
                <React.Fragment>
                    <Header />
                    <ErrorBoundary>
                        <AppContents>
                            {/* TODO: [trader-remove-client-base] */}
                            <Routes passthrough={platform_passthrough} />
                        </AppContents>
                    </ErrorBoundary>
                    <DesktopWrapper>
                        {show_cookie_banner && <CookieBanner onAccept={onAccept} is_open={show_cookie_banner} />}
                        <Footer />
                    </DesktopWrapper>
                    <AppModals url_action_param={url_params.get('action')} />
                    <SmartTraderIFrame />
                </React.Fragment>
            </MobxProvider>
        </Router>
    );
};

App.propTypes = {
    root_store: PropTypes.object,
};

export default App;

const root_store = initStore(AppNotificationMessages);

const wrapper = document.getElementById('deriv_app');
// eslint-disable-next-line no-unused-expressions
wrapper ? ReactDOM.render(<App root_store={root_store} />, wrapper) : false;
