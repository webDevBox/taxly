import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'professions',synchronize: false})

export class Profession {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    occupation_id:number
    
    @Column()
    name: string
}
