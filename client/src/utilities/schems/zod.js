import {string, z} from 'zod'

const zodConfirmation = (formData) => {
    const schema = z.object({
        name: z.string()
            .min(3, 'Mayor a 4 caracteres el nombre')
            .max(15, 'No exceda los 15 caracteres en el nombre')
            .regex(/^[A-Za-z]+$/, 'El nombre solo puede contener letras y sin espacios'),
        username: z.string()
            .min(3, 'El nombre de usuario debe tener al menos 6 caracteres')
            .max(15, 'No exceda los 15 caracteres en el usuario'),
        email: z.string()
            .email('Por favor, introduce un email válido'),
        password: z.string()
            .min(8, 'La contraseña debe tener al menos 8 caracteres')
            .max(15, 'No exceda los 15 caracteres en la contraseña'),
        confirmPassword: z.string()
            .min(8, 'La contraseña debe tener al menos 8 caracteres')
            .max(15, 'No exceda los 15 caracteres en la contraseña'),
        telefono: z.string()
            .min(5, 'Numero de telefono invalido')
            .max(15, 'Numero de telefono invalido'),
    });

    const result = schema.partial().safeParse(formData);
    
    return result;
};

export default zodConfirmation;

