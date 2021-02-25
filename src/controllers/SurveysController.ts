import { Request, Response } from 'express';
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveysController {

    async getAll(req: Request, res: Response) {
        const surveysRepository = getCustomRepository(SurveysRepository);

        const allSurveys = surveysRepository.find();

        res.status(200).json(allSurveys)
    }

    async create(req: Request, res: Response) {
        const { title, description } = req. body;

        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveys = surveysRepository.create({
            title, description,
        })

        await surveysRepository.save(surveys);

        res.status(201).json(surveys);
    }

}

export { SurveysController };
