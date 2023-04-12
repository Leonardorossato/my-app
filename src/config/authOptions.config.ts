import { VendureConfig } from "@vendure/core";

export const authOptionsConfig: VendureConfig['authOptions'] ={
    tokenMethod: 'bearer',
    requireVerification: false,
    superadminCredentials: {
        identifier: process.env.SUPERADMIN_PASSWORD,
        password: process.env.SUPERADMIN_PASSWORD
    }
}

module.exports = authOptionsConfig;