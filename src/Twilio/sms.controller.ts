import { Body, Controller, Get, Post } from "@nestjs/common";
import { SmsService } from "./sms.service";

@Controller("sms")
export class SmsController {
  constructor(private smsService: SmsService) {}

  @Post()
  async send() {
    return this.smsService.sendMsg();
  }
}
