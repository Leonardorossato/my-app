import { PluginCommonModule, VendurePlugin } from "@vendure/core";
import { Customer } from "../entities/customer.entity";
import { OnApplicationBootstrap } from "@nestjs/common";
@VendurePlugin({
    entities: [Customer],
    imports: [PluginCommonModule],
    providers: []
})

export class SynchronizationPlugin implements OnApplicationBootstrap {
    constructor() {}
  
    async onApplicationBootstrap() {
    }
}
  