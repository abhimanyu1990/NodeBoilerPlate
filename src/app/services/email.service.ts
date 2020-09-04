
import GlobalObjects from "../globalObjects";
import nodemailer from 'nodemailer';

export default class EmailService {
    public userDet:string;
    public pwd:string;
    constructor() {
        this.userDet = GlobalObjects.app.get("email.user");
        this.pwd = GlobalObjects.app.get("email.password");
     }

    public getTransport() {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: this.userDet,
                pass: this.pwd
            }
        });
        return transporter;
    }


    public async sendEmailTextBody(toEmail: string, emailSubject: string, textBody: string) {
        this.getTransport().sendMail({
            from: GlobalObjects.app.get("email.user"),
            to: toEmail,
            subject: emailSubject,
            text: textBody
        });
    }


    public async sendEmailHtmlBody(toEmail: string, emailSubject: string, htmlBody: string) {
        this.getTransport().sendMail({
            from: GlobalObjects.app.get("email.user"),
            to: toEmail,
            subject: emailSubject,
            html: htmlBody
        });
    }

}