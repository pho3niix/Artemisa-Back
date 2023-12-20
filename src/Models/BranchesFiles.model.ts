import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IBranchesFiles {
    BranchFileId: string;
}

class BranchesFiles extends Model<InferAttributes<BranchesFiles>, InferCreationAttributes<BranchesFiles>>{
    declare BranchFileId: string;
};

BranchesFiles.init(
    {
        BranchFileId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'BranchesFiles',
        indexes: [
            {
                unique: true,
                fields: ['BranchFileId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default BranchesFiles;
