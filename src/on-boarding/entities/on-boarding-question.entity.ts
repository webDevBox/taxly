import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { OnBoarding } from './on-boarding.entity'

@Entity({name: 'on_boarding_questions'})
export class OnBoardingQuestion {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    label: string

    @Column()
    order: number

    @ManyToOne(() => OnBoarding, on_boarding_id => on_boarding_id.questions,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' 
    })
    on_boarding_id: OnBoarding;


}
