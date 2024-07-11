import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

@Entity()
export class Criterion {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({nullable: true, type: 'longtext'})
    occupation: string

    @Column({nullable: true, type: 'longtext'})
    user_type: string

    @Column({nullable: true, type: 'longtext'})
    values: string
}
