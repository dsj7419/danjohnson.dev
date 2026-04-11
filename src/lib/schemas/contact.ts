import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  company: z.string().max(100, 'Company name is too long').optional().or(z.literal('')),
  message: z
    .string()
    .min(20, 'Please tell me a bit more about your project (at least 20 characters)')
    .max(5000, 'Please keep your message under 5,000 characters'),
  referralSource: z.string().max(200, 'Too long').optional().or(z.literal('')),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
