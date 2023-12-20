import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IChildrenfiles {
    ChildrenFileId: string;
}

class Childrenfiles extends Model<InferAttributes<Childrenfiles>, InferCreationAttributes<Childrenfiles>>{
    declare ChildrenFileId: string;
};

Childrenfiles.init(
    {
        ChildrenFileId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'Childrenfiles',
        indexes: [
            {
                unique: true,
                fields: ['ChildrenFileId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default Childrenfiles;
