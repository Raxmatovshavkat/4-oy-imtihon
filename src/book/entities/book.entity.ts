import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Author } from "src/author/entities/author.entity";
import { Borrow } from "src/borrow/entities/borrow.entity";

@Table({ tableName: "books" })
export class Book extends Model<Book> {
    @Column
    title: string

    @Column
    isbn: string

    @ForeignKey(() => Author)
    @Column
    auhtorId: number
    @Column
    category: string

    @Column
    publicationDate: Date
    @Column
    totalCopies: number

    @Column
    availableCopies: number

    @BelongsTo(() => Author)
    auhtor: Author

    @HasMany(()=>Borrow)
    borrows:Borrow[]
}
