import { ForbiddenException } from '@nestjs/common';
import { User } from '@sc-decorators/user';
import { DB_Model } from '@sc-enums/model';
import { Role } from '@sc-enums/role';
import { Model, PipelineStage, Types } from 'mongoose';

export class DataFactory<T, C = Partial<T>, U = Partial<T>> {
  private config: DataFactoryConfig<T>;

  constructor(
    private readonly model: Model<T>,
    config?: Partial<DataFactoryConfig<T>>,
  ) {
    this.config = new DataFactoryConfig(config);
  }

  async create(
    createDto: C,
    config: { schoolId?: string; academicYear?: string } = {},
  ): Promise<T> {
    if (config.schoolId) createDto['schoolId'] = config.schoolId;
    if (config.academicYear) createDto['academicYears'] = [config.academicYear];
    const user = new this.model(createDto);
    return (await user.save()) as T;
  }

  async findAll(
    filter: Partial<T> & { filter?: string } = {},
    populates: { [field: string]: string } = {},
  ): Promise<T[]> {
    const additionalFilter = filter.filter;
    delete filter.filter;
    console.log(filter, this.getFilterQuery(additionalFilter));
    filter = Object.assign(filter, this.getFilterQuery(additionalFilter));
    console.log(filter);
    let query = this.model.find(filter);
    query = this.populateFields(query, populates);
    return await query.exec();
  }

  async findById(
    id: string,
    populates: { [field: string]: string } = {},
  ): Promise<T> {
    let query = this.model.findById(new Types.ObjectId(id));
    query = this.populateFields(query, populates);
    return await query.exec();
  }

  async findOne(
    filter: Partial<T>,
    populates: { [field: string]: string } = {},
  ): Promise<T | null | any> {
    let query = this.model.findOne(filter);
    query = this.populateFields(query, populates);
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

  private populateFields(query, populateFields = {}) {
    Object.entries(
      Object.keys(populateFields).length
        ? populateFields
        : this.config.populates,
    ).forEach((field) => {
      query = query.populate(...field);
    });
    return query;
  }

  public addLookUps(config: DataFactoryLookUps[] = []) {
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

  getFilterQuery(query: string = '{}') {
    try {
      return JSON.parse(query);
    } catch (error) {
      return {};
    }
  }
}

export interface DataFactoryLookUps {
  model: DB_Model | string;
  foreignKey?: string;
  alias?: string;
  localField?: string;
  pipeLine?: Exclude<PipelineStage, PipelineStage.Merge | PipelineStage.Out>[];
}

export class DataFactoryConfig<T = any> {
  public compare_key: string = '_id';
  public privileges: Role[] = [Role.SUPER_ADMIN];
  public populates: { [field in keyof T]?: string } = {};

  constructor(config?: Partial<DataFactoryConfig<T>>) {
    Object.keys(config || {}).forEach((key) => {
      if (config[key]) this[key] = config[key];
    });
  }
}
