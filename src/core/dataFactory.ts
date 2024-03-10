import { ForbiddenException } from '@nestjs/common';
import { User } from '@sc-decorators/user';
import { Role } from '@sc-enums/role';
import { Model, Schema } from 'mongoose';

export class DataFactory<T, C = Partial<T>, U = Partial<T>> {
  private config: DataFactoryConfig;
  constructor(
    private readonly model: Model<T>,
    config?: Partial<DataFactoryConfig>,
  ) {
    this.config = new DataFactoryConfig(config);
  }

  async create(createDto: C): Promise<T> {
    const user = new this.model(createDto);
    return (await user.save()) as T;
  }

  async findAll(): Promise<T[]> {
    return await this.model.find({});
  }

  async findById(id: string | Schema.Types.ObjectId): Promise<T> {
    return await this.model.findById(id);
  }
  async findByEmail(email: string): Promise<T | null> {
    return await this.model.findOne({ email });
  }

  async findByUserName(userName: string): Promise<T | null> {
    return await this.model.findOne({ userName });
  }

  update(id: string, updateDto: U, user?: User): Promise<T> {
    if (this.mapAccessCheck(id, user) || !user) {
      return this.model.findByIdAndUpdate(id, updateDto, { new: true });
    } else throw new ForbiddenException();
  }

  remove(id: string, user?: User) {
    if (this.mapAccessCheck(id, user) || !user)
      return this.model.findByIdAndDelete(id);
    else throw new ForbiddenException();
  }

  async exists(options: Partial<T>): Promise<boolean> {
    return !!(await this.model.exists(options).exec());
  }

  private mapAccessCheck(id: string, user: User) {
    if (this.config.priviladges.includes(user.role)) return true;
    else return id === user[this.config.compare_key];
  }
}

export class DataFactoryConfig {
  public compare_key: string = '_id';
  public priviladges: Role[] = [Role.SUPERADMIN];
  constructor(config?: Partial<DataFactoryConfig>) {
    Object.keys(config || {}).forEach((key) => {
      if (config[key]) this[key] = config[key];
    });
  }
}
