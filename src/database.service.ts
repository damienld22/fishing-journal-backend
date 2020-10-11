import { Injectable } from '@nestjs/common';
import { MongoClient, Db, ObjectID, Collection } from 'mongodb';

@Injectable()
export class DatabaseService {
  database: Db;
  fishesCollection = 'fishes';
  locationsCollection = 'locations';
  sessionsCollection = 'sessions';
  listsCollection = 'lists';
  usersCollection = 'users';

  constructor() {
    this.createDatabase('mongodb://localhost:27017/fishing-journal');
  }

  async createDatabase(url: string) {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    this.database = client.db();
  }

  private getAll(collection: Collection, userId: string) {
    return collection.find({ user: userId}).toArray();
  }

  private create(collection: Collection, element: any, userId: string) {
    return collection.insertOne({ ...element, user: userId});
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
  async getAllFishes(userId: string) {
    return await this.getAll(this.database.collection(this.fishesCollection), userId);
  }

  async getOneFish(id: string) {
    return await this.findOne(this.database.collection(this.fishesCollection), id);
  }

  async createFish(fish: any, userId: string) {
    return await this.create(this.database.collection(this.fishesCollection), fish, userId);
  }

  async updateFish(id: string, fish: any) {
    return await this.update(this.database.collection(this.fishesCollection), id, fish);
  }

  async deleteFish(id: string) {
    return await this.delete(this.database.collection(this.fishesCollection), id);
  }
  async getFishesFromDates(start: number, end: number, userId: string) {
    return await this.database.collection(this.fishesCollection).find({
      user: userId,
      catchDate: {
        $gte: start,
        $lte: end
      }
    }).toArray()
  }

  /**
   * ==================================
   * LOCATIONS CRUD
   * ==================================
   */
  async getAllLocations(userId: string) {
    return await this.getAll(this.database.collection(this.locationsCollection), userId);
  }

  async getOneLocation(id: string) {
    return await this.findOne(this.database.collection(this.locationsCollection), id);
  }

  async createLocation(location: any, userId: string) {
    return await this.create(this.database.collection(this.locationsCollection), location, userId);
  }

  async updateLocation(id: string, location: any) {
    return await this.update(this.database.collection(this.locationsCollection), id, location);
  }

  async deleteLocation(id: string) {
    return await this.delete(this.database.collection(this.locationsCollection), id);
  }
 
  /**
   * ==================================
   * SESSIONS CRUD
   * ==================================
   */
  async getAllSessions(userId: string) {
    return await this.getAll(this.database.collection(this.sessionsCollection), userId);
  }

  async getOneSession(id: string) {
    return await this.findOne(this.database.collection(this.sessionsCollection), id);
  }

  async createSession(session: any, userId: string) {
    return await this.create(this.database.collection(this.sessionsCollection), session, userId);
  }

  async updateSession(id: string, session: any) {
    return await this.update(this.database.collection(this.sessionsCollection), id, session);
  }

  async deleteSession(id: string) {
    return await this.delete(this.database.collection(this.sessionsCollection), id);
  }

  /**
   * ==================================
   * LIST CRUD
   * ==================================
   */
  async getList(userId: string) {
    return await this.database.collection(this.listsCollection).findOne({user: userId});
  }

  async updateList(list: any) {
    if (!list._id) {
      return await this.database.collection(this.listsCollection).insertOne(list)
    }

    const currentList = await this.database.collection(this.listsCollection).findOne({ _id: new ObjectID(list._id)});

    if (currentList) {
      return await this.database.collection(this.listsCollection).updateOne(
        { _id: new ObjectID(list._id) }, { $set: { elements: list.elements } },
      );
    } else {
      return await this.database.collection(this.listsCollection).insertOne(list)
    }
  }
  
  /**
   * ==================================
   * USERS CRUD
   * ==================================
   */
  async getUserFromId(id: string) {
    return await this.database.collection(this.usersCollection).findOne({ _id: new ObjectID(id)});
  }

  async getUserFromLoginAndPassword(username: string, password: string) {
    return await this.database.collection(this.usersCollection).findOne({ username, password });
  }

  async createUser(username: string, password: string) {
    return await this.database.collection(this.usersCollection).insertOne({ username, password });
  }

  async getUserFromUsername(username: string) {
    return await this.database.collection(this.usersCollection).findOne({ username });
  }

}
