import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IMedicalServiceFiles {
    MedicalServiceFileId: string;
}

class MedicalServiceFiles extends Model<InferAttributes<MedicalServiceFiles>, InferCreationAttributes<MedicalServiceFiles>>{
    declare MedicalServiceFileId: string;
};

MedicalServiceFiles.init(
    {
        MedicalServiceFileId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'MedicalServiceFiles',
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

export default MedicalServiceFiles;
