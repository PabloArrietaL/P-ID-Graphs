import { Entity, PrimaryGeneratedColumn, OneToOne, Column } from "typeorm";
import { Element } from "./Element";


@Entity('Element_Details')
export class ElementDetail {

    @PrimaryGeneratedColumn()
    public id!: number;

    @OneToOne(type => Element, element => element.detail, {onDelete: 'CASCADE'})
    public element!: Element;

    @Column({type: 'json'})
    public first_status!: object;

    @Column({type: 'json'})
    public second_status!: object;

    @Column({type: 'json', nullable: true})
    public third_status!: object;

}
