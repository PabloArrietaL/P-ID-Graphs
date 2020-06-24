import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable } from "typeorm";
import { Relation } from "./Relation";


@Entity('Processes')
export class Process {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column({nullable: true})
    public description!: string;

    @OneToMany(type => Relation, relation => relation.process, {onDelete: 'CASCADE'})
    @JoinTable()
    public relations!: Relation[]

    @Column()
    public created_date!: Date;

}
