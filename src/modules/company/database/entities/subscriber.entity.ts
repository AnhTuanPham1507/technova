import { AbstractEntity } from "@common/abstract.entity";
import { IsEmail } from "class-validator";
import { Column, Entity } from "typeorm";


@Entity({name: 'subscriber'})
export class SubscriberEntity extends AbstractEntity {

    @Column({
        length: 50
    })
    @IsEmail()
    email: string;
}