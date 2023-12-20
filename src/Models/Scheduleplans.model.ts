import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IScheduleplans {
    SchedulePlanId: string;
}

class Scheduleplans extends Model<InferAttributes<Scheduleplans>, InferCreationAttributes<Scheduleplans>>{
    declare SchedulePlanId: string;
};

Scheduleplans.init(
    {
        SchedulePlanId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'Scheduleplans',
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

export default Scheduleplans;
