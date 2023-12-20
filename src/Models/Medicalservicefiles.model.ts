import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IMedicalservicefiles {
    MedicalServiceFileId: string;
}

class Medicalservicefiles extends Model<InferAttributes<Medicalservicefiles>, InferCreationAttributes<Medicalservicefiles>>{
    declare MedicalServiceFileId: string;
};

Medicalservicefiles.init(
    {
        MedicalServiceFileId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'Medicalservicefiles',
        indexes: [
            {
                unique: true,
                fields: ['MedicalServiceFileId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default Medicalservicefiles;
