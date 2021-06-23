import { DataTypes, Model, Sequelize, Optional } from "sequelize";

interface Attributes {
  id: number;
  title: string;
  price: number;
  description: string;
  img_url: string;
}
interface CreationAttributes
  extends Optional<Attributes, "id"> {}

const buildModel = (client: Sequelize) => {
  class ProductModel extends Model<
    Attributes,
    CreationAttributes
  > {
    public id!: number;
    public title!: string;
    public price!: number;
    public description!: string;
    public img_url!: string;
  }
  ProductModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING,
      },
      img_url: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize: client,
      modelName: "Product",
      timestamps: false,
      tableName: "products2",
    }
  );
  return ProductModel;
};
const Product = (client: Sequelize) => {
  const model = buildModel(client);
  return model;
};

export { Product };
