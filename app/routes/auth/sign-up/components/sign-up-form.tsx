import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react'
import type { HTMLAttributes } from 'react'
import { Form, useActionData, useNavigation } from 'react-router'
import { PasswordInput } from '~/components/password-input'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { cn } from '~/lib/utils'
import { formSchema, type action } from '../route'

type SignUpFormProps = HTMLAttributes<HTMLFormElement>

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const actionData = useActionData<typeof action>()

  const [form, { email, password, confirmPassword }] = useForm({
    lastResult: actionData?.lastResult,
    defaultValue: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: formSchema }),
  })
  const navigation = useNavigation()
  const isLoading = navigation.state === 'submitting'

  return (
    <Form
      method="POST"
      {...getFormProps(form)}
      className={cn('grid gap-2', className)}
      {...props}
    >
      <div className="space-y-1">
        <Label htmlFor={email.id}>Email</Label>
        <Input
          {...getInputProps(email, { type: 'email' })}
          key={email.id}
          placeholder="name@example.com"
        />
        <div
          id={email.errorId}
          className="text-destructive text-[0.8rem] font-medium empty:hidden"
        >
          {email.errors}
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor={password.id}>Password</Label>
        <PasswordInput
          {...getInputProps(password, { type: 'password' })}
          key={password.id}
          placeholder="********"
        />
        <div
          id={password.errorId}
          className="text-destructive text-[0.8rem] font-medium empty:hidden"
        >
          {password.errors}
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor={confirmPassword.id}>Confirm Password</Label>
        <PasswordInput
          {...getInputProps(confirmPassword, { type: 'password' })}
          key={confirmPassword.id}
          placeholder="********"
        />
        <div
          id={confirmPassword.errorId}
          className="text-destructive text-[0.8rem] font-medium empty:hidden"
        >
          {confirmPassword.errors}
        </div>
      </div>

      {form.errors && (
        <Alert variant="destructive">
          <AlertTitle>There was an error creating your account</AlertTitle>
          <AlertDescription>{form.errors}</AlertDescription>
        </Alert>
      )}

      <Button className="mt-2" disabled={isLoading}>
        Create Account
      </Button>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="w-full"
          type="button"
          disabled={isLoading}
        >
          <IconBrandGithub className="h-4 w-4" /> GitHub
        </Button>
        <Button
          variant="outline"
          className="w-full"
          type="button"
          disabled={isLoading}
        >
          <IconBrandFacebook className="h-4 w-4" /> Facebook
        </Button>
      </div>
    </Form>
  )
}
