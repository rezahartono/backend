export class Member {
  id: number;
  code: string;
  name: string;
  penaltyUntil: Date | null;
  borrowedBookIds: number[];

  constructor(partial: Partial<Member>) {
    Object.assign(this, partial);
    this.borrowedBookIds = this.borrowedBookIds || [];
    this.penaltyUntil = this.penaltyUntil || null;
  }

  isPenalized(): boolean {
    if (!this.penaltyUntil) return false;
    return new Date() < this.penaltyUntil;
  }

  canBorrow(): boolean {
    return !this.isPenalized() && this.borrowedBookIds.length < 2;
  }

  borrowBook(bookId: number): void {
    if (!this.canBorrow()) {
      throw new Error('Member cannot borrow more books');
    }
    this.borrowedBookIds.push(bookId);
  }

  returnBook(bookId: number): void {
    const index = this.borrowedBookIds.indexOf(bookId);
    if (index === -1) {
      throw new Error('Member has not borrowed this book');
    }
    this.borrowedBookIds.splice(index, 1);
  }

  applyPenalty(days: number = 3): void {
    const penaltyDate = new Date();
    penaltyDate.setDate(penaltyDate.getDate() + days);
    this.penaltyUntil = penaltyDate;
  }
}
