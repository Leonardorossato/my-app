import { VendureConfig, dummyPaymentHandler } from "@vendure/core";

export const paymentConfig : VendureConfig['paymentOptions'] = {
    paymentMethodHandlers: [dummyPaymentHandler]
}
