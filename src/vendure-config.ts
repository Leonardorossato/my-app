import 'dotenv/config'
import { VendureConfig } from "@vendure/core";
import { apiOptionsConfig } from "./config/apiOptions.config";
import { dbConnectionOptions } from "./config/dbConnection.config";
import { paymentConfig } from "./config/payments.config";
import { pluginsOptionsConfig } from "./config/plugins.config";
import { authOptionsConfig } from './config/authOptions.config';

export const config: VendureConfig= {
    apiOptions: apiOptionsConfig,
    authOptions: authOptionsConfig,
    dbConnectionOptions: dbConnectionOptions,
    paymentOptions: paymentConfig,
    customFields: {},
    plugins: pluginsOptionsConfig
}