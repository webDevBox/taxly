import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'occupations',synchronize: false})
export class Occupation {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}
