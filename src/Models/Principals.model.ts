import { Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey } from 'sequelize';
import Database from '../Config/Db.config';

export interface IPrincipals {
    PrincipalId: string;
    PlanId?: string;
}

class Principals extends Model<InferAttributes<Principals>, InferCreationAttributes<Principals>>{
    declare PrincipalId: string;
    declare PlanId: string;
};

Principals.init(
    {
        PrincipalId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        PlanId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: true
        },
    },
    {
        tableName: 'Principals',
        indexes: [
            {
                unique: true,
                fields: ['PrincipalId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default Principals;
