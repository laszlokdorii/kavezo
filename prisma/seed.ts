import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    for (let i = 0; i < 30; i++ ) {
        const felleponev = faker.person.fullName();
        const kezdesido = faker.date.future({years: 1});
        const idotartam = faker.number.int({min: 30, max: 180});
        const elmarad = false;

        await prisma.koncertek.create ({
            data: {
                felleponev,
                kezdesido,
                idotartam,
                elmarad
            }
        });
    }   
}
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });