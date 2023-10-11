import { SendEmailRequest } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SES } from 'aws-sdk';
import { ENUM_MAIL_SUBJECT } from 'src/modules/mail/constants/mail.enum.constant';
import { ENUM_MAIL_TEMPLATE_KEY } from './constants/mail.enum.constant';
import {
    IMailContent,
    IMailOption,
    IMailParamsAccountActivation,
} from './interfaces/mail.interface';
import { cloneDeep } from 'lodash';
import { EMAIL_TEMPLATE } from './constants/mail.constant';
import Mustache from 'mustache';

@Injectable()
export class MailService {
    private sesClient: SES;

    constructor(private readonly configService: ConfigService) {
        this.sesClient = new SES({
            apiVersion: 'latest',
            region: configService.get<string>('aws.credential.region'),
        });
    }

    getContentEmail<T>(key: ENUM_MAIL_TEMPLATE_KEY, params: T): string {
        const templateContent = <IMailContent>cloneDeep(EMAIL_TEMPLATE[key]);
        if (!templateContent) return '';
        return Mustache.render(templateContent.content, params);
    }

    async send(
        toEmails: string[],
        subject: ENUM_MAIL_SUBJECT,
        htmlContent: string
    ) {
        const fromAddress: string = this.configService.get<string>(
            'aws.ses.fromAddress'
        );

        const sesParams: SendEmailRequest = {
            Source: fromAddress,
            Destination: { ToAddresses: toEmails },
            Message: {
                Subject: {
                    Data: subject,
                },
                Body: {
                    Html: {
                        Data: htmlContent,
                    },
                },
            },
        };

        return await this.sesClient.sendEmail(sesParams).promise();
    }
}
