import { Column, ForeignKey, Model, Table, DataType } from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@Table({ tableName: 'Otp' })
export class Otp extends Model<Otp> {
    @ForeignKey(() => User)
    @Column({ allowNull: false })
    userId: number;

    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING
    })
    otp: string;
}
