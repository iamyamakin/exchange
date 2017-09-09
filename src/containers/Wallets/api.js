import request from './../../utils/request';

export const fetchWalletsApi = () => request('/wallets.json', {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});
