import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

export class BaseService<T> {
  private repo;
  private entityName: string;
  private client;
  constructor(
    repo: Repository<T>,
    entityName: string,
    private cacheManager: Cache,
  ) {
    this.repo = repo;
    this.entityName = entityName;
    this.client = cacheManager;
  }

  async findAll(opts?): Promise<T[]> {
    return await this.repo.find(opts);
  }

  async findOne(opts?): Promise<T> {
    return this.repo.findOne(opts);
  }

  async save(payload, relations?): Promise<T> {
    return await this.repo.save(payload, relations);
  }

  async update(id: number, payload, relations?): Promise<T> {
    await this.repo.update(id, payload);
    payload['id'] = id;
    const savedData = relations
      ? await this.findOne({
          where: { id },
          relations: relations.relations,
        })
      : payload;
    return savedData;
  }

  async delete(id): Promise<T> {
    return this.repo.delete(id);
  }

  async softDelete(id): Promise<T> {
    return this.repo.softDelete(id);
  }

  async Count(): Promise<T> {
    return this.repo.count();
  }
}
