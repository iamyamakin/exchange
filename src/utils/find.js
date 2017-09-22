export const findIndexOfWalletByCurrency = (wallets, currency) => {
    return wallets.findIndex((wallet) => {
        const walletCurrency = wallet.get('currency');

        if (typeof walletCurrency === 'string') {
            return walletCurrency.toLowerCase() === (currency).toLowerCase();
        }

        return false;
    });
};

export const findAmountWalletByCurrency = (wallets, currency) => {
    const defaultValue = 0;

    if (wallets.isEmpty() || !currency) {
        return defaultValue;
    }

    const findedWallet = wallets.find((wallet) => {
        const walletCurrency = wallet.get('currency');

        if (typeof walletCurrency === 'string') {
            return walletCurrency.toLowerCase() === (currency).toLowerCase();
        }

        return false;
    })

    if (findedWallet && !findedWallet.isEmpty()) {
        return Number(findedWallet.get('amount').toFixed(2));
    }

    return defaultValue;
};
