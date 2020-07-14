import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Element } from "./Element";

@Entity('Statuses')
export class Status {

    @PrimaryGeneratedColumn()
    public id!: number;

    @OneToMany(type => Element, element => element.first_status)
    public first!: Element;

    @OneToMany(type => Element, element => element.second_status)
    public second!: Element;

    @OneToMany(type => Element, element => element.third_status)
    public thid!: Element;

    @Column({length: '45', unique: true})
    public name!: string;

    @Column({nullable: true})
    public description!: string;

}
