import { Injectable } from '@nestjs/common';
import { MongoClient, Db, ObjectID, Collection } from 'mongodb';

@Injectable()
export class DatabaseService {
  database: Db;
  fishesCollection = 'fishes';

  constructor() {
    this.createDatabase('mongodb://localhost:27017/fishing-journal');
  }

  async createDatabase(url: string) {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    this.database = client.db();
  }

  private getAll(collection: Collection) {
    return collection.find().toArray();
  }

  private create(collection: Collection, element: any) {
    return collection.insertOne(element);
  }

  private update(collection: Collection, id: string, element: any) {
    return collection.updateOne(
      { _id: new ObjectID(id) },
      { $set: element},
    );
  }

  private delete(collection: Collection, id: string) {
    return collection.deleteOne({ _id: new ObjectID(id)});
  }

  private findOne(collection: Collection, id: string) {
    return collection.findOne({ _id: new ObjectID(id)});
  }

  /**
   * ==================================
   * FISHES CRUD
   * ==================================
   */
  async getAllFishes() {
    return await this.getAll(this.database.collection(this.fishesCollection));
  }

  async getOneFish(id: string) {
    return await this.findOne(this.database.collection(this.fishesCollection), id);
  }

  async createFish(fish: any) {
    return await this.create(this.database.collection(this.fishesCollection), fish);
  }

  async updateFish(id: string, fish: any) {
    return await this.update(this.database.collection(this.fishesCollection), id, fish);
  }

  async deleteFish(id: string) {
    return await this.delete(this.database.collection(this.fishesCollection), id);
  }
}