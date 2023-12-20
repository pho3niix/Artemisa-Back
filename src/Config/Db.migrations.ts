import Db from './Db.config';
import Users from "../Models/Users.model";
import Sessions from "../Models/Sessions.model";
import RecoveryToken from "../Models/Recoverytoken.model";
import States from "../Models/States.model";
import Institutions from "../Models/Institutions.model";
import Branches from "../Models/Branches.model";
import BranchFileTypes from "../Models/BranchFileTypes.model";
import BranchFiles from "../Models/BranchFiles.model";
import MedicalService from "../Models/Medicalservice.model";
import MedicalServiceFiles from "../Models/Medicalservicefiles.model";
import ClassRoom from "../Models/Classroom.model";
import Teachers from "../Models/Teachers.model";
import TeacherGroups from "../Models/Teachergroups.model";
import TeacherFiles from "../Models/Teacherfiles.model";
import SchedulePlans from "../Models/Scheduleplans.model";
import Children from "../Models/Children.model";
import RelationshipType from "../Models/Relationshiptype.model";
import RelationShip from "../Models/Relationship.model";
import Parents from "../Models/Parents.model";
import ReceptionType from "../Models/Receptiontype.model";
import Reception from "../Models/Reception.model";
import ParentsFiles from "../Models/Parentsfiles.model";
import ChildrenFiles from "../Models/Childrenfiles.model";

function Migrations() {
    return (async () => {
        await Db.sync({ alter: true });

        await Db.query(`CREATE EXTENSION IF NOT EXISTS unaccent`);

        console.log('ChildrenFiles', ChildrenFiles == Db.models.ChildrenFiles);
        console.log('ParentsFiles', ParentsFiles == Db.models.ParentsFiles);
        console.log('Reception', Reception == Db.models.Reception);
        console.log('ReceptionType', ReceptionType == Db.models.ReceptionType);
        console.log('Parents', Parents == Db.models.Parents);
        console.log('RelationShip', RelationShip == Db.models.RelationShip);
        console.log('RelationshipType', RelationshipType == Db.models.RelationshipType);
        console.log('Children', Children == Db.models.Children);
        console.log('SchedulePlans', SchedulePlans == Db.models.SchedulePlans);
        console.log('TeacherFiles', TeacherFiles == Db.models.TeacherFiles);
        console.log('TeacherGroups', TeacherGroups == Db.models.TeacherGroups);
        console.log('Teachers', Teachers == Db.models.Teachers);
        console.log('ClassRoom', ClassRoom == Db.models.ClassRoom);
        console.log('MedicalServiceFiles', MedicalServiceFiles == Db.models.MedicalServiceFiles);
        console.log('MedicalService', MedicalService == Db.models.MedicalService);
        console.log('BranchFiles', BranchFiles == Db.models.BranchFiles);
        console.log('BranchFileTypes', BranchFileTypes == Db.models.BranchFileTypes);
        console.log('Branches', Branches == Db.models.Branches);
        console.log('Institutions', Institutions == Db.models.Institutions);
        console.log('States', States == Db.models.States);
        console.log('RecoveryToken', RecoveryToken == Db.models.RecoveryToken);
        console.log('Sessions', Sessions == Db.models.Sessions);
        console.log('Users', Users == Db.models.Users);

        console.log('Migration completed.');

        return process.exit(0)
    })();
}

export default Migrations();