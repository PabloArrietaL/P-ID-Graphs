import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Element } from "./Element";
import { Process } from "./Process";

@Entity('Synchronous_Relations')
export class SynchronousRelation {

    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne(type => Process,  {onDelete: 'CASCADE'})
    public process!: Process;

    @ManyToOne(type => Element)
    public initial_controlled!: Element;

    @ManyToOne(type => Element)
    public end_controlled!: Element;

    @Column()
    public initial_event!: string;

    @Column()
    public end_event!: string;

}
