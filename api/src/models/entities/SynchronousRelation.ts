import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Element } from "./Element";
import { Process } from "./Process";

enum EVENTS {
    PtoA = 'PtoA',
    AtoP = 'AtoP',
    EtoF = 'EtoF',
    FtoE = 'FtoE'
}


@Entity('Synchronous_Relations')
export class SynchronousRelation {

    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne(type => Process)
    public process!: Process;

    @ManyToOne(type => Element)
    public initial_controlled!: Element;

    @ManyToOne(type => Element)
    public end_controlled!: Element;

    @Column({type: 'enum', enum: EVENTS})
    public event!: string;

}
