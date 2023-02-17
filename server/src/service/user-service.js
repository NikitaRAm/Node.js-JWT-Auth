import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import userModel from '../models/user-model.js';
import { mailService } from './mail-service.js';
import { tokenService } from './token-service.js';
import UserDto from '../dtos/user-dto.js'; 

class UserService {
    async registration(email, password) {
        const candidate = await userModel.findOne({email});
        if(candidate) throw new Error(`User with ${email} already exists`);
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuidv4();

        const user = await userModel.create({email, password: hashPassword, activationLink});
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await userModel.findOne({activationLink});
        if(!user) throw new Error('Incorrect activation link');
        user.isActivated = true;
        await user.save();
    }
}

export const userService = new UserService();