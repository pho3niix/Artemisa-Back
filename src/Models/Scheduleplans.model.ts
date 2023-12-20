import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface ISchedulePlans {
    SchedulePlanId: string;
}

class SchedulePlans extends Model<InferAttributes<SchedulePlans>, InferCreationAttributes<SchedulePlans>>{
    declare SchedulePlanId: string;
};

SchedulePlans.init(
    {
        SchedulePlanId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'SchedulePlans',
        indexes: [
            {
                unique: true,
                fields: ['SchedulePlanId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default SchedulePlans;
