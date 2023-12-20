import { Joi } from "celebrate";

export function RequiredBoolean(error: string): typeof Joi {
    return Joi.boolean().required().error(new Error(error));
}

export function Boolean(error: string): typeof Joi {
    return Joi.boolean().error(new Error(error));
}

export function RequiredArray(error: string): typeof Joi {
    return Joi.array().required().error(new Error(error))
}

export function Array(error: string): typeof Joi {
    return Joi.array().error(new Error(error))
}

export function RequiredArrayItems(error: string, items: object): typeof Joi {
    return Joi.array().required().items(items).error(new Error(error)).min(1)
}

export function ArrayItems(error: string, items: object): typeof Joi {
    return Joi.array().items(items).error(new Error(error)).min(1)
}

export function UUID(error: string) {
    return Joi.string().guid().trim().allow('').allow(null).error(new Error(error));
}

export function UUIDArray(error: string): typeof Joi {
    return Joi.array().items(Joi.string().guid()).error(new Error(error)).min(1)
}

export function RequiredUUID(error: string): typeof Joi {
    return Joi.string().guid().trim().required().error(new Error(error));
}

export function RequiredUUIDAllowNull(error: string): typeof Joi {
    return Joi.string().guid().trim().allow(null).required().error(new Error(error));
}

export function UUIDAllowNull(error: string): typeof Joi {
    return Joi.string().guid().trim().allow(null).error(new Error(error));
}

export function RequiredUUIDArray(error: string): typeof Joi {
    return Joi.array().required().items(Joi.string().guid()).error(new Error(error)).min(1)
}

export function EmptyUUIDArray(error: string): typeof Joi {
    return Joi.array().items(Joi.string().guid()).error(new Error(error)).allow(null)
}

export function RequiredString(error: string): typeof Joi {
    return Joi.string().trim().required().error(new Error(error));
}

export function RequiredStringLength(error: string, length?: number): typeof Joi {
    return Joi.string().trim().required().max(length).error(new Error(error));
}

export function RequiredLowString(error: string): typeof Joi {
    return Joi.string().trim().required().lowercase().error(new Error(error));
}

export function RequiredNumber(error: string): typeof Joi {
    return Joi.number().required().error(new Error(error));
}

export function RequiredNumberAllowZero(error: string): typeof Joi {
    return Joi.number().required().error(new Error(error));
}

export function RequiredNumberAllowNegative(error: string): typeof Joi {
    return Joi.number().required().error(new Error(error));
}

export function Number(error: string): typeof Joi {
    return Joi.number().error(new Error(error));
}

export function String(error: string): typeof Joi {
    return Joi.string().trim().allow("").allow(null).error(new Error(error));
}

export function StringNotEmpty(error: string): typeof Joi {
    return Joi.string().trim().error(new Error(error));
}

export function StringLength(error: string, length: number): typeof Joi {
    return Joi.string().trim().allow("").max(length).allow(null).error(new Error(error));
}

export function StringSort(error: string): typeof Joi {
    return Joi.string().trim().valid('asc', 'desc').allow("").allow(null).error(new Error(error));
}

export function CorrectPassword(error: string): typeof Joi {
    return Joi.string().required().trim().regex(/(^[a-zA-Z0-9])*(^[a-zA-Z0-9?_`~;:!#%*+=@&.]+$)/).min(6).error(new Error(error));
}

export function RequiredCorrectEmail(error: string): typeof Joi {
    return Joi.string().trim().email().lowercase().options({
        convert: true
    }).max(70).regex(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3}){1,2})$/).required().error(new Error(error));
}

export function CorrectEmail(error: string): typeof Joi {
    return Joi.string().trim().allow("").allow(null).email().lowercase().options({
        convert: true
    }).max(70).regex(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3}){1,2})$/).error(new Error(error));
}

export function CorrectPhoneNumber(error: string): typeof Joi {
    return Joi.string()
        .trim()
        .allow("").allow(null)
        .min(7)
        .max(10)
        .regex(/^([0-9])+$/)
        .error(new Error(error));
}

export function RequiredCorrectPhoneNumber(error: string): typeof Joi {
    return Joi.string()
        .trim()
        .min(7)
        .max(10)
        .regex(/^([0-9])+$/)
        .required()
        .error(new Error(error));
}

export function RequiredNumberRange(error: string, min: number, max: number): typeof Joi {
    return Joi.number()
        .min(min)
        .max(max)
        .required()
        .error(new Error(error));
}

export function RequiredStringRange(error: string, min: number, max: number): typeof Joi {
    return Joi.string()
        .trim()
        .min(min)
        .max(max)
        .required()
        .error(new Error(error));
}

export function StringRange(error: string, min: number, max: number): typeof Joi {
    return Joi.string()
        .trim()
        .allow("").allow(null)
        .min(min)
        .max(max)
        .error(new Error(error));
}

export function RequiredStringNumberRange(error: string, min: number, max: number): typeof Joi {
    return Joi.string()
        .trim()
        .min(min)
        .max(max)
        .regex(/^([0-9])+$/)
        .required()
        .error(new Error(error));
}

export function StringNumberRange(error: string, min: number, max: number): typeof Joi {
    return Joi.string()
        .trim()
        .allow("").allow(null)
        .min(min)
        .max(max)
        .regex(/^([0-9])+$/)
        .error(new Error(error));
}

export function StringNumberRangeNotEmpty(error: string, min: number, max: number): typeof Joi {
    return Joi.string()
        .trim()
        .allow(null)
        .min(min)
        .max(max)
        .regex(/^([0-9])+$/)
        .error(new Error(error));
}

export function StringNumber(error: string): typeof Joi {
    return Joi.string()
        .trim()
        .allow("").allow(null)
        .regex(/^([0-9])+$/)
        .error(new Error(error));
}

export function NumberRange(error: string, min: number, max: number): typeof Joi {
    return Joi.number()
        .min(min)
        .max(max)
        .regex(/^([0-9])+$/)
        .required()
        .error(new Error(error));
}

export function RequiredDate(error: string): typeof Joi {
    return Joi.date()
        .iso()
        .required()
        .error(new Error(error))
}

export function OptionalDate(error: string): typeof Joi {
    return Joi.date()
        .iso()
        .error(new Error(error))
}

export function CorrectStartDate(error: string): typeof Joi {
    return Joi.date()
        .iso()
        .allow("").allow(null)
        .error(new Error(error));
}

export function CorrectEndDate(error: string): typeof Joi {
    return Joi.date()
        .iso()
        // .greater(Joi.ref("tStart"))
        .allow("").allow(null)
        .error(new Error(error));
}

export const Filters = {
    Search: Joi.string().lowercase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").allow("").allow(null).error(new Error("Filters sSearch")),
    PageNumber: Joi.number()
        .min(1)
        .allow()
        .error(new Error("Filters PageNumber")),
    ItemsPerPage: Joi.number()
        .allow("").allow(null)
        .min(1)
        .error(new Error("Filters ItemsPerPage")),
};

export const LanguageParams: object = {
    Lang: Joi.string().required().error(new Error("Translations Lang"))
}

export function JoiObjectKeys(oKeys: any) {
    return Joi.object().keys(oKeys)
}