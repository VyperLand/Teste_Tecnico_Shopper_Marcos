import bodyParser from "body-parser";
import { Application } from "express-serve-static-core";

import MeasureRoute from './measureRoute'

const defaultRoute = (app: Application)=>{
    app.use(
        bodyParser.json({limit: '50mb'}),
        MeasureRoute
    );
}

export default defaultRoute;