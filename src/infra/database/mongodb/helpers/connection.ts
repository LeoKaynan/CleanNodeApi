import {Collection, MongoClient} from 'mongodb';

class MongoHelper {
  private client: MongoClient;

  async connect() {
    this.client = await MongoClient.connect(process.env.MONGO_URL);
  }

  async disconnect() {
    await this.client.close();
  }

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  }
}

export const mongoHelper = new MongoHelper();
