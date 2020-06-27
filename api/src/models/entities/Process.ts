import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable } from "typeorm";
import { Relation } from "./Relation";
import { type } from "os";


@Entity('Processes')
export class Process {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({length: '45'})
    public name!: string;

    @Column({nullable: true})
    public description!: string;

    @OneToMany(type => Relation, relation => relation.process, {onDelete: 'CASCADE'})
    @JoinTable()
    public relations!: Relation[]

    @Column({type: 'datetime'})
    public created_date!: Date;

}
