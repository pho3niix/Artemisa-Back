import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IChildren {
    ChildrenId: string;
}

class Children extends Model<InferAttributes<Children>, InferCreationAttributes<Children>>{
    declare ChildrenId: string;
};

Children.init(
    {
        ChildrenId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'Children',
        indexes: [
            {
                unique: true,
                fields: ['ChildrenId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default Children;
