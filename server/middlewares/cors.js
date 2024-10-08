import cors from 'cors';

export const corsMiddleware = () => cors({
    origin: (origin,callback) => {
        const acceptedOrigin = [
            "http://localhost:5173",
            
        ]
        
        if (acceptedOrigin.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("Access denied"), false);
        }
    }
})