import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import Database from '../Config/Db.config';

export interface IUsers {
    UserId: string;
    Name: string;
    Lastname: string;
    Email: string;
    Password: string;
    PhoneNumber: string;
    PhoneExtension: string;
    PlatformAccess: boolean;
    Active: boolean;
    UpdatedAt: Date;
    CreatedAt: Date;
    FullName: string;
}

class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>>{
    declare UserId: string;
    declare Name: string;
    declare Lastname: string;
    declare Email: string;
    declare Password: string;
    declare PhoneNumber: string;
    declare PhoneExtension: string;
    declare PlatformAccess: boolean;
    declare Active: boolean;
    declare UpdatedAt: Date;
    declare CreatedAt: Date;
    declare FullName: string;
};

Users.init(
    {
        UserId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Password: {
            type: DataTypes.STRING
        },
        PhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PhoneExtension: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PlatformAccess: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        Active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        CreatedAt: {
            type: DataTypes.DATE,
            defaultValue: Database.literal('CURRENT_TIMESTAMP')
        },
        UpdatedAt: {
            type: DataTypes.DATE,
            defaultValue: Database.literal('CURRENT_TIMESTAMP')
        },
        FullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.Name} ${this.Lastname}`
            },
        }
    },
    {
        tableName: 'Users',
        indexes: [
            {
                unique: true,
                fields: ['sUserId']
            }
        ],
        createdAt: "tCreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "tUpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

// Users.hasMany(RecoveryPasswordToken, { sourceKey: 'sUserId', foreignKey: 'sOwnerUserId' });
// Users.hasMany(Sessions, { sourceKey: 'sUserId', foreignKey: 'sOwnerUserId' });

export default Users;
