import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { create } from "express-handlebars";
import createError from "http-errors";
import logger from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
// Handlebars helpers
import helpers from "./helpers";

// Routers
import router from "./router";

dotenv.config();

const app: Application = express();
const port = process.env.PORT ?? 3000;

const hbs = create({
    encoding: "utf-8",
    defaultLayout: "main",
    extname: "hbs",
    layoutsDir: `${process.cwd()}/views/layouts`,
    partialsDir: `${process.cwd()}/views/partials`,
    helpers: helpers,
});

app.set("views", `${process.cwd()}/views`);
app.set("view engine", "hbs");
app.engine("hbs", hbs.engine);

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(`${process.cwd()}/public`));

// Routes
app.use(router);

app.use((_: Request, __: Response, next: NextFunction) => {
    next(createError(404));
});

app.use((err: any, req: Request, res: Response, _: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status ?? 500);

    res.render("global/_error", {
        title: "404 Error",
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});