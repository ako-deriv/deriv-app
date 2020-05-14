import React from 'react';
import moment from 'moment';
import { Button } from '@deriv/components';
import { localize } from '@deriv/translations';

const getConnectedAppsColumnsTemplate = handleToggleModal => [
    { title: 'Name', col_index: 'name' },
    {
        title: 'Permission',
        col_index: 'scopes',
        renderCellContent: ({ cell_value }) => {
            return prepareConnectedAppsScopes(cell_value);
        },
    },
    {
        title: 'Last login',
        col_index: 'last_used',
        renderCellContent: ({ cell_value }) => prepareConnectedAppsLastLogin(cell_value),
    },
    {
        title: 'Action',
        col_index: 'app_id',
        renderCellContent: ({ cell_value }) => prepareConnectedAppsAction(cell_value, handleToggleModal),
    },
];

const prepareConnectedAppsAction = (app_id, handleToggleModal) => (
    <Button className='revoke_access' small secondary onClick={() => handleToggleModal(app_id)}>
        {localize('Revoke access')}
    </Button>
);

const prepareConnectedAppsLastLogin = las_used => (
    <p className='last_used_content'>{moment(las_used).format('YYYY-MM-DD HH:mm:ss')}</p>
);

const oauth_apps_list_map = {
    read: localize('Read'),
    trade: localize('Trade'),
    trading_information: localize('Trading Information'),
    payments: localize('Payments'),
    admin: localize('Admin'),
};

const prepareConnectedAppsScopes = permissions_list => {
    const is_trading_information = permissions_list.includes('trading_information');
    const oauth_apps_list = [];
    permissions_list.forEach((permision, index) => {
        if (permision !== 'trading_information') {
            if (permissions_list.length - 1 !== index) {
                oauth_apps_list.push(`${oauth_apps_list_map[permision]}, `);
            } else {
                oauth_apps_list.push(oauth_apps_list_map[permision]);
            }
        }
    });
    if (is_trading_information) {
        oauth_apps_list.push(`${oauth_apps_list.pop()}, `, `${oauth_apps_list_map.trading_information}`);
    }
    return <div>{oauth_apps_list}</div>;
};

export default getConnectedAppsColumnsTemplate;
