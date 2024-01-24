import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface ITeacherFiles {
    TeacherFileId: string;
}

class TeacherFiles extends Model<InferAttributes<TeacherFiles>, InferCreationAttributes<TeacherFiles>>{
    declare TeacherFileId: string;
};

TeacherFiles.init(
    {
        TeacherFileId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'TeacherFiles',
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

export default TeacherFiles;
