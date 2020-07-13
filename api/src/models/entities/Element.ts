import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { ElementDetail } from "./Detail";
import { Status } from "./Status";

enum CONDITIONS {
    first_status = 'first_status',
    second_status = 'second_status',
    third_status = 'third_status'
}

enum TYPES {
    actuator = 'actuator',
    controlled = 'controlled'
}

@Entity('Elements')
export class Element {

    @PrimaryGeneratedColumn()
    public id!: number;

    @OneToOne(type => ElementDetail, {onDelete: 'CASCADE', nullable: true})
    @JoinColumn()
    public detail!: ElementDetail;

    @Column({length: '45'})
    public name!: string;

    @ManyToOne(type => Status, status => status.first)
    public first_status!: Status;

    @ManyToOne(type => Status, status => status.second)
    public second_status!: Status;

    @ManyToOne(type => Status, status => status.thid, {nullable: true})
    public third_status!: Status;

    @Column({type: 'enum', enum: CONDITIONS})
    public initial_condition!: string;

    @Column({type: 'enum', enum: TYPES})
    public type!: string;

    @Column({nullable: true})
    public description!: string;

    @Column({nullable: true})
    public img!: string;

    @Column({type: 'datetime'})
    public created_date!: Date;

}
