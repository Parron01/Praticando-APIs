import express from "express";
import homeRoutes from "./src/routes/homeRoutes";
import userRoutes from "./src/routes/userRoutes";
import { GlobalMiddleware } from "./src/middlewares/middleware";

//Imports necessários para configuração de sessions
require('dotenv').config();
import session from "express-session";
import MongoStore from "connect-mongo";

class App {
    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    };

    middlewares(){
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.json());
        //this.app.use(GlobalMiddleware);
        //Configuração de express-sessions para autenticação de login
        this.app.use(session({
            secret: 'easease asfgeasgjoasiej0923',
            store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
            resave: false,
            saveUninitialized:false,
            cookie:{
                maxAge: 1000* 60 *60 *24 *7,
                httpOnly:true
            }
          }));
    };

    routes(){
        this.app.use("/", homeRoutes);
        this.app.use("/", userRoutes);
    };
    };



export default new App().app;