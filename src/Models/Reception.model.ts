import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IReception {
    ReceptionTypeId: string;
}

class Reception extends Model<InferAttributes<Reception>, InferCreationAttributes<Reception>>{
    declare ReceptionTypeId: string;
};

Reception.init(
    {
        ReceptionTypeId:{
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
                fields: ['ReceptionTypeId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default Reception;
