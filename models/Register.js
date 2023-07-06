import { Schema, model, models } from "mongoose";

const UserRegisteSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  userid: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return Date.now().toString(36); // Generate a unique userid using the current timestamp
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Signup = models.Signup || model("Signup", UserRegisteSchema);

export default Signup;
