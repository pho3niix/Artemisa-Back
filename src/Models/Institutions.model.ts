import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IInstitutions {
    InstitutionId: string;
}

class Institutions extends Model<InferAttributes<Institutions>, InferCreationAttributes<Institutions>>{
    declare InstitutionId: string;
};

Institutions.init(
    {
        InstitutionId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'Institutions',
        indexes: [
            {
                unique: true,
                fields: ['InstitutionId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default Institutions;
