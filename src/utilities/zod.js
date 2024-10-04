import {z} from 'zod'

const zodConfirmation = (formData) => {
    const schema = z.object({
        name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
        username: z.string().min(6, 'El nombre de usuario debe tener al menos 6 caracteres'),
        email: z.string().email('Por favor, introduce un email válido'),
        password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
        confirmPassword: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    });

    const result = schema.safeParse(formData);
    
    return result;
};

export default zodConfirmation;

