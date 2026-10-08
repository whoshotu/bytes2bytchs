'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export type AuthState = {
  errors?: Record<string, string[]>
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateSignup(formData: FormData): {
  data?: { email: string; password: string }
  errors?: Record<string, string[]>
} {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const confirm = String(formData.get('confirmPassword') ?? '')
  const errors: Record<string, string[]> = {}

  if (!EMAIL_RE.test(email)) {
    errors.email = ['Please enter a valid email address.']
  }

  const pwErrors: string[] = []
  if (password.length < 8) pwErrors.push('Be at least 8 characters long.')
  if (!/[a-zA-Z]/.test(password)) pwErrors.push('Contain at least one letter.')
  if (!/[0-9]/.test(password)) pwErrors.push('Contain at least one number.')
  if (!/[^a-zA-Z0-9]/.test(password))
    pwErrors.push('Contain at least one special character.')
  if (pwErrors.length > 0) errors.password = pwErrors

  if (password !== confirm) {
    errors.confirmPassword = ['Passwords do not match.']
  }

  if (Object.keys(errors).length > 0) return { errors }
  return { data: { email, password } }
}

export async function signup(
  _state: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const validated = validateSignup(formData)
  if (!validated.data) {
    return { errors: validated.errors }
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email: validated.data.email,
    password: validated.data.password,
  })

  if (error) {
    return { message: error.message }
  }

  // Email confirmation enabled: no session yet.
  if (!data.session) {
    return {
      message: 'Check your inbox to confirm your email address, then log in.',
    }
  }

  revalidatePath('/', 'layout')
  redirect('/rooms')
}

export async function login(
  _state: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!EMAIL_RE.test(email) || password.length === 0) {
    return { message: 'Enter a valid email and password.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { message: 'Invalid email or password.' }
  }

  revalidatePath('/', 'layout')
  redirect('/rooms')
}

export async function logout(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
