import { AbstractEntity } from "@common/abstract.entity";
import { Entity } from "typeorm";


@Entity({name: 'banner'})
export class BannerEntity extends AbstractEntity {}