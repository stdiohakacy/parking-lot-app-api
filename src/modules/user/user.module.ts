import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthCoreModule } from 'src/core/auth/auth.core.module';
import { UserService } from './services/user.service';
import { MailCoreModule } from 'src/core/mail/mail.core.module';
@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        AuthCoreModule,
        MailCoreModule,
    ],
    providers: [UserService],
    controllers: [],
    exports: [UserService],
})
export class UserModule {}
