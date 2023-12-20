import {Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey} from 'sequelize';
import Database from '../Config/Db.config';

export interface IRecoverytoken {
    TokenId: string;
}

class Recoverytoken extends Model<InferAttributes<Recoverytoken>, InferCreationAttributes<Recoverytoken>>{
    declare TokenId: string;
};

Recoverytoken.init(
    {
        TokenId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'Recoverytoken',
        indexes: [
            {
                unique: true,
                fields: ['TokenId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default Recoverytoken;
