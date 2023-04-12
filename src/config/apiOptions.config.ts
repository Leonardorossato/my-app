import { VendureConfig } from "@vendure/core";

const IS_DEV = process.env.APP_ENV === 'dev';

export const apiOptionsConfig: VendureConfig['apiOptions'] = {
    port: process.env.APP_PORT,
        adminApiPath: 'admin-api',
        shopApiPath: 'shop-api',
        // The following options are useful in development mode,
        // but are best turned off for production for security
        // reasons.
        ...(IS_DEV ? {
            adminApiPlayground: {
                settings: { 'request.credentials': 'include' } as any,
            },
            adminApiDebug: true,
            shopApiPlayground: {
                settings: { 'request.credentials': 'include' } as any,
            },
            shopApiDebug: true,
        } : {}),
}

module.exports = apiOptionsConfig