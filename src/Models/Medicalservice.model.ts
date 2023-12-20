import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IMedicalservice {
    MedicalServiceId: string;
}

class Medicalservice extends Model<InferAttributes<Medicalservice>, InferCreationAttributes<Medicalservice>>{
    declare MedicalServiceId: string;
};

Medicalservice.init(
    {
        MedicalServiceId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'Medicalservice',
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

export default Medicalservice;
