import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Users' })
export class User extends Model<User> {
    @Column({ allowNull: false })
    firstname: string;

    @Column({ allowNull: false })
    lastname: string;

    @Column({allowNull:false,unique:true})
    email: string;

    @Column
    password: string;

    @Column
    confirmPassword: string;

    @Column({})
    role:Array<string>

    @Column
    status:string;
}
