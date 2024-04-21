import {
  EntityManager,
  EntityTarget,
  FindOptionsWhere,
  Repository as TypeormRepo,
} from 'typeorm';
export class BaseRepository<
  T,
  C = Partial<T>,
  U = Partial<T>,
> extends TypeormRepo<T> {
  constructor(
    readonly entity: EntityTarget<T>,
    readonly entityManager: EntityManager,
  ) {
    super(entity, entityManager);
  }
  findById(id: string) {
    const filter: FindOptionsWhere<unknown> = {
      id,
    };
    return this.findOneBy(filter);
  }
  createDocument(document: C | Partial<T>) {
    const newObject = this.create();
    Object.assign(newObject, document);
    return this.save(newObject);
  }

  updateDocument(id: string, document: U) {
    const newObject = this.create();
    Object.assign(newObject, { ...document, id });
    return this.save(newObject);
  }
}