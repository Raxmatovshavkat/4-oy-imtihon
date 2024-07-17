import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateRegisterDto } from './dto/register-user.dto';
import { CreateLoginDto } from './dto/login-user.dto ';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import * as otpGenerator from 'otp-generator';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../Mail/mail.service';
import { OtpService } from 'src/otp/otp.service';
import { CreateOtpDto } from 'src/otp/dto/create-otp.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly emailService: EmailService,
    private readonly otpService: OtpService
  ) { }

  async register(createUserDto: CreateRegisterDto) {
    const { password, email, ...rest } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

    const user = new this.userModel({
      ...rest,
      email,
      password: hashedPassword,
      status: 'inactive',
    });


    try {
      const savedUser = await user.save();
      await this.emailService.sendEmail(email, otp);
      await this.otpService.saveOtp({ userId: savedUser.id, otp });
      return savedUser;
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Failed to register user');
    }
  }

  async signin(createLoginDto: CreateLoginDto) {
    const { email, password } = createLoginDto;
    const user = await this.userModel.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async logout(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException();
    }
    await user.destroy();
  }

  async updateStatus(userId: number, status: string): Promise<void> {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.status = status;
    await user.save();
    
  }
}
