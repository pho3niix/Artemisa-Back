import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IParentFiles {
    ParentFileId: string;
}

class ParentFiles extends Model<InferAttributes<ParentFiles>, InferCreationAttributes<ParentFiles>>{
    declare ParentFileId: string;
};

ParentFiles.init(
    {
        ParentFileId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'ParentFiles',
        indexes: [
            {
                unique: true,
                fields: ['ParentFileId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default ParentFiles;
