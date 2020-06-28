import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Element } from "./Element";
import { Status } from "./Status";


@Entity('Element_Details')
export class ElementDetails {

    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne(type => Element, element => element.details, {onDelete: 'CASCADE'})
    public element!: Element;

    @ManyToOne(type => Status, status => status.id)
    public status_source!: Status;

    @ManyToOne(type => Status, status => status.id)
    public status_target!: Status;
}
