import { BelongsTo, Column, HasMany, Model, Table } from "sequelize-typescript";
import { Book } from "src/book/entities/book.entity";

@Table({tableName:"author"})
export class Author extends Model<Author>{
    @Column({
        allowNull:false
    })
    firstname:string

    @Column({
        allowNull: false
    })
    lastname: string

    @Column({
        allowNull: false
    })
    biography: string

    @Column
    dateOfBirth:Date

    @Column
    nationality:string

    @HasMany(()=>Book)
    books:Book[]

}
