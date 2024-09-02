import { Injectable, Logger } from "@nestjs/common";
import * as Twilio from "twilio";
import * as dotenv from "dotenv";
import { Cron, CronExpression } from "@nestjs/schedule";
dotenv.config();
@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    this.logger.debug(this.sendMsg());
  }
  async sendMsg() {
    const accountSid = process.env.ACCOUNTSID;
    const authToken = process.env.AUTHTOKEN;
    const client = Twilio(accountSid, authToken);

    return client.messages
      .create({
        body: "Está na hora do seu remédio",
        from: `whatsapp:${process.env.FROM}`,
        to: `whatsapp:${process.env.TO}`,
      })
      .then((message) => console.log("Enviado: ", message.sid))
      .catch((error) => console.log("erro ao enviar mensagem ", error));
  }
}
