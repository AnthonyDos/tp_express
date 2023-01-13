import mongoose from "mongoose";
const { Schema, model } = mongoose;
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema({
  firstname: { type: String, required: true},
  lastname: { type: String, required: true}, 
  email: { type: String, required: true, unique: true},  
  password: { type: String, required: true}  
})

userSchema.plugin(uniqueValidator);

export const userModel = model("user", userSchema);