import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { OnBoardingQuestion } from './on-boarding-question.entity'

@Entity({name: 'on_boardings'})
export class OnBoarding {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    occupation_id:number

    @Column({nullable: true})
    profession_id:number

    @Column()
    criteria_id:number

    @Column()
    icon:string

    @Column()
    heading:string

    @Column()
    sub_heading:string

    @Column()
    type:number

    @OneToMany(() => OnBoardingQuestion, onBoardingQuestion => onBoardingQuestion.on_boarding_id, { 
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' 
    })
    questions: OnBoardingQuestion[];


}
