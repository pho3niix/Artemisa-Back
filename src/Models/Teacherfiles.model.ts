import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface ITeacherfiles {
    TeacherFileId: string;
}

class Teacherfiles extends Model<InferAttributes<Teacherfiles>, InferCreationAttributes<Teacherfiles>>{
    declare TeacherFileId: string;
};

Teacherfiles.init(
    {
        TeacherFileId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'Teacherfiles',
        indexes: [
            {
                unique: true,
                fields: ['TeacherFileId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default Teacherfiles;
