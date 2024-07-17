import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Log extends Model {
    @Column
    method: string;

    @Column
    url: string;

    @Column({
        type: DataType.TEXT,  // TEXT tipi cheksiz uzunlikka ega
    })
    headers: string;

    @Column({
        type: DataType.TEXT,  // TEXT tipi cheksiz uzunlikka ega
    })
    body: string;

    @Column
    responseTime: number;
}
