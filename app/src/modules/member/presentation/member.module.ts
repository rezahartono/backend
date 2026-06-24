import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { MEMBER_REPOSITORY } from '../domain/repositories/member.repository';
import { MemberRepositoryImpl } from '../infrastructure/repositories/member.repository';
import { BORROW_RECORD_REPOSITORY } from 'src/modules/book/domain/repositories/borrow-record.repository';
import { BorrowRecordRepositoryImpl } from 'src/modules/book/infrastructure/repositories/borrow-record.repository';
import { ListMembersUseCase } from '../application/use-case/list-members.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from '../infrastructure/entities/member.entity';
import { BorrowRecordEntity } from 'src/modules/book/infrastructure/entities/borrow-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemberEntity, BorrowRecordEntity])],
  controllers: [MemberController],
  providers: [
    MemberService,
    {
      provide: MEMBER_REPOSITORY,
      useClass: MemberRepositoryImpl,
    },
    {
      provide: BORROW_RECORD_REPOSITORY,
      useClass: BorrowRecordRepositoryImpl,
    },
    ListMembersUseCase,
  ],
  exports: [MEMBER_REPOSITORY],
})
export class MemberModule {}
