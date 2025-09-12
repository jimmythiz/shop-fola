import User from "../schema/UserSchema.js";
import jwt from "jsonwebtoken";
import sendMail from "../config/mailer.js";
import crypto from "crypto";

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized." });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden." });
        }
        req.user = user;
        next();
    });
};
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}
export const signUp = async (req,res) => {
    const {firstname,lastname,username,email,password,confirmPassword} = req.body;
    try{
        if (!firstname || !lastname || !username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required." });
        }
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }
         if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
        }
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "Email or username already in use." });
        }
        
        const newUser = new User({ firstname, lastname, username, email, password });
        const emailVerificationToken = newUser.createEmailVerificationToken();
        await newUser.save();
        const token = signToken(newUser._id);
        const verifyLink = `${process.env.FRONTEND_URL}/verify?token=${emailVerificationToken}`;

        sendMail({  
            email: newUser.email,
            subject: "Welcome to Shop Fola",
            message: `Thank you for registering with Shop Fola!\n Please verify your email to activate your account.\nClick the link below to verify your account:\n${verifyLink}`
        });
        res.status(201).header("Authorization", `Bearer ${token}`).json({ message: "User registered successfully. Please verify your email." });


    }catch(error){
        res.status(500).json({ message: "Server error. Please try again later." });
        console.error(error.message);
    }
}

export const verifyAccount = async (req,res) => {
    try{
        const sentToken = req.query.token;
        if(!sentToken){
            return res.status(400).json({message: "Invalid or expired token."})
        }
        const decoded = crypto.createHash('sha256').update(sentToken).digest('hex');
        if (!decoded) {
            return res.status(400).json({ message: "Invalid or expired token." });
        }
        const user = await User.findOne({
            emailVerificationToken: decoded,
            emailVerificationExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(404).json({ message: "Invalid or expired token." });
        }
        user.isVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();
        res.status(200).json({ message: "Email verified successfully." });
    }catch(error){
        console.error(error.message)
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}

export const logIn = async (req,res) => {
    const { email, password } = req.body;
    try{
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password." });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." });
        }
        if (!user.isVerified) {
            return res.status(401).json({ message: "Please verify your email to activate your account." });
        }   
        const token = signToken(user._id);
        res.status(200).header("Authorization", `Bearer ${token}`).json({ message: "Login successful." });
    }catch(error){
        console.error(error.message);
    }
}


export const resetPassword = async (req,res) => {
    try{
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Enter email." });
        }
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }
        user.passwordResetToken = user.createPasswordResetToken();
        const resetLink = `${process.env.FRONTEND_URL}/resetpassword?token=${user.passwordResetToken}`;
        await user.save();
        sendMail({  
            email: user.email,
            subject: "Password Reset Request",
            message: `You requested a password reset. Click the link below to reset your password:\n${resetLink}\nIf you did not request this, please ignore this email.`
        });
        res.status(200).json({ message: "Password reset email sent." });
    }catch(error){
        console.error(error.message)
        res.status(500).json({ message: "Server error. Please try again later." }); 
    }
}
export const confirmPasswordReset = async (req,res) => {
    try{
        const { token } = req.query;
        const { newPassword, confirmNewPassword } = req.body;
        if (!token) {
            return res.status(400).json({ message: "Invalid or expired token." });
        }
        if (!newPassword || !confirmNewPassword) {
            return res.status(400).json({ message: "All fields are required." });
        }
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token." });
        }
        user.password = newPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        res.status(200).json({ message: "Password reset successful." });    
    }catch(error){
        console.error(error.message)
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}

export const updateAccount = async (req, res) => {
  try {
    const updateData = { ...req.body };
    const userId = req.params.id;

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No data provided for update." });
    }

    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Handle password update separately
    if (updateData.currentPassword || updateData.newPassword || updateData.confirmPassword) {
      const { currentPassword, newPassword, confirmPassword } = updateData;

      if (!currentPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: "All password fields are required." });
      }

      const isMatch = await user.comparePassword(currentPassword)
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect." });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "New passwords do not match." });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ message: "New password must be at least 6 characters long." });
      }

      user.password = newPassword;
      await user.save();

      // Remove password fields from updateData to avoid overriding
      delete updateData.currentPassword;
      delete updateData.newPassword;
      delete updateData.confirmPassword;
    }

    // Remove fields that should not be updated
    delete updateData.password;
    delete updateData.orders;
    delete updateData.cart;
    delete updateData.role;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true
    });

    const { password, ...userWithoutPassword } = updatedUser.toObject();
    res.status(200).json({ message: "Account updated successfully.", user: userWithoutPassword });


  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


export const deleteAccount = async (req,res) => {
    try{
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        await Cart.findByIdAndDelete(user.cart);
        await Order.deleteMany({ _id: { $in: user.orders } });

        res.status(200).json({ message: "Account deleted successfully." });

    }catch(error){
        console.error(error.message)
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}