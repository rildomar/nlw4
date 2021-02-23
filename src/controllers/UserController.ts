import  {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
    
    async getall (req: Request, res: Response) {
        //Cria o repository do modelo que estou passando. Próprio do typeOrm..
        const userRepository = getRepository(User);

        const userFinded = await userRepository.find();

        if(!userFinded){
            return res.status(400).json({
                error: "No have data!"
            })
        }

        res.json(userFinded);

    }

    // Função que irá inserir o dado no banco de dados.
    async create(req: Request, res: Response) {
        //Cria o repository do modelo que estou passando. Próprio do typeOrm..
        const userRepository = getRepository(User);
        
        const { name, email } = req.body;

        // Filtra no banco pelo email. 
        const userFinded = await userRepository.findOne({
            email,
        })

        // Caso exista, retorna erro 400 + mensagem para o response;
        if (userFinded) {
            return res.status(400).json({
                error: 'User already exists!'
            })
        }

        // Para inserir no banco, é necessário criar um ententy correspondente ao banco, por isso
        // é necessário primeiro criar no repository e depois aplicar o save
        const userCreated = userRepository.create({ name, email })
        await userRepository.save(userCreated);

        // Retorna usuário criado;
        return res.json(userCreated);
    }
}

export { UserController }