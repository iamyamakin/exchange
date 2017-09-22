import { findIndexOfWalletByCurrency } from './find';

const module = (x, y) => {
    return (x % y + y) % y;
};

export const getNextWallet = (wallets, currency) => {
    const index = findIndexOfWalletByCurrency(wallets, currency);

    return wallets.get(module(index + 1, wallets.size));
};

export const getPreviousWallet = (wallets, currency) => {
    const index = findIndexOfWalletByCurrency(wallets, currency);

    return wallets.get(module(index - 1, wallets.size));
};
