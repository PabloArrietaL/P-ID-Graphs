  
import { IProcess } from "../interfaces/IProcess";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Relation } from "./Relation";


@Entity('Processes')
export class Process implements IProcess {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column({nullable: true})
    public description!: string;

    @OneToMany(type => Relation, relation => relation.process, {cascade: true})
    public relations!: Array<Relation>

    @Column()
    public created_date!: Date;

}
