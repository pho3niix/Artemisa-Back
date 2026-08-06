import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IBranchesTypeFiles {
    BranchTypeFileId: string;
    Name?: string;
    Code?: string;
    CreatedAt?: Date;
    UpdatedAt?: Date;
}

class BranchesTypeFiles extends Model<InferAttributes<BranchesTypeFiles>, InferCreationAttributes<BranchesTypeFiles>>{
    declare BranchTypeFileId: string;
    declare Name?: string;
    declare Code?: string;
    declare CreatedAt?: Date;
    declare UpdatedAt?: Date;
};

BranchesTypeFiles.init(
    {
        BranchTypeFileId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CreatedAt: {
            type: DataTypes.DATE,
            defaultValue: Database.literal('CURRENT_TIMESTAMP')
        },
        UpdatedAt: {
            type: DataTypes.DATE,
            defaultValue: Database.literal('CURRENT_TIMESTAMP')
        },
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
