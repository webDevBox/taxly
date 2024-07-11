import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'


@Entity({name: 'user_types',synchronize: false})
export class UserType {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

}
