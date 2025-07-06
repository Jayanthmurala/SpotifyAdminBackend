import { NextFunction, Request, Response } from "express";
import axios from "axios";

interface IUser { 
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    playlist: string[];
}
interface IAdminRequest extends Request {
    user?: IUser | null;
}

export const adminMiddleware = async (req: IAdminRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
             res.status(401).json({ message: "Unauthorized" });
        }
        const response = await axios.get(`${process.env.USER_SERVER_URL}/api/v1/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(response,"response");
        req.user = response.data.data;
        if (req.user?.role !== "admin") {
             res.status(403).json({ message: "Forbidden || Unauthorized access to admin routes" });
        }
        next();
    }
    catch (error: any) {
        console.error("Admin Middleware Error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};