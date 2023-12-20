import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IClassroom {
    ClassRoomId: string;
}

class Classroom extends Model<InferAttributes<Classroom>, InferCreationAttributes<Classroom>>{
    declare ClassRoomId: string;
};

Classroom.init(
    {
        ClassRoomId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'Classroom',
        indexes: [
            {
                unique: true,
                fields: ['ClassRoomId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default Classroom;
