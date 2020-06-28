import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Relation } from "./Relation";


@Entity('Processes')
export class Process {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({length: '45'})
    public name!: string;

    @Column({nullable: true})
    public description!: string;

    @OneToMany(type => Relation, relation => relation.process, {onDelete: 'CASCADE'})
    public relations!: Relation[]

    @Column({type: 'datetime'})
    public created_date!: Date;

}
