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
    const user = await userModel.findOne({ adhaarNO, password });

    if(!user){
        return res.status(401).json({ message: "Invalid adhaarNO or password" });
    }   
    
    const match = user.password === password && user.adhaarNO === adhaarNO;
    
    if (!match) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "your-secret-key", { expiresIn: "1h" });

    res.status(200).json({
        message: "Login Successful!",
        token: token
    });
});

userRouter.get("/users" , async (req , res) => {
    const users = await User.find();
    res.status(200).json(users);
});

userRouter.get("/users/:id" , async (req , res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
});

userRouter.put("/users/:id" , async (req , res) => {
    const { id } = req.params;
    const { name , email , password } = req.body;
    const user = await User.findByIdAndUpdate(id , { name , email , password});
    res.status(200).json(user);
});








