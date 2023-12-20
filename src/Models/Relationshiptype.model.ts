import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IRelationshipType {
    RelationshipTypeId: string;
}

class RelationshipType extends Model<InferAttributes<RelationshipType>, InferCreationAttributes<RelationshipType>>{
    declare RelationshipTypeId: string;
};

RelationshipType.init(
    {
        RelationshipTypeId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'RelationshipType',
        indexes: [
            {
                unique: true,
                fields: ['RelationshipTypeId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default RelationshipType;
