import { BookEntity } from 'src/modules/book/infrastructure/entities/book.entity';
import { PostgresDatasource } from '../database.source';
import { MemberEntity } from 'src/modules/member/infrastructure/entities/member.entity';

const dataSource = PostgresDatasource;

const books = [
  {
    code: 'JK-45',
    title: 'Harry Potter',
    author: 'J.K Rowling',
    stock: 1,
  },
  {
    code: 'SHR-1',
    title: 'A Study in Scarlet',
    author: 'Arthur Conan Doyle',
    stock: 1,
  },
  {
    code: 'TW-11',
    title: 'Twilight',
    author: 'Stephenie Meyer',
    stock: 1,
  },
  {
    code: 'HOB-83',
    title: 'The Hobbit, or There and Back Again',
    author: 'J.R.R. Tolkien',
    stock: 1,
  },
  {
    code: 'NRN-7',
    title: 'The Lion, the Witch and the Wardrobe',
    author: 'C.S. Lewis',
    stock: 1,
  },
];

const members = [
  {
    code: 'M001',
    name: 'Angga',
  },
  {
    code: 'M002',
    name: 'Ferry',
  },
  {
    code: 'M003',
    name: 'Putri',
  },
];

async function seed() {
  try {
    await dataSource.initialize();
    console.log('Database connected');

    const bookRepo = dataSource.getRepository(BookEntity);
    const memberRepo = dataSource.getRepository(MemberEntity);

    // Seed books
    for (const book of books) {
      const existing = await bookRepo.findOne({ where: { code: book.code } });
      if (!existing) {
        await bookRepo.save(book);
        console.log(`Book ${book.code} seeded`);
      }
    }

    // Seed members
    for (const member of members) {
      const existing = await memberRepo.findOne({
        where: { code: member.code },
      });
      if (!existing) {
        await memberRepo.save(member);
        console.log(`Member ${member.code} seeded`);
      }
    }

    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Seed failed:', error);
  } finally {
    await dataSource.destroy();
  }
}

seed();
