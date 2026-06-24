export class BorrowRecord {
  id: number;
  memberId: number;
  bookId: number;
  borrowDate: Date;
  returnDate: Date | null;

  constructor(partial: Partial<BorrowRecord>) {
    Object.assign(this, partial);
    this.borrowDate = this.borrowDate || new Date();
    this.returnDate = this.returnDate || null;
  }

  isReturned(): boolean {
    return this.returnDate !== null;
  }

  getDaysBorrowed(): number {
    const endDate = this.returnDate || new Date();
    const diffTime = Math.abs(endDate.getTime() - this.borrowDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  isLateReturn(): boolean {
    return this.getDaysBorrowed() > 7;
  }
}
