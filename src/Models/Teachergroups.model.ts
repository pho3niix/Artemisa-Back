import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface ITeacherGroups {
    TeacherId: string;
}

class TeacherGroups extends Model<InferAttributes<TeacherGroups>, InferCreationAttributes<TeacherGroups>>{
    declare TeacherId: string;
};

TeacherGroups.init(
    {
        TeacherId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'TeacherGroups',
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

export default TeacherGroups;
