import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ProfileImage } from './entities/profile-image.entity';
import { InjectModel } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import { Role } from '@sc-enums/role';
import * as Sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ProfileImageService {
  constructor(
    @InjectModel(DB_Model.PROFILE_IMAGE)
    private readonly profileImageModel: Model<ProfileImage>,
    private readonly configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async updateProfileImage(
    userId: string,
    role: Role,
    image: Express.Multer.File,
  ) {
    const filename = `${role}-${userId}.webp`; // Create unique filename with extension
    const folderName = this.configService.get<string>('PROFILE_IMAGE_FOLDER');
    const imageUrl = await this.imageUrl(folderName, filename);
    const folderPath = this.folderPath(folderName);
    const imagePath = join(folderPath, filename);

    this.optimizeSaveImage(image.buffer, imagePath);

    const profileImage = await this.profileImageModel.findOne({ userId, role });

    if (!profileImage) {
      const profileImage = new this.profileImageModel({
        userId,
        role,
        filename,
        url: imageUrl,
        originalName: image.originalname,
      });
      return profileImage.save();
    } else {
      profileImage.originalName = image.originalname;
      profileImage.filename = filename;
      profileImage.url = imageUrl;
      profileImage.updatedAt = new Date();
    }
    return profileImage.save();
  }

  folderPath(folderName: string): string {
    let folderPath = process.cwd();
    const tempFolderPath = join(folderPath, folderName);
    if (existsSync(tempFolderPath)) {
      return tempFolderPath;
    }
    folderName.split('/').forEach((path) => {
      folderPath = join(folderPath, path);
      if (!existsSync(folderPath)) {
        mkdirSync(folderPath);
      }
    });
    return folderPath;
  }

  async imageUrl(folderName: string, filename: string) {
    const staticFolders = this.configService
      .get<string>('STATIC_FOLDERS')
      .split(',');

    const navigation = staticFolders.find((folder) =>
      folderName.startsWith(folder),
    );
    if (navigation) {
      folderName = folderName.replace(new RegExp(`^${navigation}/`), '');
    }
    const hostUrl = await this.configService.get('HOST_URL');
    return `${hostUrl}/${folderName}/${filename}`;
  }

  async optimizeSaveImage(buffer: Buffer, imagePath: string) {
    await Sharp(buffer).webp().toFile(imagePath);
  }
}
