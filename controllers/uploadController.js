export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      image: {
        url: req.file.path,
        public_id: req.file.filename,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};