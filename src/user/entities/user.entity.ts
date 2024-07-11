import { Entity, Column, PrimaryGeneratedColumn, OneToOne,
    OneToMany } from 'typeorm'
import { Setting } from '../../setting/entities/setting.entity'
import { Transaction } from '../../transaction/entities/transaction.entity'


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    amember_id: string

    @Column({type: 'text'})
    basiq_id: string

    @Column({default: 3})
    credits: number
    
    @Column({default: 3})
    tickets: number

    @OneToOne(() => Setting, setting => setting.user, { eager: true })
    setting: Setting;

    @OneToMany(() => Transaction, transaction => transaction.user, { eager: true })
    transactions: Transaction[];

}
