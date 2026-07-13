import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IGroups {
    GroupId: string;
}

class Groups extends Model<InferAttributes<Groups>, InferCreationAttributes<Groups>>{
    declare GroupId: string;
};

Groups.init(
    {
        GroupId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'Groups',
        indexes: [
            {
                unique: true,
                fields: ['GroupId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default Groups;
