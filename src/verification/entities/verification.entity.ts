import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Verification {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    verification_code: string
}
