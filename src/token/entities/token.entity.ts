import { Column, Model, Table } from 'sequelize-typescript';

@Table({tableName:"tokens"})
export class RefreshToken extends Model<RefreshToken> {
    @Column
    token: string;

    @Column
    userId: number;

    @Column({ type: 'timestamp' })
    expiryDate: Date // Ensure this property exists
}
