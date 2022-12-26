import mongoose from "mongoose"
import User from "../../../entities/User"

const usersSchema = new mongoose.Schema<Omit<User, "getToken">>({
  id: String,
  username: String,
  email: String,
  password: String
})

export const usersModel = mongoose.model("usersModel", usersSchema)
