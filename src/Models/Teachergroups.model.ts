import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface ITeachergroups {
    TeacherId: string;
}

class Teachergroups extends Model<InferAttributes<Teachergroups>, InferCreationAttributes<Teachergroups>>{
    declare TeacherId: string;
};

Teachergroups.init(
    {
        TeacherId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'Teachergroups',
        indexes: [
            {
                unique: true,
                fields: ['TeacherId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default Teachergroups;
