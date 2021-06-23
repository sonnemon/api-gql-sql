import { Sequelize } from "sequelize";
class Mysql {
  private _client?: Sequelize;
  get client() {
    if (!this._client) {
      throw new Error("Cannot access Mysql client before connecting");
    }
    return this._client;
  }
  async connect(url: string) {
    this._client = new Sequelize(url, {
      logging: false,
      query: {
        raw: false,
      },
    });
    return new Promise((resolve, reject) => {
      this.client
        .authenticate()
        .then(() => {
          if (process.env.NODE_ENV != "test") {
            console.log("Connected to Mysql");
          }
          resolve(true);
        })
        .catch(() => {
          reject();
          throw new Error("Cannot access Mysql client before connecting");
        });
    });
  }
}

export const myslqWrapper = new Mysql();
