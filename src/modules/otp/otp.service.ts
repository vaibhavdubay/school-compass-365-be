import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BaseRepository } from '@sc-helpers/repository.helper';
import { OTP } from './entities/otp.entity';
import { DataSource, MoreThanOrEqual } from 'typeorm';

@Injectable()
export class OtpService extends BaseRepository<OTP> {
  constructor(readonly dataSource: DataSource) {
    super(OTP, dataSource.createEntityManager());
  }

  async createOtp(user_id: string) {
    const otp = await this.findOne({
      order: { createdAt: 1 },
      where: { user_id, expires: MoreThanOrEqual(new Date().getTime()) },
    });
    if (!otp) {
      const otp = this.create();
      otp.user_id = user_id;
      otp.otp = Math.floor(100000 + Math.random() * 900000).toString();
      otp.expires = new Date().getTime() + 1000 * 60 * 5;
      return this.createDocument(otp);
    } else {
      return otp;
    }
  }

  async verifyOtp(user_id: string, otp: string) {
    if (this.existsBy({ user_id, otp })) {
      const _otp = await this.findOne({
        order: { createdAt: 1 },
        where: { user_id, otp, expires: MoreThanOrEqual(new Date().getTime()) },
      });
      if (_otp) {
        this.softDelete(_otp);
        return true;
      } else {
        throw new UnauthorizedException('OTP expired!');
      }
    } else {
      throw new UnauthorizedException('Wrong OTP!');
    }
  }
}
