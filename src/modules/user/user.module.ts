import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UserRegisterHandler } from './commands/user.register.command';
import { UserEntity } from './entities/user.entity';
import { AuthCoreModule } from 'src/core/auth/auth.core.module';
import { UserLoginHandler } from './commands/user.login.command';

const commandHandlers = [UserRegisterHandler, UserLoginHandler];
const repositories = [UserRepository];

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), AuthCoreModule],
    providers: [...commandHandlers, ...repositories],
    controllers: [],
    exports: [],
})
export class UserModule {}
