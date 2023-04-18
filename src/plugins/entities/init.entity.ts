import { VendureEntity } from "@vendure/core";
import { Entity, Column, PrimaryColumn } from "typeorm";
import { DeepPartial } from "@vendure/common/lib/shared-types";

@Entity()
export class InitEntity extends VendureEntity {
  constructor(input?: DeepPartial<InitEntity>) {
    super(input);
  }

  @PrimaryColumn()
  code: Number;

  @Column()
  uf: String;

  @Column()
  name: String;
}

