import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

// Interface para definir o documento do usuário
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): string;
}

// Schema do usuário
const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Por favor, informe o nome"],
      trim: true,
      maxlength: [50, "Nome não pode ter mais de 50 caracteres"],
    },
    email: {
      type: String,
      required: [true, "Por favor, informe o email"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Por favor, informe um email válido",
      ],
    },
    password: {
      type: String,
      required: [true, "Por favor, informe a senha"],
      minlength: [6, "Senha deve ter pelo menos 6 caracteres"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Criptografar a senha antes de salvar
UserSchema.pre<IUser>("save", async function (next) {
  // Só criptografa se a senha foi modificada
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Método para comparar senha
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Método para gerar token JWT
UserSchema.methods.generateAuthToken = function (): string {
  const payload = { id: this._id, role: this.role };
  const secret = env.JWT_SECRET;
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRE as any,
  };

  return jwt.sign(payload, secret, options);
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
