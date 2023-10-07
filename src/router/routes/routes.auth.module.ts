import { Module } from '@nestjs/common';
import { AuthCoreModule } from 'src/core/auth/auth.core.module';
import { AwsModule } from 'src/core/aws/aws.module';

@Module({
    controllers: [],
    providers: [],
    exports: [],
    imports: [AuthCoreModule, AwsModule],
})
export class RoutesAuthModule {}
