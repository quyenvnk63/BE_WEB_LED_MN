import { Model, ModelStatic } from 'sequelize';

export default abstract class BaseService<T extends Model> {
  protected model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    try {
      const records = await this.model.findAll();
      return records;
    } catch (error) {
      throw new Error(`Failed to get all ${this.model.name.toLowerCase()}s`);
    }
  }

  async findByPk(id: number): Promise<T | null> {
    try {
      const record = await this.model.findByPk(id);
      if (!record) {
        throw new Error(`${this.model.name} not found`);
      }
      return record;
    } catch (error) {
      throw new Error(`${this.model.name} not found`);
    }
  }

  async create(data: any): Promise<T> {
    try {
      const record = await this.model.create(data);
      return record;
    } catch (error) {
      throw new Error(`Failed to create ${this.model.name.toLowerCase()}`);
    }
  }

  async update(id: number, data: any): Promise<T> {
    try {
      const record = await this.findByPk(id);
      if (!record) {
        throw new Error(`${this.model.name} not found`);
      }
      await record.update(data);
      return record;
    } catch (error) {
      throw new Error(`Failed to update ${this.model.name.toLowerCase()}`);
    }
  }

  async destroy(id: number): Promise<void> {
    try {
      const record = await this.findByPk(id);
      if (!record) {
        throw new Error(`${this.model.name} not found`);
      }
      await record.destroy();
    } catch (error) {
      throw new Error(`Failed to delete ${this.model.name.toLowerCase()}`);
    }
  }
}
