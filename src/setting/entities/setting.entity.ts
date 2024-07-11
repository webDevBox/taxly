import { Entity, Column, PrimaryGeneratedColumn, OneToOne, 
    JoinColumn } from 'typeorm'
import {User} from '../../user/entities/user.entity'

@Entity()
export class Setting {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User, user => user.setting)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ type: 'longtext', nullable: true })
    help: string;

    @Column({nullable: true})
    tax_reminder: boolean
    
    @Column({nullable: true, default: 0})
    status: boolean
    
    @Column({nullable: true, default: 0})
    flag_screen: boolean

    @Column({nullable: true})
    notification_type: boolean

    @Column({nullable: true, type: 'longtext'})
    work_status: string

    @Column({nullable: true, type: 'longtext'})
    travel_type: string
    
    @Column({nullable: true, type: 'longtext'})
    personal_deduction: string
    
    @Column({nullable: true, type: 'longtext'})
    profession: string
    
    @Column({nullable: true, type: 'longtext'})
    criteria: string

    @Column({nullable: true})
    work_type: boolean

    @Column({nullable: true})
    business_meal: number

    @Column({nullable: true})
    f1: number

    @Column({nullable: true})
    f2: string

    @Column({nullable: true})
    f3: string
}
