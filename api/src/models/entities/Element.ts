import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

enum CONDITIONS {
    first_status = 'first_status',
    second_status = 'second_status',
    third_status = 'third_status'
}

@Entity('Elements')
export class Element {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({length: '45'})
    public name!: string;

    @Column({length: '45'})
    public first_status!: string;

    @Column({length: '45'})
    public second_status!: string;

    @Column({nullable: true, length: '45'})
    public third_status!: string;

    @Column({type: 'enum', enum: CONDITIONS})
    public initial_condition!: string;

    @Column({length: '15'})
    public type!: string;

    @Column({nullable: true})
    public description!: string;

    @Column({nullable: true})
    public img!: string;

    @Column({type: 'datetime'})
    public created_date!: Date;

}
