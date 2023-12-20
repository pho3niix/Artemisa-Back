import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IRelationshiptype {
    RelationshipTypeId: string;
}

class Relationshiptype extends Model<InferAttributes<Relationshiptype>, InferCreationAttributes<Relationshiptype>>{
    declare RelationshipTypeId: string;
};

Relationshiptype.init(
    {
        RelationshipTypeId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'Relationshiptype',
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

export default Relationshiptype;
