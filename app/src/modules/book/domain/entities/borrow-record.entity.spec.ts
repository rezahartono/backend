import { BorrowRecord } from './borrow-record.entity';

describe('BorrowRecord Entity', () => {
  describe('isReturned', () => {
    it('should return false when returnDate is null', () => {
      const record = new BorrowRecord({
        id: 1,
        memberId: 1,
        bookId: 1,
        borrowDate: new Date(),
      });
      expect(record.isReturned()).toBe(false);
    });

    it('should return true when returnDate is set', () => {
      const record = new BorrowRecord({
        id: 1,
        memberId: 1,
        bookId: 1,
        borrowDate: new Date(),
        returnDate: new Date(),
      });
      expect(record.isReturned()).toBe(true);
    });
  });

  describe('getDaysBorrowed', () => {
    it('should return 0 when borrowed and returned on same day', () => {
      const now = new Date();
      const record = new BorrowRecord({
        id: 1,
        memberId: 1,
        bookId: 1,
        borrowDate: now,
        returnDate: now,
      });
      expect(record.getDaysBorrowed()).toBe(0);
    });

    it('should return correct days when returned after some days', () => {
      const borrowDate = new Date();
      borrowDate.setDate(borrowDate.getDate() - 5);
      const record = new BorrowRecord({
        id: 1,
        memberId: 1,
        bookId: 1,
        borrowDate,
        returnDate: new Date(),
      });
      expect(record.getDaysBorrowed()).toBeGreaterThanOrEqual(5);
    });
  });

  describe('isLateReturn', () => {
    it('should return false when returned within 7 days', () => {
      const borrowDate = new Date();
      borrowDate.setDate(borrowDate.getDate() - 5);
      const record = new BorrowRecord({
        id: 1,
        memberId: 1,
        bookId: 1,
        borrowDate,
        returnDate: new Date(),
      });
      expect(record.isLateReturn()).toBe(false);
    });

    it('should return true when returned after 7 days', () => {
      const borrowDate = new Date();
      borrowDate.setDate(borrowDate.getDate() - 8);
      const record = new BorrowRecord({
        id: 1,
        memberId: 1,
        bookId: 1,
        borrowDate,
        returnDate: new Date(),
      });
      expect(record.isLateReturn()).toBe(true);
    });
  });
});
