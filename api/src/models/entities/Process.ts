import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ProcessDetail } from "./ProcessDetail";


@Entity('Processes')
export class Process {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({length: '45'})
    public name!: string;

    @Column({nullable: true})
    public description!: string;

    @OneToMany(type => ProcessDetail, detail => detail.process, {onDelete: 'CASCADE'})
    public details!: ProcessDetail[]

    @Column({type: 'datetime'})
    public created_date!: Date;

}
