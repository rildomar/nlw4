import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";
import { UserRepository } from "../repositories/UserReporistory";
import SendMailService from "../services/SendMailService";

class SendMailController {

    async execute(req: Request, res: Response) {
        const { email, survey_id } = req.body;

        const userRepository = getCustomRepository(UserRepository);
        const surveyRepository = getCustomRepository(SurveysRepository);
        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const userAllReadyExists = await userRepository.findOne({ email })

        if (!userAllReadyExists) {
            return res.send(400).json({
                error: "User does not exists!"
            })
        }

        const survey = await surveyRepository.findOne({ id: survey_id })

        if (!survey) {
            return res.send(400).json({
                error: "Survey does not exists!"
            })
        }

        // Procedimentos:
        // 1 - Salvar os dados na tabela associativa surveyUser
        // 2 - Disparar email para o usuário;


        // Passo 1: 
        const surveyUser = surveyUserRepository.create({
            user_id: userAllReadyExists.id,
            survey_id
        })

        await surveyUserRepository.save(surveyUser);
       
        // Passo 2:
        await SendMailService.execute(email, survey.title, survey.description);
        
        return res.json(surveyUser);
    }
}

export { SendMailController };