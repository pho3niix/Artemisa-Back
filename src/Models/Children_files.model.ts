import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IChildrenFiles {
    ChildrenTypeId: string;
}

class ChildrenFiles extends Model<InferAttributes<ChildrenFiles>, InferCreationAttributes<ChildrenFiles>>{
    declare ChildrenTypeId: string;
};

ChildrenFiles.init(
    {
        ChildrenTypeId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'ChildrenFiles',
        indexes: [
            {
                unique: true,
                fields: ['ChildrenTypeId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default ChildrenFiles;
