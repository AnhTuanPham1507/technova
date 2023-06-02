import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Abstract Entity
 *
 * @description This class is an abstract class for all entities.
 * It's experimental and recommended using it only in microservice architecture,
 * otherwise just delete and use your own entity.
 */
export interface IAbstractEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  createdBy: string;
  updatedBy: string;
  deletedBy?: string;
}

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    name: 'created_at',
  })
  createdAt: Date;

  // updatedAt iso8601 date time string
  @UpdateDateColumn({
    type: 'timestamp with time zone',
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt?: Date;

  @Column({
    name: 'created_by'
  })
  createdBy: string;

  @Column({
    name: 'updated_by'
  })
  updatedBy: string;

  @Column({
    name: 'deleted_by',
    nullable: true
  })
  deletedBy?: string;
}
