import cors from 'cors';

export const corsMiddleware = () => cors({
    origin: (origin, callback) => {
        const acceptedOrigins = [
            "http://localhost:5173", // Cambia este puerto si es necesario
            "http://127.0.0.1:5173", // También puedes incluir esta variante
            "http://127.0.0.1:5173/",
            "http://localhost:5000/", 
            "http://localhost:5173/",
            "https://formulario-venta-de-entradas.vercel.app",
            "https://formulario-venta-de-entradas.vercel.app/",
            "https://sites.google.com/view/qrentradadigital",
            "https://1241917164-atari-embeds.googleusercontent.com"
        ];
        
        // Aceptar solicitudes sin origen (como localhost)
        if (!origin || acceptedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("Access denied"), false);
        }
    }
});