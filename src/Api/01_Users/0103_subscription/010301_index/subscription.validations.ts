import { Joi } from 'celebrate';
import { Validations } from '../../../00_Index/Index.middlewares';

class Rules {

    public PlanBody: object;

    public PlanParams: {
        PlanId: string
    }

    constructor() {
        this.PlanBody = Validations.JoiObjectKeys({
            Name: Validations.RequiredStringLength('Plans Name', 50),
            Code: Validations.RequiredStringLength('Plans Code', 10),
            Description: Validations.RequiredStringLength('Plans Description', 255),
            Price: Validations.RequiredNumber('Plans Price'),
            ChildrenCapacity: Validations.RequiredNumber('Plans ChildrenCapacity')
        })
        this.PlanParams = Validations.JoiObjectKeys({
            PlanId: Validations.RequiredUUID('Plans PlanId')
        })
    }
}

export default new Rules();