import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IBranchfiles {
    BranchFileId: string;
}

class Branchfiles extends Model<InferAttributes<Branchfiles>, InferCreationAttributes<Branchfiles>>{
    declare BranchFileId: string;
};

Branchfiles.init(
    {
        BranchFileId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'Branchfiles',
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

export default Branchfiles;
