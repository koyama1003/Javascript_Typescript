import { create } from "domain";
import { Router } from "express";
import { createTodo } from "../contorollers/todos";

const router = Router();
router.get("/");
router.post("/", createTodo);
router.patch("/:id");
router.delete("/:id");

export default router;
