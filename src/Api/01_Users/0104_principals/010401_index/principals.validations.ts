import { Validations } from '../../../00_Index/Index.middlewares';

class Rules {

    public PrincipalParams: {
        PrincipalId: string;
    }

    constructor() {
        this.PrincipalParams = Validations.JoiObjectKeys({
            PrincipalId: Validations.RequiredUUID("Principals PrincipalId")
        })
    }
}

export default new Rules();