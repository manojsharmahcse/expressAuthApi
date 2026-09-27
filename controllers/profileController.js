import Profile from "../models/profileModel.js";

// GET PROFILE
// export const getProfile = async (req, res) => {
//   try {
//     const profile = await Profile.findOne({
//       userId: req.user._id,
//     }).populate("userId", "name email role");

//     if (!profile) {
//       return res.status(404).json({
//         success: false,
//         message: "Profile not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       profile,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({
      userId: req.user._id,
    });

    if (!profile) {
      profile = await Profile.create({
        userId: req.user._id,
      });
    }
    
    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
      profile: {
        id: profile._id,
        profilePhoto: profile.profilePhoto,
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        state: profile.state,
        country: profile.country,
        bio: profile.bio,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// CREATE PROFILE
export const createProfile = async (req, res) => {
  try {
    const existingProfile = await Profile.findOne({
      userId: req.user._id,
    });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists",
      });
    }

    const profile = await Profile.create({
      userId: req.user._id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      {
        userId: req.user._id,
      },
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// DELETE PROFILE
export const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({
      userId: req.user._id,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};