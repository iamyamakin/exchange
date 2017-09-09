const getWallets = (state) => {
    return state.get('wallets');
};

export const getWalletsData = (state) => {
    return getWallets(state).get('data');
};

export const getWalletsError = (state) => {
    return getWallets(state).get('error');
};

export const getWalletsIsLoading = (state) => {
    return getWallets(state).get('isLoading');
};
