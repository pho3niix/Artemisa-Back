import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IBranches {
    InstitutionId: string;
}

class Branches extends Model<InferAttributes<Branches>, InferCreationAttributes<Branches>>{
    declare InstitutionId: string;
};

Branches.init(
    {
        InstitutionId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'Branches',
        indexes: [
            {
                unique: true,
                fields: ['InstitutionId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default Branches;
