import { Book } from './book.entity';

describe('Book Entity', () => {
  describe('isAvailable', () => {
    it('should return true when stock is greater than 0', () => {
      const book = new Book({
        id: 1,
        code: 'JK-45',
        title: 'Harry Potter',
        author: 'J.K Rowling',
        stock: 1,
      });
      expect(book.isAvailable()).toBe(true);
    });

    it('should return false when stock is 0', () => {
      const book = new Book({
        id: 1,
        code: 'JK-45',
        title: 'Harry Potter',
        author: 'J.K Rowling',
        stock: 0,
      });
      expect(book.isAvailable()).toBe(false);
    });
  });

  describe('getAvailableStock', () => {
    it('should return stock minus borrowed count', () => {
      const book = new Book({
        id: 1,
        code: 'JK-45',
        title: 'Harry Potter',
        author: 'J.K Rowling',
        stock: 2,
        borrowedByMemberIds: [1],
      });
      expect(book.getAvailableStock()).toBe(1);
    });

    it('should return full stock when no books borrowed', () => {
      const book = new Book({
        id: 1,
        code: 'JK-45',
        title: 'Harry Potter',
        author: 'J.K Rowling',
        stock: 1,
        borrowedByMemberIds: [],
      });
      expect(book.getAvailableStock()).toBe(1);
    });
  });

  describe('borrow', () => {
    it('should add member to borrowed by members', () => {
      const book = new Book({
        id: 1,
        code: 'JK-45',
        title: 'Harry Potter',
        author: 'J.K Rowling',
        stock: 1,
        borrowedByMemberIds: [],
      });
      book.borrow(1);
      expect(book.borrowedByMemberIds).toContain(1);
    });

    it('should throw error when book is not available', () => {
      const book = new Book({
        id: 1,
        code: 'JK-45',
        title: 'Harry Potter',
        author: 'J.K Rowling',
        stock: 0,
        borrowedByMemberIds: [],
      });
      expect(() => book.borrow(1)).toThrow('Book is not available');
    });
  });

  describe('return', () => {
    it('should remove member from borrowed by members', () => {
      const book = new Book({
        id: 1,
        code: 'JK-45',
        title: 'Harry Potter',
        author: 'J.K Rowling',
        stock: 1,
        borrowedByMemberIds: [1],
      });
      book.return(1);
      expect(book.borrowedByMemberIds).not.toContain(1);
    });

    it('should throw error when book not borrowed by member', () => {
      const book = new Book({
        id: 1,
        code: 'JK-45',
        title: 'Harry Potter',
        author: 'J.K Rowling',
        stock: 1,
        borrowedByMemberIds: [],
      });
      expect(() => book.return(1)).toThrow(
        'This book is not borrowed by this member',
      );
    });
  });
});
