import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import Database from '../Config/Db.config';

export interface IStates {
    StateId: string;
    Name: string;
    Code: string;
    Active: boolean;
    UpdatedAt: Date;
    CreatedAt: Date;
}

class States extends Model<InferAttributes<States>, InferCreationAttributes<States>>{
    declare StateId: string;
    declare Name: string;
    declare Code: string;
    declare Active: boolean;
    declare UpdatedAt: Date;
    declare CreatedAt: Date;
};

States.init(
    {
        StateId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        CreatedAt: {
            type: DataTypes.DATE,
            defaultValue: Database.literal('CURRENT_TIMESTAMP')
        },
        UpdatedAt: {
            type: DataTypes.DATE,
            defaultValue: Database.literal('CURRENT_TIMESTAMP')
        }
    },
    {
        tableName: 'States',
        indexes: [
            {
                unique: true,
                fields: ['StateId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default States;
