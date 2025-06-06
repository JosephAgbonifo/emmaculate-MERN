import { PrismaClient } from "../generated/prisma/index.js";
import generatePin from "../utils/pin/generatePin.js";
import generateRegNumber from "../utils/regNumber/generate.js";
import { saveImage } from "../utils/upload/save.js";
const prisma = new PrismaClient();

export const getAllStudents = async (req, res, next) => {
  try {
    const students = await prisma.students.findMany();
    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

export const getThisStudent = async (req, res, next) => {
  try {
    const { reg_number } = req.params; // Make sure it's a number

    const student = await prisma.students.findMany({
      where: {
        reg_number,
      },
    });

    res.status(200).json({
      reg_number,
      success: true,
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

export const createStudent = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const student = req.body;

    if (!student.fullname || !student.class) {
      return res.status(400).json({ error: "Fullname and class are required" });
    }

    const fullname = student.fullname.toUpperCase().trim();
    const st_class = student.class.toUpperCase().trim();
    const reg_number = await generateRegNumber();

    const existingStudent = await prisma.students.findFirst({
      where: {
        OR: [{ fullname }, { reg_number }],
      },
    });

    if (existingStudent) {
      next(
        new Error(
          `Student with fullname ${fullname} or reg_number ${reg_number} already exists`
        )
      );
    } else if (!existingStudent) {
      const sex = student.sex;
      const image = await saveImage(req.file);
      const img = `uploads/${image}`;
      const addr = student.addr;
      const parent_name = student.parent_name;
      const parent_phone = student.parent_phone;
      const dob = student.dob ? new Date(student.dob) : null;
      const reg_date = new Date();
      const pin = generatePin();

      const values = {
        fullname,
        class: st_class,
        reg_number,
        sex,
        img,
        addr,
        parent_name,
        parent_phone,
        dob,
        reg_date,
        pin,
      };

      const newStudent = await prisma.students.create({ data: values });

      res.status(201).json({ success: true, student: newStudent });
    }
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const { reg_number } = req.params;
    const studentData = req.body;
    // Build update payload with only meaningful values
    const updatePayload = {};
    for (const [key, value] of Object.entries(studentData)) {
      if (value !== undefined && value !== null && value !== "") {
        // Optional: Normalize some fields
        if (key === "fullname" || key === "class") {
          updatePayload[key] = value.trim().toUpperCase();
        } else {
          updatePayload[key] = value;
        }
      }
    }

    if (Object.keys(updatePayload).length === 0) {
      next(new Error("No valid fields provided for update"));
      return;
    }

    const updatedStudent = await prisma.students.update({
      where: { reg_number },
      data: updatePayload,
    });

    res.status(200).json({
      success: true,
      data: updatedStudent,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const { reg_number } = req.params;

    if (!reg_number) {
      return res
        .status(400)
        .json({ error: "reg_number parameter is required" });
    }

    const deletedStudent = await prisma.students.delete({
      where: { reg_number },
    });

    res.status(200).json({
      success: true,
      data: deletedStudent,
    });
  } catch (error) {
    // Handle not found error specifically (optional)
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Student not found" });
    }
    next(error);
  }
};
