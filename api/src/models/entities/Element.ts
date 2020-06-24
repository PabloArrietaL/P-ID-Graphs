  
import { IElement} from "../interfaces/IElement";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity('Elements')
export class Element implements IElement {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column()
    public first_status!: string;

    @Column()
    public second_status!: string;

    @Column({nullable: true})
    public third_status!: string;

    @Column()
    public initial_condition!: string;

    @Column()
    public type!: string;

    @Column({nullable: true})
    public description!: string;

    @Column({nullable: true})
    public img!: string;

    @Column()
    public created_date!: Date;

}
