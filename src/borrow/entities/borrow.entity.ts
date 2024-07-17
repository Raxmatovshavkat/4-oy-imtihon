import { Column, Model, Table, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import { Book } from 'src/book/entities/book.entity';
import { User } from 'src/user/entities/user.entity';

@Table({tableName:'borrows'})
export class Borrow extends Model<Borrow>{
    @ForeignKey(()=>Book)
    @Column({
       allowNull:false
    })
    bookId:number;

    @ForeignKey(()=>User)
    @Column
    userId:number

    borrowDate:Date;

    @Column
    dueDate:Date;

    @Column
    returnDate:Date
    
    @Column({
        type:DataType.ENUM('borrowed','returned','overdue')
    })
    status:string

    @BelongsTo(()=>Book)
    books:Book[]

    @BelongsTo(()=>User)
    users:User[]
  
}
