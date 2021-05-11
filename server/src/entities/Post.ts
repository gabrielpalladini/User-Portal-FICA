import { Field, ObjectType, Int } from "type-graphql";
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm';

@ObjectType()
@Entity()
export class Post {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @CreateDateColumn({type: "date"})
    createdAt = new Date();

    @Field(() => String)
    @Column({type: "date", onUpdate: () => new Date()})
    updatedAt = new Date();

    @Field()
    @Column({type: "text"})
    title!: string;
}