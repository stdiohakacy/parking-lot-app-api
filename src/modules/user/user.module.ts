import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthCoreModule } from 'src/core/auth/auth.core.module';
import { UserService } from './services/user.service';
@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), AuthCoreModule],
    providers: [UserService],
    controllers: [],
    exports: [UserService],
})
export class UserModule {}
