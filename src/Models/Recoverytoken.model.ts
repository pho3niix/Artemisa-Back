import { Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey } from 'sequelize';
import Database from '../Config/Db.config';

/**@Associations */
import Users from './Users.model';

export interface IRecoveryToken {
    RecoveryTokenId: string;
    UserId: string;
    Token: string;
    ExpiresAt: Date;
    CreatedAt: Date;
}

class RecoveryToken extends Model<InferAttributes<RecoveryToken>, InferCreationAttributes<RecoveryToken>>{
    declare RecoveryTokenId: string;
    declare UserId: ForeignKey<Users['UserId']>;
    declare Token: string;
    declare ExpiresAt: Date;
    declare CreatedAt: Date;
};

RecoveryToken.init(
    {
        RecoveryTokenId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        Token: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        UserId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        ExpiresAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        CreatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName: 'RecoveryToken',
        indexes: [
            {
                unique: true,
                fields: ['RecoveryTokenId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

export default RecoveryToken;
