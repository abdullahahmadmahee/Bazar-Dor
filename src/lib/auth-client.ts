import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: "https://bazar-dor-ochre.vercel.app", 
})