import { PluginCommonModule, VendurePlugin } from "@vendure/core";
import { OnApplicationBootstrap } from "@nestjs/common";
import { InitEntity } from "../entities/init.entity";
@VendurePlugin({
    entities: [InitEntity],
    imports: [PluginCommonModule],
    providers: []
})

export class SynchronizationPlugin implements OnApplicationBootstrap {
    constructor() {}
  
    async onApplicationBootstrap() {
    }
}
  