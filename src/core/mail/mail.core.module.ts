import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
    imports: [BullModule.registerQueue({ name: 'email-queue' })],
    providers: [MailService],
    controllers: [],
    exports: [MailService],
})
export class MailCoreModule {}
