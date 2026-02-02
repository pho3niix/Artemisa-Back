import { Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey } from 'sequelize';
import Database from '../Config/Db.config';

export interface ISubscriptionPlans {
    PlanId: string;
    Name: string;
    Code: string;
    Description: string;
    Price: number;
    ChildrenCapacity: number;
    Active?: boolean;
    UpdatedAt?: Date;
    CreatedAt?: Date;
}

class SubscriptionPlans extends Model<InferAttributes<SubscriptionPlans>, InferCreationAttributes<SubscriptionPlans>>{
    declare PlanId: string;
    declare Name: string;
    declare Code: string;
    declare Description: string;
    declare Price: number;
    declare ChildrenCapacity: number;
    declare Active: boolean;
    declare UpdatedAt: Date;
    declare CreatedAt: Date;
};

SubscriptionPlans.init(
    {
        PlanId: {
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
        Description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ChildrenCapacity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        CreatedAt: {
            type: DataTypes.DATE,
            defaultValue: Database.literal('CURRENT_TIMESTAMP')
        },
        UpdatedAt: {
            type: DataTypes.DATE,
            defaultValue: Database.literal('CURRENT_TIMESTAMP')
        },
        Active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    },
    {
        tableName: 'SubscriptionPlans',
        indexes: [
            {
                unique: true,
                fields: ['PlanId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default SubscriptionPlans;
