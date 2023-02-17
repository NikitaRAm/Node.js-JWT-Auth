import { userService } from "../service/user-service.js";
import * as dotenv from 'dotenv'
dotenv.config();

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
            const maxAge = 30 * 24 * 60 * 60 * 1000;
            res.cookie('refreshToken', userData.refreshToken, {maxAge: maxAge, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            console.log(e);
        }
    }

    async login(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            console.log(e);
        }
    }

    async refresh(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            return res.json(['test'])
        } catch (e) {
            console.log(e);
        }
    }
}


export const userController = new UserController();