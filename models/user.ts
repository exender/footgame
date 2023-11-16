import mongoose, { Schema, Document } from 'mongoose';
import crypto from 'crypto';
import { v1 as uuidv1 } from 'uuid';

export interface User extends Document {
  firstname: string;
  lastname: string;
  aboutme?: string;
  email: string;
  verification_code?: number;
  encry_password: string;
  salt: string;
  role: number;
  apiKey?: string;
  password: string;
  authenticate(plainpassword: string): boolean;
  securePassword(plainpassword: string): string;
  generateApiKey(): string;
  _password: string;
  name: string;
}

const userSchema: Schema<User> = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    aboutme: {
      type: String,
      maxlength: 2000,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    verification_code: {
      type: Number,
      default: null,
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    apiKey: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

userSchema
  .virtual('password')
  .set(function (this: User, password: string) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function (this: User) {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (this: User, plainpassword: string) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function (this: User, plainpassword: string) {
    if (!plainpassword) return '';
    try {
      return crypto
        .createHmac('sha256', this.salt)
        .update(plainpassword)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  generateApiKey: function (this: User) {
    return uuidv1();
  },
};

userSchema.pre<User>('save', function (next) {
  if (!this.apiKey) {
    this.apiKey = this.generateApiKey();
  }
  next();
});

export default mongoose.model<User>('User', userSchema);
