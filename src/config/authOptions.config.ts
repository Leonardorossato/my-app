import { NativeAuthenticationStrategy, VendureConfig } from "@vendure/core";

export const authOptionsConfig: VendureConfig['authOptions'] ={
    tokenMethod: "bearer",
    requireVerification: false,
    superadminCredentials: {
        identifier: process.env.SUPERADMIN_USERNAME || "",
        password: process.env.SUPERADMIN_PASSWORD || ""
    },
    shopAuthenticationStrategy: [
        new NativeAuthenticationStrategy()
    ]
    
}
