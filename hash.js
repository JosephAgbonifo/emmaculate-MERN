import bcrypt from "bcrypt";
import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();

async function hashAllPins() {
  const staff = await prisma.staffs.findMany();

  for (const staffMember of staff) {
    // Skip if already hashed (optional but smart)
    if (staffMember.password_hash.startsWith("$2b$")) continue;

    const hashedPin = await bcrypt.hash(staffMember.password_hash, 10);

    await prisma.staffs.update({
      where: { id: staffMember.id },
      data: { password_hash: hashedPin },
    });

    console.log(`Updated password for staff ID ${staffMember.id}`);
  }

  console.log("All pins hashed.");
}

hashAllPins()
  .catch((e) => {
    console.error("Error hashing pins:", e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
