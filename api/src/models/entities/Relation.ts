import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Process } from "./Process";
import { Element } from "./Element";


@Entity('Relations')
export class Relation {

    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne(type => Process, process => process.relations, {onDelete: 'CASCADE'})
    @JoinColumn()
    public process!: Process;

    @ManyToOne(type => Element)
    @JoinColumn()
    public element_source!: Element;

    @ManyToOne(type => Element)
    @JoinColumn()
    public element_target!: Element;

    @Column({nullable: true})
    public description!: string;

}
