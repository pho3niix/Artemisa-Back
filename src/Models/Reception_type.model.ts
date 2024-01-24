import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IReceptionType {
    ReceptionTypeId: string;
}

class ReceptionType extends Model<InferAttributes<ReceptionType>, InferCreationAttributes<ReceptionType>>{
    declare ReceptionTypeId: string;
};

ReceptionType.init(
    {
        ReceptionTypeId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'ReceptionType',
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

export default ReceptionType;
