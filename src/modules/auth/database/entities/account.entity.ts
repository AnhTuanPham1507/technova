

import { AbstractEntity } from "@common/abstract.entity";
import { ReactEntity } from "@modules/news/database/entities/react.entity";
import { CommentEntity } from "@modules/products/database/entities/comment.entity";
import { ReviewEntity } from "@modules/products/database/entities/review.entity";
import { AdminEntity } from "@modules/users/database/entities/admin.entity";
import { EmployeeEntity } from "@modules/users/database/entities/employee.entity";
import { UserEntity } from "@modules/users/database/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { RoleEntity } from "./role.entity";


@Entity({name: 'account'})
export class AccountEntity extends AbstractEntity {
    @Column({
        name: 'username',
        length: 50,
        unique: true
    })
    username: string;

    @Column({
        name: 'password',
    })
    password: string;

    @ManyToOne(
        () => RoleEntity,
        (role) => role.accounts
    )
    @JoinColumn({name: 'role_id'})
    role: RoleEntity;

    @OneToMany(
        () => ReactEntity,
        (react) => react.author
    )
    reacts: ReactEntity[];

    @OneToMany(
        () => CommentEntity,
        (comment) => comment.author
    )
    comments: CommentEntity[];

    @OneToMany(
        () => ReviewEntity,
        (review) => review.author
    )
    reviews: ReviewEntity[];

    @OneToOne(
        () => UserEntity,
        (user) => user.account
    )
    user: UserEntity;

    @OneToOne(
        () => AdminEntity,
        (admin) => admin.account
    )
    admin: AdminEntity;

    @OneToOne(
        () => EmployeeEntity,
        (employee) => employee.account
    )
    employee: AdminEntity;
}