const { Router } = require("express");
const candidateRouter = Router();

candidateRouter.post("/candidate" , authenticateUser , async (req , res) => {
   
})

module.exports = candidateRouter;
