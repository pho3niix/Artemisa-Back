import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IBranchesTypeFiles {
    BranchTypeFileId: string;
}

class BranchesTypeFiles extends Model<InferAttributes<BranchesTypeFiles>, InferCreationAttributes<BranchesTypeFiles>>{
    declare BranchTypeFileId: string;
};

BranchesTypeFiles.init(
    {
        BranchTypeFileId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'BranchesTypeFiles',
        indexes: [
            {
                unique: true,
                fields: ['BranchTypeFileId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default BranchesTypeFiles;
