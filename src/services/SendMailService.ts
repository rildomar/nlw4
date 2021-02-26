import nodemailer, { Transporter } from 'nodemailer';
import { resolve } from 'path';
import handlebards from 'handlebars';
import fs from 'fs';
class SendMailService {

    private client: Transporter

    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user, // generated ethereal user
                    pass: account.pass, // generated ethereal password
                },
            });

            this.client = transporter;
        }).catch(err => {
            console.log("ERROR -> Can't dispatch mailer to ");
        })
    }

    async execute(to: string, subject: string, variables: object, path: string) {

        // Neste momento, faz a leitura do arquivo, atraevs do caminho recuperado acima.
        const templateFileContent = fs.readFileSync(path).toString('utf8'); 

        // Carrega o template no hbs compile;
        const mailTemplateParse = handlebards.compile(templateFileContent);

        //Recebe os parametros para ser substituido no template
        const html = mailTemplateParse(variables);

        const message = await this.client.sendMail({
            to,
            subject,
            html,
            from: 'NPS <noreplay@nps.com.br'
        })

        console.log('Message Sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export default new SendMailService();