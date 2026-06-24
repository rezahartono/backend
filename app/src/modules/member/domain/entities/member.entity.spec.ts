import { Member } from './member.entity';

describe('Member Entity', () => {
  describe('isPenalized', () => {
    it('should return false when no penalty', () => {
      const member = new Member({ id: 1, code: 'M001', name: 'Angga' });
      expect(member.isPenalized()).toBe(false);
    });

    it('should return true when penalty is in the future', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 3);
      const member = new Member({
        id: 1,
        code: 'M001',
        name: 'Angga',
        penaltyUntil: futureDate,
      });
      expect(member.isPenalized()).toBe(true);
    });

    it('should return false when penalty is in the past', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      const member = new Member({
        id: 1,
        code: 'M001',
        name: 'Angga',
        penaltyUntil: pastDate,
      });
      expect(member.isPenalized()).toBe(false);
    });
  });

  describe('canBorrow', () => {
    it('should return true when member has no penalty and less than 2 books', () => {
      const member = new Member({
        id: 1,
        code: 'M001',
        name: 'Angga',
        borrowedBookIds: [],
      });
      expect(member.canBorrow()).toBe(true);
    });

    it('should return false when member has penalty', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 3);
      const member = new Member({
        id: 1,
        code: 'M001',
        name: 'Angga',
        penaltyUntil: futureDate,
        borrowedBookIds: [],
      });
      expect(member.canBorrow()).toBe(false);
    });

    it('should return false when member has 2 books', () => {
      const member = new Member({
        id: 1,
        code: 'M001',
        name: 'Angga',
        borrowedBookIds: [1, 2],
      });
      expect(member.canBorrow()).toBe(false);
    });
  });

  describe('borrowBook', () => {
    it('should add book to borrowed books', () => {
      const member = new Member({
        id: 1,
        code: 'M001',
        name: 'Angga',
        borrowedBookIds: [],
      });
      member.borrowBook(1);
      expect(member.borrowedBookIds).toContain(1);
    });

    it('should throw error when cannot borrow', () => {
      const member = new Member({
        id: 1,
        code: 'M001',
        name: 'Angga',
        borrowedBookIds: [1, 2],
      });
      expect(() => member.borrowBook(3)).toThrow(
        'Member cannot borrow more books',
      );
    });
  });

  describe('returnBook', () => {
    it('should remove book from borrowed books', () => {
      const member = new Member({
        id: 1,
        code: 'M001',
        name: 'Angga',
        borrowedBookIds: [1, 2],
      });
      member.returnBook(1);
      expect(member.borrowedBookIds).not.toContain(1);
      expect(member.borrowedBookIds).toHaveLength(1);
    });

    it('should throw error when book not borrowed', () => {
      const member = new Member({
        id: 1,
        code: 'M001',
        name: 'Angga',
        borrowedBookIds: [1],
      });
      expect(() => member.returnBook(2)).toThrow(
        'Member has not borrowed this book',
      );
    });
  });

  describe('applyPenalty', () => {
    it('should set penalty date 3 days in the future', () => {
      const member = new Member({
        id: 1,
        code: 'M001',
        name: 'Angga',
      });
      member.applyPenalty(3);
      expect(member.penaltyUntil).toBeDefined();
      expect(member.isPenalized()).toBe(true);
    });
  });
});
