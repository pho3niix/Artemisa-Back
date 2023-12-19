import { Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey } from 'sequelize';
import Database from '../Config/Db.config';

/**@Associations */
import Users from './Users.model';

export interface ISessions {
    SessionId: string;
    Token: string;
    OwnerUserId: ForeignKey<Users['UserId']>;
    ExpiresAt: Date;
    UpdatedAt: Date;
    CreatedAt: Date;
}

class Sessions extends Model<InferAttributes<Sessions>, InferCreationAttributes<Sessions>>{
    declare SessionId: string;
    declare Token: string;
    declare OwnerUserId: ForeignKey<Users['UserId']>;
    declare ExpiresAt: Date;
    declare UpdatedAt: Date;
    declare CreatedAt: Date;
}

Sessions.init(
    {
        SessionId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        Token: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        ExpiresAt: {
            type: DataTypes.DATE,
            defaultValue: Database.literal('CURRENT_TIMESTAMP')
        },
        OwnerUserId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        CreatedAt: {
            type: DataTypes.DATE,
            defaultValue: Database.literal('CURRENT_TIMESTAMP')
        },
        UpdatedAt: {
            type: DataTypes.DATE,
            defaultValue: Database.literal('CURRENT_TIMESTAMP')
        }
    },
    {
        tableName: 'Sessions',
        indexes: [
            {
                unique: true,
                fields: ['SessionId']
            },
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database
    }
)

export default Sessions;