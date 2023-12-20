import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IReception {
    ReceptionId: string;
}

class Reception extends Model<InferAttributes<Reception>, InferCreationAttributes<Reception>>{
    declare ReceptionId: string;
};

Reception.init(
    {
        ReceptionId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'Reception',
        indexes: [
            {
                unique: true,
                fields: ['ReceptionId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default Reception;
