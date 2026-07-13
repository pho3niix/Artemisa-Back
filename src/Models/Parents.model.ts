import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IParents {
    ParentId: string;
}

class Parents extends Model<InferAttributes<Parents>, InferCreationAttributes<Parents>>{
    declare ParentId: string;
};

Parents.init(
    {
        ParentId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'Parents',
        indexes: [
            {
                unique: true,
                fields: ['ParentId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default Parents;
