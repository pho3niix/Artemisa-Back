import SubscriptionModel, { ISubscriptionPlans } from '../../Models/SubscriptionPlans.model';

export default async function Plans(): Promise<void> {
    const Data: ISubscriptionPlans[] = [
        { PlanId: 'd96e02eb-f676-4822-8c2b-2fc8c0f9362c', Name: 'Básico', Code: 'basic_001', Description: 'Plan básico', Price: 2500, ChildrenCapacity: 50 }
    ];

    await SubscriptionModel.bulkCreate(Data);

    console.log('Plans data created');
}