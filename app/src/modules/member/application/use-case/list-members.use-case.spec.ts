import { Test, TestingModule } from '@nestjs/testing';
import { ListMembersUseCase } from './list-members.use-case';
import { MEMBER_REPOSITORY } from '../../domain/repositories/member.repository';
import { Member } from '../../domain/entities/member.entity';

describe('ListMembersUseCase', () => {
  let useCase: ListMembersUseCase;
  let memberRepo: any;

  beforeEach(async () => {
    const mockMemberRepo = { findAll: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListMembersUseCase,
        { provide: MEMBER_REPOSITORY, useValue: mockMemberRepo },
      ],
    }).compile();

    useCase = module.get<ListMembersUseCase>(ListMembersUseCase);
    memberRepo = module.get(MEMBER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return all members', async () => {
      const members = [
        new Member({
          id: 1,
          code: 'M001',
          name: 'Angga',
          borrowedBookIds: [1],
        }),
        new Member({
          id: 2,
          code: 'M002',
          name: 'Ferry',
          borrowedBookIds: [],
        }),
        new Member({
          id: 3,
          code: 'M003',
          name: 'Putri',
          borrowedBookIds: [],
        }),
      ];
      memberRepo.findAll.mockResolvedValue(members);

      const result = await useCase.execute();

      expect(result).toHaveLength(3);
      expect(result[0].code).toBe('M001');
      expect(result[1].code).toBe('M002');
      expect(result[2].code).toBe('M003');
      expect(memberRepo.findAll).toHaveBeenCalled();
    });

    it('should return empty array when no members', async () => {
      memberRepo.findAll.mockResolvedValue([]);

      const result = await useCase.execute();

      expect(result).toHaveLength(0);
    });
  });
});
