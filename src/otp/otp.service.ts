import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Otp } from './entities/otp.entity';

@Injectable()
export class OtpService {
  constructor(@InjectModel(Otp) private readonly otpService: typeof Otp) {

  }

  async findOtpByUserIdAndOtp(userId: number, otp: string): Promise<Otp | null> {
    return await this.otpService.findOne({ where: { userId, otp } });
  }

  async saveOtp(createOtpDto: CreateOtpDto) {
    return await this.otpService.create({ ...createOtpDto });
  }

  async remove(id: number): Promise<void> {
    const otp = await this.otpService.findByPk(id);
    if (!otp) {
      throw new NotFoundException('Otp topilmadi');
    }
    return await otp.destroy();
  }

}

