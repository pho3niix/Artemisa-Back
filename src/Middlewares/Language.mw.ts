import MyError from "./Error.mw";
import { Request, Response, NextFunction } from "express";

export default () => (req: Request, res: Response, next: NextFunction) => {
    const {
        Lang
    }: {
        Lang?: 'sp' | 'en'
    } = req.params;

    //@FLAG Activar cuando manejo de idiomas esté disponible.
    // const ValidLanguages: string[] = ['sp','en'];
    const ValidLanguages: string[] = ['sp'];

    if (ValidLanguages.includes(Lang)) {
        res.locals.Lang = Lang;
        return next();
    } else {
        return next(new MyError(404, `This language '${Lang}' does not allowed.`))
    }
}