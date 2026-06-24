import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDatasource } from 'src/shared/infrastructure/database/database.source';
import { HealthModule } from './health/health.module';
import { BookModule } from './book/presentation/book.module';
import { MemberModule } from './member/presentation/member.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...PostgresDatasource.options,
        autoLoadEntities: true,
      }),
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    HealthModule,
    BookModule,
    MemberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
