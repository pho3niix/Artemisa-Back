/**@Dependencies */
import aH from 'express-async-handler';
import { Application, Response, Request, NextFunction } from 'express';
import { celebrate } from 'celebrate';

/**@Middlewares */
import Language from '../../Middlewares/Language.mw';
import { LanguageParams } from '../../Middlewares/Validations.mw';
import { CheckSession } from '../../Middlewares/Session.mw';

function BaseRoute(env: string, module: string): string {
    return `${env}/api/v1/:sLang/${module}`;
}

/**@Routes */

export default (app: Application, env: string): void => {

}