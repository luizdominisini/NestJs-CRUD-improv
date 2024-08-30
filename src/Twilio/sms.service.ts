import { Injectable } from "@nestjs/common";
import * as Twilio from "twilio";

@Injectable()
export class SmsService {
  async sendMsg() {
    const accountSid = "AC8a07494065a797f4eb0b519ca75c5c8f";
    const authToken = "ec5b7a7bd7b6fb8745461b95b164c093";
    const client = Twilio(accountSid, authToken);

    client.messages
      .create({
        body: "Está na hora do seu remédio",
        from: "whatsapp:+14155238886",
        to: "whatsapp:+5527999943590",
      })
      .then((message) => console.log("Enviado: ", message.sid))
      .catch((error) => console.log("erro ao enviar mensagem ", error));
  }
}
