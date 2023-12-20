import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IRelationship {
    ChildrenId: string;
}

class Relationship extends Model<InferAttributes<Relationship>, InferCreationAttributes<Relationship>>{
    declare ChildrenId: string;
};

Relationship.init(
    {
        ChildrenId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'Relationship',
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

export default Relationship;
