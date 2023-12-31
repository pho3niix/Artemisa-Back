import Db from './Db.config';
import ChildrenFiles from "../Models/ChildrenFiles.model";
import ParentFiles from "../Models/ParentFiles.model";
import Reception from "../Models/Reception.model";
import ReceptionType from "../Models/ReceptionType.model";
import Parents from "../Models/Parents.model";
import Relationship from "../Models/Relationship.model";
import RelationshipType from "../Models/RelationshipType.model";
import Children from "../Models/Children.model";
import SchedulePlans from "../Models/SchedulePlans.model";
import TeacherFiles from "../Models/TeacherFiles.model";
import TeacherGroups from "../Models/TeacherGroups.model";
import Teachers from "../Models/Teachers.model";
import Groups from "../Models/Groups.model";
import MedicalServiceFiles from "../Models/MedicalServiceFiles.model";
import MedicalService from "../Models/MedicalService.model";
import BranchesFiles from "../Models/BranchesFiles.model";
import BranchesTypeFiles from "../Models/BranchesTypeFiles.model";
import Branches from "../Models/Branches.model";
import Institutions from "../Models/Institutions.model";
import States from "../Models/States.model";
import RecoveryToken from "../Models/RecoveryToken.model";
import Sessions from "../Models/Sessions.model";
import Users from "../Models/Users.model";
import Principals from '../Models/Principals.model';
import Plans from '../Models/Plans.model';

/**@RecoveryToken */
RecoveryToken.belongsTo(Users, { targetKey: 'UserId', foreignKey: 'UserId' });

/**@Sessions */
Sessions.belongsTo(Users, { targetKey: 'UserId', foreignKey: 'UserId', as: 'Users' });

/**@Principals */
Principals.belongsTo(Users, { targetKey: 'UserId', foreignKey: 'PrincipalId', as: 'Users' });
Principals.belongsTo(Plans, { targetKey: 'PlanId', foreignKey: 'PlanId', as: 'Plans' });

function Migrations() {
	return (async () => {
		await Db.sync({ alter: true });

		await Db.query(`CREATE EXTENSION IF NOT EXISTS unaccent`);

		console.log('Users', Users == Db.models.Users);
		console.log('Sessions', Sessions == Db.models.Sessions);
		console.log('RecoveryToken', RecoveryToken == Db.models.RecoveryToken);
		console.log('States', States == Db.models.States);
		console.log('Institutions', Institutions == Db.models.Institutions);
		console.log('Branches', Branches == Db.models.Branches);
		console.log('BranchesTypeFiles', BranchesTypeFiles == Db.models.BranchesTypeFiles);
		console.log('BranchesFiles', BranchesFiles == Db.models.BranchesFiles);
		console.log('MedicalService', MedicalService == Db.models.MedicalService);
		console.log('MedicalServiceFiles', MedicalServiceFiles == Db.models.MedicalServiceFiles);
		console.log('Groups', Groups == Db.models.Groups);
		console.log('Teachers', Teachers == Db.models.Teachers);
		console.log('TeacherGroups', TeacherGroups == Db.models.TeacherGroups);
		console.log('TeacherFiles', TeacherFiles == Db.models.TeacherFiles);
		console.log('SchedulePlans', SchedulePlans == Db.models.SchedulePlans);
		console.log('Children', Children == Db.models.Children);
		console.log('RelationshipType', RelationshipType == Db.models.RelationshipType);
		console.log('Relationship', Relationship == Db.models.Relationship);
		console.log('Parents', Parents == Db.models.Parents);
		console.log('ReceptionType', ReceptionType == Db.models.ReceptionType);
		console.log('Reception', Reception == Db.models.Reception);
		console.log('ParentFiles', ParentFiles == Db.models.ParentFiles);
		console.log('ChildrenFiles', ChildrenFiles == Db.models.ChildrenFiles);
		console.log('Plans', Plans == Db.models.Plans);
		console.log('Principals', Principals == Db.models.Principals);

		console.log('Migration completed.');

		return process.exit(0)
	})();
}

export default Migrations();