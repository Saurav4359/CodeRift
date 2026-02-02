import z from "zod";

export const signup = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  role: z.enum(["USER", "ADMIN"]),
});


export const signin= z.object({
    email : z.email(),
    password : z.string()
})


export const problems= z.object({
    title : z.string(),
    description : z.string(),
    difficulty : z.enum(["EASY","MEDIUM","HARD"]),
    tags : z.array(z.string()),
    timeLimit : z.float64(),
    memoryLimit: z.float64(),
    
})