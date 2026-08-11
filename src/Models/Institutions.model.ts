import { Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey } from 'sequelize';
import Database from '../Config/Db.config';

/**@Associations */
import Branches from './Branches.model';
import States from './States.model';

export interface IInstitutions {
    InstitutionId?: string;
    PublicName?: string;
    Email?: string;
    LogoKey?: string;
    PhoneNumber?: string;
    Address?: string;
    CityName?: string;
    ZipCode?: string;
    StateId?: string;
    Active?: boolean;
    UpdatedAt?: Date;
    CreatedAt?: Date;
}

class Institutions extends Model<InferAttributes<Institutions>, InferCreationAttributes<Institutions>>{
    declare InstitutionId: string;
    declare PublicName: string;
    declare Email?: string;
    declare LogoKey?: string;
    declare PhoneNumber?: string;
    declare Address?: string;
    declare CityName?: string;
    declare ZipCode?: string;
    declare StateId?: string;
    declare Active?: boolean;
    declare UpdatedAt?: Date;
    declare CreatedAt?: Date;
};

Institutions.init(
    {
        InstitutionId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        PublicName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LogoKey: {
            type: DataTypes.STRING,
            allowNull: true
        },
        PhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CityName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ZipCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        StateId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
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

Institutions.hasMany(Branches, {
    foreignKey: 'InstitutionId',
    sourceKey: 'InstitutionId'
});

Branches.belongsTo(Institutions, {
    foreignKey: 'InstitutionId',
    targetKey: 'InstitutionId'
});

States.belongsTo(Institutions, {
    foreignKey: 'StateId',
    targetKey: 'StateId'
})

export default Institutions;
