import { Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey } from 'sequelize';
import Database from '../Config/Db.config';

/**@Associations */
import RecoveryToken from './Recovery_token.model';
import Sessions from './Sessions.model';
import Principals from './Principals.model';

export interface IUsers {
    UserId: string;
    Name: string;
    LastName: string;
    Email: string;
    Password: string;
    ProfilePicture: string;
    PhoneNumber: string;
    PlatformAccess: boolean;
    Active: boolean;
    UpdatedAt: Date;
    CreatedAt: Date;
    FullName: string;
}

class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>>{
    declare UserId: string;
    declare Name: string;
    declare LastName: string;
    declare Email: string;
    declare Password: string;
    declare ProfilePicture: string;
    declare PhoneNumber: string;
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
        LastName: {
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
        ProfilePicture: {
            type: DataTypes.STRING
        },
        PhoneNumber: {
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
                return `${this.Name} ${this.LastName}`
            },
        }
    },
    {
        tableName: 'Users',
        indexes: [
            {
                unique: true,
                fields: ['UserId']
            }
        ],
        createdAt: "CreatedAt", // alias createdAt as tCreatedAt
        updatedAt: "UpdatedAt", // alias updatedAt as tUpdatedAt
        sequelize: Database, // passing the `sequelize` instance is required
    },
);

Users.hasMany(RecoveryToken, { sourceKey: 'UserId', foreignKey: 'UserId' });
Users.hasMany(Sessions, { sourceKey: 'UserId', foreignKey: 'UserId' });

Users.hasOne(Principals, {
	foreignKey: 'PrincipalId',
	sourceKey: 'UserId'
});

Principals.belongsTo(Users, {
    foreignKey: 'PrincipalId',
    targetKey: 'UserId'
});

export default Users;
