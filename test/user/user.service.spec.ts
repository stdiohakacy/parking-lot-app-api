import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import Joi from 'joi';
import { ApiKeyModule } from 'src/core/api-key/api-key.module';
import { AuthCoreModule } from 'src/core/auth/auth.core.module';
import { AuthService } from 'src/core/auth/services/auth.service';
import { DatabaseOptionsModule } from 'src/core/database/database.options.module';
import { DatabaseOptionService } from 'src/core/database/services/database.options.service';
import { DebuggerModule } from 'src/core/debugger/debugger.module';
import { ErrorModule } from 'src/core/error/error.module';
import { HelperModule } from 'src/core/helper/helper.module';
import { MessageModule } from 'src/core/message/message.module';
import { PaginationModule } from 'src/core/pagination/pagination.module';
import { RequestModule } from 'src/core/request/request.module';
import { ResponseModule } from 'src/core/response/response.module';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { UserService } from 'src/modules/user/services/user.service';
import { UserModule } from 'src/modules/user/user.module';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import configs from 'src/configs';
import { ENUM_APP_ENVIRONMENT } from 'src/app/constants/app.enum.constant';
import { ENUM_MESSAGE_LANGUAGE } from 'src/core/message/constants/message.enum.constant';
import { APP_LANGUAGE } from 'src/app/constants/app.constant';
import { UserEntity } from 'src/modules/user/entities/user.entity';

describe('The User Service', () => {
    let userService: UserService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    load: configs,
                    isGlobal: true,
                    cache: true,
                    envFilePath: ['.env'],
                    expandVariables: true,
                    validationSchema: Joi.object({
                        APP_NAME: Joi.string().required(),
                        APP_ENV: Joi.string()
                            .valid(...Object.values(ENUM_APP_ENVIRONMENT))
                            .default('development')
                            .required(),
                        APP_LANGUAGE: Joi.string()
                            .valid(...Object.values(ENUM_MESSAGE_LANGUAGE))
                            .default(APP_LANGUAGE)
                            .required(),

                        HTTP_ENABLE: Joi.boolean().default(true).required(),
                        HTTP_HOST: [
                            Joi.string().ip({ version: 'ipv4' }).required(),
                            Joi.valid('localhost').required(),
                        ],
                        HTTP_PORT: Joi.number().default(3000).required(),
                        HTTP_VERSIONING_ENABLE: Joi.boolean()
                            .default(true)
                            .required(),
                        HTTP_VERSION: Joi.number().required(),

                        DEBUGGER_HTTP_WRITE_INTO_FILE: Joi.boolean()
                            .default(false)
                            .required(),
                        DEBUGGER_HTTP_WRITE_INTO_CONSOLE: Joi.boolean()
                            .default(false)
                            .required(),
                        DEBUGGER_SYSTEM_WRITE_INTO_FILE: Joi.boolean()
                            .default(false)
                            .required(),
                        DEBUGGER_SYSTEM_WRITE_INTO_CONSOLE: Joi.boolean()
                            .default(false)
                            .required(),

                        JOB_ENABLE: Joi.boolean().default(false).required(),

                        DATABASE_HOST: Joi.string()
                            .default('127.0.0.1')
                            .required(),
                        DATABASE_NAME: Joi.string()
                            .default('parking-lot-db')
                            .required(),
                        DATABASE_USER: Joi.string()
                            .allow(null, 'postgres')
                            .optional(),
                        DATABASE_PASSWORD: Joi.string()
                            .allow(null, 'postgres')
                            .optional(),

                        AUTH_JWT_SUBJECT: Joi.string().required(),
                        AUTH_JWT_AUDIENCE: Joi.string().required(),
                        AUTH_JWT_ISSUER: Joi.string().required(),

                        AUTH_JWT_ACCESS_TOKEN_SECRET_KEY: Joi.string()
                            // .alphanum()
                            .min(5)
                            .max(50000)
                            .required(),
                        AUTH_JWT_ACCESS_TOKEN_EXPIRED: Joi.string()
                            .default('15m')
                            .required(),

                        AUTH_JWT_REFRESH_TOKEN_SECRET_KEY: Joi.string()
                            // .alphanum()
                            .min(5)
                            .max(50000)
                            .required(),
                        AUTH_JWT_REFRESH_TOKEN_EXPIRED: Joi.string()
                            .default('7d')
                            .required(),
                        AUTH_JWT_REFRESH_TOKEN_NOT_BEFORE_EXPIRATION:
                            Joi.string().default('15m').required(),

                        AUTH_JWT_PAYLOAD_ENCRYPT: Joi.boolean()
                            .default(false)
                            .required(),
                        AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_KEY: Joi.string()
                            .allow(null, '')
                            .min(20)
                            .max(50)
                            .optional(),
                        AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_IV: Joi.string()
                            .allow(null, '')
                            .min(16)
                            .max(50)
                            .optional(),
                        AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_KEY: Joi.string()
                            .allow(null, '')
                            .min(20)
                            .max(50)
                            .optional(),
                        AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_IV: Joi.string()
                            .allow(null, '')
                            .min(16)
                            .max(50)
                            .optional(),

                        AWS_CREDENTIAL_KEY: Joi.string()
                            .allow(null, '')
                            .optional(),
                        AWS_CREDENTIAL_SECRET: Joi.string()
                            .allow(null, '')
                            .optional(),
                        AWS_S3_REGION: Joi.string().allow(null, '').optional(),
                        AWS_S3_BUCKET: Joi.string().allow(null, '').optional(),

                        SSO_GOOGLE_CLIENT_ID: Joi.string()
                            .allow(null, '')
                            .optional(),
                        SSO_GOOGLE_CLIENT_SECRET: Joi.string()
                            .allow(null, '')
                            .optional(),
                        SSO_GOOGLE_CALLBACK_URL_LOGIN: Joi.string()
                            .allow(null, '')
                            .uri()
                            .optional(),
                        SSO_GOOGLE_CALLBACK_URL_SIGN_UP: Joi.string()
                            .allow(null, '')
                            .uri()
                            .optional(),
                    }),
                    validationOptions: {
                        allowUnknown: true,
                        abortEarly: true,
                    },
                }),

                TypeOrmModule.forRootAsync({
                    imports: [DatabaseOptionsModule],
                    useFactory: (dbOptionService: DatabaseOptionService) => {
                        return dbOptionService.createOption();
                    },
                    inject: [DatabaseOptionService],
                    dataSourceFactory: async (options) => {
                        if (!options) {
                            throw new Error('Invalid options passed');
                        }
                        return addTransactionalDataSource(
                            new DataSource(options)
                        );
                    },
                }),

                MessageModule,
                HelperModule,
                PaginationModule,
                ErrorModule,
                ResponseModule,
                RequestModule,
                ApiKeyModule,
                DebuggerModule.forRoot(),
                AuthCoreModule.forRoot(),
            ],
            providers: [
                UserService,
                UserRepository,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {},
                },
            ],
        }).compile();

        userService = await module.get<UserService>(UserService);
    });

    describe('User Register', () => {
        it('Should return user registered', async () => {
            const userCreated = await userService.register({
                payload: {
                    username: 'username001',
                    password: 'cdef3456@A',
                    name: 'name001',
                    address: 'address 001',
                    email: 'alsdkjfh@gmail.com',
                    phone: 'lkajsfdklsaj!@#',
                },
            });
            console.log(userCreated);
        });
    });
});
