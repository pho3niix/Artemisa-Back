import { Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey } from 'sequelize';
import Database from '../Config/Db.config';

export interface IBranchesFiles {
    BranchFileId?: string;
    Name?: string;
    FileTypeId?: string;
    InstitutionId?: string;
    PrincipalId?: string;
    FileKey?: string;
    Active?: boolean;
    CreatedAt?: Date;
    UpdatedAt?: Date;
}

class BranchesFiles extends Model<InferAttributes<BranchesFiles>, InferCreationAttributes<BranchesFiles>>{
    declare BranchFileId: string;
    declare Name?: string;
    declare FileTypeId?: string;
    declare InstitutionId?: string;
    declare PrincipalId?: string;
    declare FileKey?: string;
    declare Active?: boolean;
    declare CreatedAt?: Date;
    declare UpdatedAt?: Date;
};

BranchesFiles.init(
    {
        BranchFileId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FileTypeId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        InstitutionId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        PrincipalId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        FileKey: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
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
