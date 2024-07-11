import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    category: string
    
    @Column({nullable: true})
    category_id: string
    
    @Column({nullable: true})
    class: string
    
    @Column({nullable: true})
    amount: number

    @Column({type: 'longtext',nullable: true})
    account: string
    
    @Column({type: 'longtext',nullable: true})
    criteria: string
    
    @Column({type: 'longtext',nullable: true})
    direction: string
    
    @Column({type: 'longtext',nullable: true})
    description: string
    
    @Column({type: 'longtext',nullable: true})
    postDate: string
    
    @Column({nullable: true})
    flag_coa: number
    
    @Column({nullable: true})
    flag_deduction: number
    
    @Column({default: 0, comment: '0=no status, 1=Accept, 2=Reject'})
    deduction: number
    
    @Column({type: 'longtext',nullable: true})
    transaction_id: string

    @ManyToOne(() => User, user => user.transactions)
    user: User;

    @Column()
    userId: number;
}
