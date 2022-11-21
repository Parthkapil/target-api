import express from "express";
import { searchProduct } from "../controllers/TargetApi";

const router = express.Router();

const isWorking = async (req, res) => {
	console.log("test working");
	return res.json("Target API is working!");
};

//check if api working
router.get("/isworking", isWorking);

//search terms
router.post("/search", searchProduct);

module.exports = router;
