import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Element } from "./Element";
import { Status } from "./Status";
import { Process } from "./Process";

@Entity('Permissive_Relations')
export class PermissiveRelation {

    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne(type => Process,  {onDelete: 'CASCADE'})
    public process!: Process;

    @ManyToOne(type => Element)
    public actuator!: Element;

    @ManyToOne(type => Element)
    public controlled!: Element;

    @ManyToOne(type => Status)
    public status!: Status;

    @Column()
    public event!: string;

}
