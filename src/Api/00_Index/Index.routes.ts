/**@Dependencies */
import aH from 'express-async-handler';
import { Application, Response, Request, NextFunction } from 'express';
import { celebrate } from 'celebrate';

/**@Middlewares */
import Language from '../../Middlewares/Language.mw';
import { LanguageParams } from '../../Middlewares/Validations.mw';
import { CheckSession } from '../../Middlewares/Session.mw';

function BaseRoute(env: string, module: string): string {
    return `${env}/api/v1/:Lang/${module}`;
}

/**@Routes */
import Authorization from '../01_Users/0102_authorization/010201_index/auth.routes';
import Sessions from '../01_Users/0102_authorization/010203_sessions/sessions.routes';
import Recovery from '../01_Users/0102_authorization/010202_recovery_token/recovery.routes';
import Users from '../01_Users/0101_index/users.routes';

export default (app: Application, env: string): void => {

    /**@Users */
    app.use(
        BaseRoute(env, 'auth'),
        celebrate({ params: LanguageParams }),
        aH(Language()),
        Authorization
    );

    /**@Sessions */
    app.use(
        BaseRoute(env, 'session'),
        celebrate({ params: LanguageParams }),
        aH(Language()),
        Sessions
    );

    /**@Recovery */
    app.use(
        BaseRoute(env, 'recovery'),
        celebrate({ params: LanguageParams }),
        aH(Language()),
        Recovery
    );

    /**@Users */
    app.use(
        BaseRoute(env, 'users'),
        celebrate({ params: LanguageParams }),
        aH(Language()),
        aH(CheckSession()),
        Users
    );
}