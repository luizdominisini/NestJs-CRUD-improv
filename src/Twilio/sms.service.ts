import { Injectable } from "@nestjs/common";
import * as Twilio from "twilio";
import * as dotenv from "dotenv";
dotenv.config();
@Injectable()
export class SmsService {
  async sendMsg() {
    const accountSid = process.env.ACCOUNTSID;
    const authToken = process.env.AUTHTOKEN;
    const client = Twilio(accountSid, authToken);

    client.messages
      .create({
        body: "Está na hora do seu remédio",
        from: `whatsapp:${process.env.FROM}`,
        to: `whatsapp:${process.env.TO}`,
      })
      .then((message) => console.log("Enviado: ", message.sid))
      .catch((error) => console.log("erro ao enviar mensagem ", error));
  }
}
