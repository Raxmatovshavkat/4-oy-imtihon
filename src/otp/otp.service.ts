import { Injectable, NotFoundException, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Otp } from './entities/otp.entity';
import { CreateOtpDto } from './dto/create-otp.dto';

@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);

  constructor(@InjectModel(Otp) private readonly otpModel: typeof Otp) { }

  async findOtpByUserIdAndOtp(userId: number, otp: string): Promise<Otp | null> {
    if (!userId) {
      this.logger.error('userId is undefined');
      throw new Error('userId is undefined');
    }
    this.logger.log(`Finding OTP for userId: ${userId}`);
    return await this.otpModel.findOne({ where: { userId, otp } });
  }

  async saveOtp(createOtpDto: CreateOtpDto) {
    this.logger.log(`Saving OTP for userId: ${createOtpDto.userId}`);
    return await this.otpModel.create(createOtpDto);
  }

  async remove(id: number): Promise<void> {
    const otp = await this.otpModel.findByPk(id);
    if (!otp) {
      this.logger.error('OTP not found');
      throw new NotFoundException('OTP not found');
    }
    await otp.destroy();
    this.logger.log(`OTP with id ${id} removed`);
  }

  async verifyOtp(userId: number, otp: string): Promise<void> {
    this.logger.log(`Verifying OTP for userId: ${userId}`);
    const savedOtp = await this.findOtpByUserIdAndOtp(userId, otp);
    if (!savedOtp) {
      throw new UnauthorizedException('Invalid OTP');
    }
    await this.remove(savedOtp.id);
  }
}
