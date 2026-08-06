import { Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey } from 'sequelize';
import Database from '../Config/Db.config';

/**@Associations */
import Institutions from './Institutions.model';
import Principals from './Principals.model';

export interface IBranches {
    InstitutionId: string;
    PrincipalId: string;
}

class Branches extends Model<InferAttributes<Branches>, InferCreationAttributes<Branches>>{
    declare InstitutionId: string;
    declare PrincipalId: string;
};

Branches.init(
    {
        InstitutionId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        PrincipalId: {
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
                fields: ['InstitutionId', 'PrincipalId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default Branches;
