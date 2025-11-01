import UserModel from "../database/models/userModel.js";
import bcrypt, { hash } from "bcrypt";

const SALT_ROUND = 12;

export default class ClientRequestHandler 
{
    constructor(app) 
    {
        this._app = app;

        this.initializeRoutes();
    }

    initializeRoutes()
    {
        this.handleRegistration();
        this.handleLogin();
    }

    handleRegistration() 
    {
        this._app.post("/api/app/register", async (req, res) => 
            {
                try
                {
                    const { firstname, lastname, email, password } = req.body;

                    if (await this.emailExists(email))
                    {
                        return res.status(400).json({
                            success: false,
                            message: "Email already registered"
                        });
                    }

                    const hashedPassword = await this.hashPassword(password);

                    const user = new UserModel({ firstname, lastname, email, password: hashedPassword });

                    await user.save();

                    return res.json({ 
                        success: true, 
                        message: "User registered", 
                        userId: user._id 
                    });
                }
                catch (error)
                {
                    return res.status(500).json({
                        success: false,
                        message: error.message
                    })
                }
        });
    }

    async hashPassword(password) 
    {
        const salt = await bcrypt.genSalt(SALT_ROUND);
        
        return await bcrypt.hash(password, salt);
    }

    async emailExists(email) 
    {
        const user = await UserModel.findOne({ email });

        return !!user;
    }

    handleLogin() 
    {
        this._app.post("/api/app/login", (req, res) => {
            try 
            {
                const { email, password } = req.body;

                this.findUserByEmail(email).then(async (user) => 
                {
                    if (!user)
                    {
                        return res.status(400).json({
                            success: false,
                            message: "Invalid email address"
                        });
                    }

                    const matchPassword = await this.checkPassword(password, user.password);

                    if (!matchPassword) 
                    {
                        return res.status(400).json({
                            success: false,
                            message: "Invalid password"
                        });
                    }

                    return res.json({
                        success: true,
                        message: "Login successful",
                        userId: user._id
                    });
                });
            } 
            catch (error)
            {
                return res.status(500).json({
                    success: false,
                    message: error.message
                });
            }
        });
    }

    findUserByEmail(email) 
    {
        return UserModel.findOne({ email });
    }
    

    checkPassword(password, hashedPassword) 
    {
        return bcrypt.compare(password, hashedPassword);
    }
}