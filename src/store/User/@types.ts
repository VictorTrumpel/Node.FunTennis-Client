export type UserInfo = {
  _id: string;
  username: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
  description: string;
  level: number | null;
  balance: number;
  gender: 0 | 1 | null;
  role: "student" | "coach" | "";
};
