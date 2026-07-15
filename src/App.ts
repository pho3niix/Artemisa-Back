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
    let { Password, NewPassword, ConfirmNewPassword, ConfirmPassword } = req.body;
    let body = { ...req.body };
    let { Token } = req.query;
    let queries = { ...req.query };

    if (Password) body.Password = "*********";
    if (NewPassword) body.NewPassword = "*********";
    if (ConfirmNewPassword) body.ConfirmNewPassword = "*********";
    if (ConfirmPassword) body.ConfirmPassword = "*********";
    if (Token) queries.Token = "*********";
    
    console.log({
        body: body,
        params: req.params,
        query: queries
    });

    let {
        Start,
        End
    } = req.query;

    // Flag
    if ((Start && End)) {
        let DateStart = Services.AddDays(new Date(Start as string), 1);
        let DateEnd = Services.AddDays(new Date(End as string), 1);

        if (Start.toString() == 'Invalid Date') return next(new MyError(409, ValidationMessages.JoiValidationError.Filters.Start["sp"]))
        if (End.toString() == 'Invalid Date') return next(new MyError(409, ValidationMessages.JoiValidationError.Filters.End["sp"]))

        DateStart.setHours(0);
        DateStart.setMinutes(0);
        DateStart.setSeconds(0);
        DateEnd.setHours(23);
        DateEnd.setMinutes(59);
        DateEnd.setSeconds(59);
        req.query.Start = DateStart.toISOString();
        req.query.End = DateEnd.toISOString();
    }
    return next();
});

/**Cors headers */
const corsOptions = {
    origin: 'http://localhost:5003', // El puerto de tu frontend
    credentials: true,               // ESTO ES LO QUE HACE QUE LA COOKIE SE GUARDE
};

app.use(cors(corsOptions));

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