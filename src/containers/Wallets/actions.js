import {
    FETCH_WALLETS,
    FETCH_WALLETS_SUCCESS,
    FETCH_WALLETS_FAILURE,
    RESET_WALLETS
} from './constants';

export const fetchWallets = (data) => {
    return {
        type: FETCH_WALLETS,
        data
    };
};

export const fetchWalletsSuccess = (data) => {
    return {
        type: FETCH_WALLETS_SUCCESS,
        data
    };
};

export const fetchWalletsFailure = (error) => {
    return {
        type: FETCH_WALLETS_FAILURE,
        error
    };
};

export const resetWallets = () => {
    return {
        type: RESET_WALLETS
    };
};

