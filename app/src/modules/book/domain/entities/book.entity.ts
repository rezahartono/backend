export class Book {
  id: number;
  code: string;
  title: string;
  author: string;
  stock: number;
  borrowedByMemberIds: number[];

  constructor(partial: Partial<Book>) {
    Object.assign(this, partial);
    this.borrowedByMemberIds = this.borrowedByMemberIds || [];
  }

  isAvailable(): boolean {
    return this.stock > 0;
  }

  getAvailableStock(): number {
    return this.stock - this.borrowedByMemberIds.length;
  }

  borrow(memberId: number): void {
    if (!this.isAvailable()) {
      throw new Error('Book is not available');
    }
    this.borrowedByMemberIds.push(memberId);
  }

  return(memberId: number): void {
    const index = this.borrowedByMemberIds.indexOf(memberId);
    if (index === -1) {
      throw new Error('This book is not borrowed by this member');
    }
    this.borrowedByMemberIds.splice(index, 1);
  }
}
