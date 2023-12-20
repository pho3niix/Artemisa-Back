import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IParentsfiles {
    ParentFileId: string;
}

class Parentsfiles extends Model<InferAttributes<Parentsfiles>, InferCreationAttributes<Parentsfiles>>{
    declare ParentFileId: string;
};

Parentsfiles.init(
    {
        ParentFileId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'Parentsfiles',
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

export default Parentsfiles;
