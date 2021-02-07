import { Injectable } from '@nestjs/common';
import { connect } from 'mongoose';
import { FishModel } from './fishes/fish.dto';
import { ListModel } from './list/list.dto';
import { LocationModel } from './locations/location.dto';
import { SessionModel } from './sessions/session.dto';
import { UserModel } from './authentication/authentication.dto';
import { ReferenceModel } from './references/reference.dto';
import { StationModel } from './stations/stations.dto';
import { DecisionHelpDto, DecisionHelpModel } from './decisionHelp/decisionHelp.dto';

@Injectable()
export class DatabaseService {
  constructor() {
    this.createDatabase('mongodb://localhost:27017/fishing-journal')
  }

  async createDatabase(url: string) {
    connect(url ,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
      console.log('connected to database')
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    })
  }

  /**
   * ==================================
   * FISHES CRUD
   * ==================================
   */
  async getAllFishes(userId: string) {
    return await FishModel.find({ user: userId}).sort({ 'catchDate': -1}).exec();
  }

  async getOneFish(id: string) {
    return await FishModel.findById(id).exec();
  }

  async createFish(fish: any, userId: string) {
    const newFish = new FishModel({ ...fish, user: userId});
    return await newFish.save();
  }

  async updateFish(id: string, fish: any) {
    return await FishModel.findByIdAndUpdate(id, fish).exec();
  }

  async deleteFish(id: string) {
    return await FishModel.findByIdAndDelete(id).exec();
  }

  async getFishesFromDates(start: number, end: number, userId: string) {
    return await FishModel.find({ 
      user: userId,
      catchDate: {
        $gte: start,
        $lte: end
    }}).sort({ 'catchDate': -1}) .exec();
  }

  /**
   * ==================================
   * LOCATIONS CRUD
   * ==================================
   */
  async getAllLocations(userId: string) {
    return await LocationModel.find({ user: userId}).exec();
  }

  async getOneLocation(id: string) {
    return await LocationModel.findById(id);
  }

  async createLocation(location: any, userId: string) {
    const newLocation = new LocationModel({ ...location, user: userId});
    return await newLocation.save();
  }

  async updateLocation(id: string, location: any) {
    return await LocationModel.findByIdAndUpdate(id, location).exec();
  }

  async deleteLocation(id: string) {
    return await LocationModel.findByIdAndDelete(id).exec();
  }
 
  /**
   * ==================================
   * SESSIONS CRUD
   * ==================================
   */
  async getAllSessions(userId: string) {
    return await SessionModel.find({ user: userId}).sort({ 'start': -1}).exec();
  }

  async getOneSession(id: string) {
    return await SessionModel.findById(id);
  }

  async createSession(session: any, userId: string) {
    const newSession = new SessionModel({ ...session, user: userId});
    return await newSession.save();
  }

  async updateSession(id: string, session: any) {
    return await SessionModel.findByIdAndUpdate(id, session).exec();
  }

  async deleteSession(id: string) {
    return await SessionModel.findByIdAndDelete(id).exec();
  }

  /**
   * ==================================
   * LIST CRUD
   * ==================================
   */
  async getList(userId: string) {
    return await ListModel.findOne({ user: userId}).exec();
  }

  async updateList(list: any, userId: string) {
    if (!list._id) {
      const newList = new ListModel({ ...list, user: userId})
      return await newList.save();
    } else {
      const currentList = await ListModel.findById(list._id);
  
      if (currentList) {
        return await ListModel.findByIdAndUpdate(list._id, { $set: { elements: list.elements }}).exec();
      }
    }
  }
  
  /**
   * ==================================
   * DECISION HELP CRUD
   * ==================================
   */
  async getDecisionHelp(userId: string) {
    return await DecisionHelpModel.findOne({ user: userId}).exec();
  }

  async update(userId: string, decisionHelp: DecisionHelpDto) {
    if (!decisionHelp._id) {
      const newDecisionHelp = new DecisionHelpModel({ ...decisionHelp, user: userId});
      return await newDecisionHelp.save();
    } else {
      const currentDecisionHelp = await DecisionHelpModel.findById(decisionHelp._id);
  
      if (currentDecisionHelp) {
        return await DecisionHelpModel.findByIdAndUpdate(decisionHelp._id, { $set: decisionHelp}).exec();
      }
    }
  }
  
  /**
   * ==================================
   * USERS CRUD
   * ==================================
   */
  async getUserFromId(id: string) {
    return await UserModel.findById(id);
  }

  async getUserFromLoginAndPassword(username: string, password: string) {
    return await UserModel.findOne({ username, password }).exec();
  }

  async createUser(username: string, password: string) {
    const newUser = new UserModel({username, password});
    return await newUser.save();
  }

  async getUserFromUsername(username: string) {
    return await UserModel.findOne({ username }).exec();
  }

  /**
   * ==================================
   * REFERENCES CRUD
   * ==================================
   */
  async getAllReferences(userId: string) {
    return await ReferenceModel.find({ user: userId}).exec();
  }

  async createReference(reference: any, userId: string) {
    const newReference = new ReferenceModel({ ...reference, user: userId});
    return await newReference.save();
  }

  async updateReference(id: string, reference: any) {
    return await ReferenceModel.findByIdAndUpdate(id, reference).exec();
  }

  async deleteReference(id: string) {
    return await ReferenceModel.findByIdAndDelete(id).exec();
  }

  /**
   * ==================================
   * STATIONS CRUD
   * ==================================
   */
  async getAllStationsByLocation(userId: string, location: string) {
    return await StationModel.find({ user: userId, location }).exec();
  }

  async getOneStation(id: string) {
    return await StationModel.findById(id);
  }

  async createStation(station: any, userId: string) {
    const newStation = new StationModel({ ...station, user: userId});
    return await newStation.save();
  }

  async updateStation(id: string, station: any) {
    return await StationModel.findByIdAndUpdate(id, station).exec();
  }

  async deleteStation(id: string) {
    return await StationModel.findByIdAndDelete(id).exec();
  }
}
