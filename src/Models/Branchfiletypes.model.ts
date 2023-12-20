import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IBranchfiletypes {
    BranchFileTypeId: string;
}

class Branchfiletypes extends Model<InferAttributes<Branchfiletypes>, InferCreationAttributes<Branchfiletypes>>{
    declare BranchFileTypeId: string;
};

Branchfiletypes.init(
    {
        BranchFileTypeId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'Branchfiletypes',
        indexes: [
            {
                unique: true,
                fields: ['BranchFileTypeId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default Branchfiletypes;
