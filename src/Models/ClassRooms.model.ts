import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IClassRooms {
    ClassRoomId: string;
}

class ClassRooms extends Model<InferAttributes<ClassRooms>, InferCreationAttributes<ClassRooms>>{
    declare ClassRoomId: string;
};

ClassRooms.init(
    {
        ClassRoomId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'ClassRooms',
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

export default ClassRooms;
