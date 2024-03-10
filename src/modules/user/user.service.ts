import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { User } from './entities/user.entity';
import { DB_Model } from '@sc-enums/model';
import { Role } from '@sc-enums/role';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(DB_Model.USER) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return await user.save();
  }

  async findAll(role: Role) {
    const getRoles = this.getAvailableUserRoles(role);
    return await this.userModel.find({
      role: {
        $in: getRoles,
      },
    });
  }

  async findById(id: string | Schema.Types.ObjectId) {
    return await this.userModel.findById(id);
  }
  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async findByUserName(userName: string) {
    return await this.userModel.findOne({ userName });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async exists(options: Partial<User>): Promise<boolean> {
    return !!(await this.userModel.exists(options).exec());
  }

  private getAvailableUserRoles(role: Role): Role[] {
    switch (role) {
      case Role.SUPERADMIN:
        return [Role.ADMIN, Role.TEACHER, Role.STUDENT];
      case Role.ADMIN:
        return [Role.TEACHER, Role.STUDENT];
      case Role.TEACHER:
        return [Role.STUDENT];
      case Role.STUDENT:
        return [];
    }
  }
}
