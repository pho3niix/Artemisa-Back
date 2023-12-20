import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface ITeachers {
    TeacherId: string;
}

class Teachers extends Model<InferAttributes<Teachers>, InferCreationAttributes<Teachers>>{
    declare TeacherId: string;
};

Teachers.init(
    {
        TeacherId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'Teachers',
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

export default Teachers;
