/*
 — Each file must contain a short description with the next instructions:
    1) File's corresponding model / module.
    2) File's use with the objective or short description.
*/
/******************@Flags_Definition ******************/
/**@GreenFlag -> No es necesario para continuar pero si para cumplir el requerimiento (Representa una funcionalidad incompleta). */
/**@YellowFlag -> No impide el funcionamiento a corto plazo (No es del todo necesario en la fase de desarrollo). */
/**@RedFlag -> Impide por completo el funcionamiento. */

require("dotenv").config({ path: ".env" });
/**Requierements */
import express, { Express, Request, Response, NextFunction } from "express";
import Services from './Services/Index.services';
import cors from "cors";
import logger from "morgan";
import path from "path";
import moment from 'moment';
import tz from 'moment-timezone'
import Routes from './Api/00_Index/Index.routes';
moment.locale('es');
tz.tz.setDefault('America/Monterrey')
let customMonths = 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_');
moment.updateLocale('es', { months: customMonths });
import ValidationMessages from './Utils/ValidationError.util';
import MyError from './Middlewares/Error.mw';
import ErrHandler from './Middlewares/ErrorHandler';

const app: Express = express();

/**Logger */
logger.token('localDate', function getDate(req) {
    let date = new Date();
    return process.env.NODE_ENV != 'production' ? date.toLocaleString('en-US', { timeZone: 'America/Monterrey' }) : Services.GetDate(date).toLocaleString('en-US', { timeZone: 'America/Monterrey' })
});
logger.format('combined', ':method - :status [:localDate] :url :res[content-length] :response-time');

/**Security Requirements */
import helmet from "helmet";

/**Middleware requirements */
let Environment = Services.GetEnvironment(process.env.NODE_ENV);

// import ErrHandler from "./Middlewares/ErrorHandler.mw";

import SendAsJson, { Logs } from "./Middlewares/SendAsJson.mw";

if (process.env.NODE_ENV != "development" && !process.env.NODE_ENV.includes('local')) {
    app.use(function (req: Request, res: Response, next: NextFunction) {
        res.setTimeout(10000, function () {
            return res.status(408).json({
                message: "Request timeout.",
                status: false
            })
        });
        return next();
    });
}

/**Variable definitions */
const Port: number | string = process.env.NODE_PORT || 3000;
const ProjectName: string = process.env.PROJECT_NAME;

/**Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(logger('combined'));

app.get(`${Environment}/password-recovery`, (req: Request, res: Response, next: NextFunction) => {
    let html = path.join(__dirname, '/Views/recovery/template.html')
    return res.sendFile(html)
});
app.use(express.static(path.join(__dirname, '/Views/recovery')));

app.use((req: Request, res: Response, next: NextFunction): void => {
    let { sPassword } = req.body;
    let body = { ...req.body };
    if (sPassword) body.sPassword = "*********";
    console.log({
        body: body,
        params: req.params,
        query: req.query
    });

    let {
        tStart,
        tEnd
    } = req.query;

    // Flag
    if ((tStart && tEnd)) {
        let Start = Services.AddDays(new Date(tStart as string), 1);
        let End = Services.AddDays(new Date(tEnd as string), 1);

        if (Start.toString() == 'Invalid Date') return next(new MyError(409, ValidationMessages.JoiValidationError.Filters.Start["sp"]))
        if (End.toString() == 'Invalid Date') return next(new MyError(409, ValidationMessages.JoiValidationError.Filters.End["sp"]))

        Start.setHours(0);
        Start.setMinutes(0);
        Start.setSeconds(0);
        End.setHours(23);
        End.setMinutes(59);
        End.setSeconds(59);
        req.query.tStart = Start.toISOString();
        req.query.tEnd = End.toISOString();
    }
    return next();
});

/**Cors headers */
app.use(function (req: Request, res: Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    return next();
});
app.use(cors());

/**Start Route */
app.get(`${Environment}`, (req: Request, res: Response, next: NextFunction): object => {
    console.log(Environment)
    return res.status(200).json({
        Message: `${ProjectName} API ${process.env.NODE_ENV} is up and running on port ${Port}`,
    });
});

Routes(app, Environment);

/**Error Handlers */
app.use(ErrHandler());
app.use(SendAsJson());

export default app;