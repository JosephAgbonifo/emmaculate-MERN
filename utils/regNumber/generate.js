import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();

/**
 * Generate a new student reg number like EMC/25/0042
 * @returns {Promise<string>} - The generated reg number
 */
const generateRegNumber = async () => {
  // Count students
  const count = await prisma.students.count();
  const b = String(count + 1).padStart(4, "0"); // pad to 4 digits

  // Get last 2 digits of current year
  const year = new Date().getFullYear();
  const a = String(year).slice(-2);

  const regNumber = `EMC/${a}/${b}`;
  return regNumber;
};

export default generateRegNumber;
