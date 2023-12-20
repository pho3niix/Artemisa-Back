import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IReceptiontype {
    ReceptionTypeId: string;
}

class Receptiontype extends Model<InferAttributes<Receptiontype>, InferCreationAttributes<Receptiontype>>{
    declare ReceptionTypeId: string;
};

Receptiontype.init(
    {
        ReceptionTypeId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'Receptiontype',
        indexes: [
            {
                unique: true,
                fields: ['ReceptionTypeId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default Receptiontype;
