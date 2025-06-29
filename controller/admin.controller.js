import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const updateSessionController = async (req, res, next) => {
  try {
    if (req.role !== "admin") {
      throw new Error({
        message: "You are not authorised to perform this action",
      });
    }
    // Get the most recent active session
    const lastSession = await prisma.session.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    if (!lastSession) {
      return res.status(404).json({
        success: false,
        message: "No active session found.",
      });
    }

    // Deactivate the last session
    await prisma.session.update({
      where: { id: lastSession.id },
      data: { isActive: false },
    });

    let newSessionName = lastSession.name;
    let newTerm;

    if (lastSession.term === "1st") {
      newTerm = "2nd";
    } else if (lastSession.term === "2nd") {
      newTerm = "3rd";
    } else if (lastSession.term === "3rd") {
      newTerm = "1st";
      // Bump session forward, e.g., "2024/2025" => "2025/2026"
      const [start, end] = lastSession.name.split("/").map(Number);
      newSessionName = `${start + 1}/${end + 1}`;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid term value in existing session.",
      });
    }

    // Upsert the new session
    const updatedSession = await prisma.session.upsert({
      where: { name: newSessionName },
      update: {
        term: newTerm,
        isActive: true,
      },
      create: {
        name: newSessionName,
        term: newTerm,
        isActive: true,
      },
    });

    res.status(200).json({
      success: true,
      data: updatedSession,
      message: `Advanced to ${newTerm} term of session ${newSessionName}`,
    });
  } catch (error) {
    next(error);
  }
};
