import { IRelation } from "../interfaces/IRelation";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from "typeorm";
import { Process } from "./Process";
import { Element } from "./Element";



@Entity('Relations')
export class Relation implements IRelation {

    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne(type => Process, process => process.relations)
    public process!: number;

    @OneToOne(type => Element)
    public element_source!: number;

    @OneToOne(type => Element)
    public element_target!: number;

    @Column({nullable: true})
    public description!: string;

}
