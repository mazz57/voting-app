const { Router } = require("express");
const userRouter = Router();
const jwt = require("jsonwebtoken");

userRouter.post("/signup" , async (req , res) => {
   try {
    const { name , email , password , age , adhaarNO } = req.body;
    const user = await userModel.create({ name , email , password , age , adhaarNO });
    res.status(201).json(user);
   }
    catch (error) {
        
        return res.status(400).json({
            message: "error in signup", 
        });
        }

        res.status(201).json({
            message: "Signup Successful!", 
        });
});

userRouter.post("/login" , async (req , res) => {
    const { adhaarNO, password } = req.body;
    const user = await userModel.findOne({ adhaarNO: adhaarNO });

    if(!user || !(await user.comparePassword(password))){
        return res.status(401).json({ message: "Invalid adhaarNO or password" });
    }   
    
    const token = jwt.sign({ userId: user._id }, "your-secret-key", { expiresIn: "1h" });

    res.status(200).json({
        message: "Login Successful!",
        token: token
    });
});

userRouter.get("/profile/:id" , async (req , res) => {
    try{
        const userData = req.user;
        const userId = userData.id;
        const user = await userModel.findById(userId);
        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

userRouter.put("/profile/password", async (req , res) => {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Both currentPassword and newPassword are required' });
    }

    const user = await userModel.findById(userId);

    if(!user || !(await user.comparePassword(currentPassword))){
        return res.status(401).json({ error: 'Invalid current password' });
    }

    user.password = newPassword;
    await user.save();
    
    res.status(200).json({ message: 'Password updated successfully' });

}); 









