import { Entity, Column, PrimaryGeneratedColumn, OneToOne, 
    JoinColumn } from 'typeorm'

@Entity()
export class SupportTicket {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @Column()
    type: boolean

    @Column({ type: 'longtext' })
    message: string
    
    @Column({ type: 'longtext' })
    transactionId: string
}
