import { Injectable } from '@nestjs/common';
import { Image } from './entities/image.entity';
import * as Sharp from 'sharp';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from '@sc-decorators/user-profile';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageModel: Repository<Image>,
  ) {}

  async saveImage(
    completeProfile: UserProfile,
    filename: string,
    image: Express.Multer.File,
  ) {
    const user = completeProfile.user;
    const buffer = await this.optimizeSaveImage(image.buffer);
    const profileImage = await this.imageModel.findOneBy({
      userId: user.id,
      role: user.role,
      filename,
    } as any);

    if (!profileImage) {
      const createObj = {
        userId: user.id,
        role: user.role,
        filename,
        buffer,
        mimeType: image.mimetype,
      };
      const mainObj = this.imageModel.create();
      Object.assign(mainObj, createObj);
      return this.imageModel.save(mainObj);
    } else {
      profileImage.mimeType = image.mimetype;
      profileImage.buffer = buffer;
      profileImage.updatedAt = new Date();
    }
    return this.imageModel.save(profileImage);
  }

  async updateProfileImage(user: UserProfile, file: Express.Multer.File) {
    const fileName = `/profile/${user.user.role}_${user.user.id}.webp`;
    const profileImage = await this.saveImage(user, fileName, file);
    user['profileImage'] = profileImage;
    user['profileImageUrl'] = profileImage.filename;
    return user;
  }

  private async optimizeSaveImage(buffer: Buffer) {
    return await Sharp(buffer).webp().toBuffer();
  }

  getImage(cat: string, name: string) {
    return this.imageModel.findOne({
      where: {
        filename: `/${cat}/${name}`,
      },
    });
  }
}
