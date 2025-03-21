import { parseWithZod } from '@conform-to/zod'
import { data, redirect } from 'react-router'
import { z } from 'zod'
import { Card } from '~/components/ui/card'
import { commitSession, getSession } from '~/sessions.server'
import type { Route } from './+types/route'
import { UserAuthForm } from './components/user-auth-form'

export const formSchema = z.object({
  email: z
    .string({ required_error: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z.string({ required_error: 'Please enter your password' }).min(7, {
    message: 'Password must be at least 7 characters long',
  }),
})

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'))

  if (session.has('userId')) {
    // Redirect to the home page if they are already signed in.
    return redirect('/')
  }

  return data(
    { error: session.get('error') },
    {
      headers: { 'Set-Cookie': await commitSession(session) },
    },
  )
}

async function validateCredentials(email: string, password: string) {
  if (email !== 'mohammedpascal@gmail.com') {
    return null
  }

  return '1234567890'
}

export const action = async ({ request }: Route.ActionArgs) => {
  const submission = parseWithZod(await request.formData(), {
    schema: formSchema,
  })

  if (submission.status !== 'success') {
    return { lastResult: submission.reply() }
  }
  const { email, password } = submission.value
  const userId = await validateCredentials(email, password)

  if (userId == null) {
    return {
      lastResult: submission.reply({
        formErrors: ['Invalid email or password'],
      }),
    }
  }

  const session = await getSession(request.headers.get('Cookie'))
  session.set('userId', userId)

  // Login succeeded, send them to the home page.
  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}

export default function SignIn() {
  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-2 text-left">
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email and password below <br />
          to log into your account
        </p>
      </div>
      <UserAuthForm />

      <p className="text-muted-foreground mt-4 px-8 text-center text-sm">
        By clicking login, you agree to our{' '}
        <a
          href="/terms"
          className="hover:text-primary underline underline-offset-4"
        >
          Terms of Service
        </a>{' '}
        and{' '}
        <a
          href="/privacy"
          className="hover:text-primary underline underline-offset-4"
        >
          Privacy Policy
        </a>
        .
      </p>
    </Card>
  )
}
