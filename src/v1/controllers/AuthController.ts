import catchAsync from "../utils/catchAsync";
import {
  comparePassword,
  exclude,
  generateToken,
  hashPassword,
} from "../utils/helpers";
import Response from "../utils/response";
import { loginSchema, signupSchema } from "../validations/User.validation";
import UserService from "../services/UserService";

export default class AuthController {
  static signup = catchAsync(async (req, res) => {
    const { name, email, password, role, profilePicture } = req.body;

    const { error } = signupSchema.validate(req.body);

    if (error) {
      const validationErrors = error.details.map((err) => err.message);
      return Response.error(res, 400, "Validation Error", {
        errors: validationErrors[0].replace(/"/g, ""),
      });
    }

    const userExists = await UserService.findUserByEmail(email);

    if (userExists) {
      return Response.error(res, 409, "User already exists", {});
    }

    const hashedPassword = await hashPassword(password);
    const user = await UserService.create({
      name,
      password: hashedPassword,
      email,
      role,
      profilePicture,
    });

    return Response.success(res, 201, "User created", user);
  });

  static login = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    const { error } = loginSchema.validate(req.body);

    if (error) {
      const validationErrors = error.details.map((err) => err.message);
      return Response.error(res, 400, "Incorrect credentials", {
        errors: validationErrors[0].replace(/"/g, ""),
      });
    }

    const user = await UserService.findUserByEmail(email);

    if (!user || !(await comparePassword(password, user.password))) {
      return Response.error(res, 422, "User Not Found", {});
    }

    const accessToken = generateToken({ id: user.id });
    const safeUser = exclude(user, ["password"]);

    return Response.success(res, 200, "Logged in successfully", {
      accessToken,
      user: safeUser,
    });
  });

  static getAllUsers = catchAsync(async (req, res) => {
    const user = await UserService.findAll();
    return Response.success(res, 200, "retrieved", user);
  });
}
