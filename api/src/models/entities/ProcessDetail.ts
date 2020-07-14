import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Process } from "./Process";
import { Element } from "./Element";


@Entity('Process_Details')
export class ProcessDetail {

    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne(type => Process, process => process.details, {onDelete: 'CASCADE'})
    public process!: Process;

    @ManyToOne(type => Element, element => element.process_detail )
    public element!: Element;

}
