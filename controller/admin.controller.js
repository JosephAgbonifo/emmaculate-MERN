export const getAdminsController = async (req, res, next) => {
  try {
    // Assuming you have a model Admin to interact with the database
    const admins = await Admin.find();
    res.status(200).json({
      success: true,
      data: admins,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminController = async (req, res, next) => {
  try {
    const adminId = req.params.id;
    // Assuming you have a model Admin to interact with the database
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }
    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};
