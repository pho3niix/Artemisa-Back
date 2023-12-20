import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IMedicalService {
    MedicalServiceId: string;
}

class MedicalService extends Model<InferAttributes<MedicalService>, InferCreationAttributes<MedicalService>>{
    declare MedicalServiceId: string;
};

MedicalService.init(
    {
        MedicalServiceId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'MedicalService',
        indexes: [
            {
                unique: true,
                fields: ['MedicalServiceId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default MedicalService;
