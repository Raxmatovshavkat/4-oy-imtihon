import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Borrow } from 'src/borrow/entities/borrow.entity';

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

    @Column({
        type:DataType.ENUM('user','admin','librarian')
    })
    role:string="user"

    @Column({
        type: DataType.ENUM('active','inactive')
    })
    status:string;

    @HasMany(()=>Borrow)
    borrows:Borrow[]
}
