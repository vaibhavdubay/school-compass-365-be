import { ForbiddenException } from '@nestjs/common';
import { User } from '@sc-decorators/user';
import { DB_Model } from '@sc-enums/model';
import { Role } from '@sc-enums/role';
import { Model, PipelineStage, Schema } from 'mongoose';

export class DataFactory<T, C = Partial<T>, U = Partial<T>> {
  private config: DataFactoryConfig;

  constructor(
    private readonly model: Model<T>,
    config?: Partial<DataFactoryConfig>,
  ) {
    this.config = new DataFactoryConfig(config);
  }

  async create(createDto: C, schoolId?: string): Promise<T> {
    if (schoolId) createDto['schoolId'] = schoolId;
    const user = new this.model(createDto);
    return (await user.save()) as T;
  }

  async findAll(filter: Partial<T> = {}): Promise<T[]> {
    let query = this.model.find(filter);
    query = this.populateFields(query);
    return await query.exec();
  }

  async findById(id: string | Schema.Types.ObjectId): Promise<T> {
    let query = this.model.findById(id);
    query = this.populateFields(query);
    return await query.exec();
  }

  async findOne(filter: Partial<T>): Promise<T | null | any> {
    let query = this.model.findOne(filter);
    query = this.populateFields(query);
    return await query.exec();
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
    if (this.config.privileges.includes(user.role)) return true;
    else return id == user[this.config.compare_key];
  }

  private populateFields(query) {
    Object.entries(this.config.populates).forEach((field) => {
      query = query.populate(...field);
    });
    return query;
  }

  protected addLookUps(config: DataFactoryLookUps[] = []) {
    const lookupUps: PipelineStage.Lookup[] = [];
    config.forEach((lookup) => {
      const model = lookup.model + 's';
      lookupUps.push({
        $lookup: {
          from: model,
          localField: lookup.localField || '_id',
          foreignField: lookup.foreignKey || '_id',
          as: lookup.alias || model,
          pipeline: lookup.pipeLine || [],
        },
      });
    });
    return lookupUps;
  }
}

export interface DataFactoryLookUps {
  model: DB_Model | string;
  foreignKey?: string;
  alias?: string;
  localField?: string;
  pipeLine?: Exclude<PipelineStage, PipelineStage.Merge | PipelineStage.Out>[];
}

export class DataFactoryConfig {
  public compare_key: string = '_id';
  public privileges: Role[] = [Role.SUPER_ADMIN];
  public populates: { [field: string]: string } = {};

  constructor(config?: Partial<DataFactoryConfig>) {
    Object.keys(config || {}).forEach((key) => {
      if (config[key]) this[key] = config[key];
    });
  }
}
