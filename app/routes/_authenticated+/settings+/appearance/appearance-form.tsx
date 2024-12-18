import { getFormProps, getSelectProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Form } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button, buttonVariants } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { cn } from '~/lib/utils'

const appearanceFormSchema = z.object({
  theme: z.enum(['light', 'dark'], {
    required_error: 'Please select a theme.',
  }),
  font: z.enum(['inter', 'manrope', 'system'], {
    invalid_type_error: 'Select a font',
    required_error: 'Please select a font.',
  }),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

// This can come from your database or API.
const defaultValue: Partial<AppearanceFormValues> = {
  theme: 'light',
}

export function AppearanceForm() {
  const [form, fields] = useForm({
    defaultValue,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: appearanceFormSchema }),
    onSubmit: (event, { submission }) => {
      event.preventDefault()
      if (submission?.status !== 'success') return
      toast('You submitted the following values:', {
        description: (
          <pre className="mt-2 w-[320px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(submission.value, null, 2)}
            </code>
          </pre>
        ),
      })
    },
  })

  return (
    <Form {...getFormProps(form)} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor={fields.font.id}>Font</Label>
        <div className="relative w-max">
          <select
            {...getSelectProps(fields.font)}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'w-[200px] appearance-none font-normal',
            )}
          >
            <option value="inter">Inter</option>
            <option value="manrope">Manrope</option>
            <option value="system">System</option>
          </select>
          <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
        </div>
        <div className="text-[0.8rem] text-muted-foreground">
          Set the font you want to use in the dashboard.
        </div>
        <div
          id={fields.font.errorId}
          className="text-[0.8rem] font-medium text-destructive"
        >
          {fields.font.errors}
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor={fields.theme.id}>Theme</Label>
        <div className="text-[0.8rem] text-muted-foreground">
          Select the theme for the dashboard.
        </div>

        <RadioGroup
          id={fields.theme.id}
          name={fields.theme.name}
          onValueChange={(value) => {
            form.update({
              name: fields.theme.name,
              value,
            })
          }}
          defaultValue={fields.theme.value}
          className="grid max-w-md grid-cols-2 gap-8 pt-2"
        >
          <Label className="[&:has([data-state=checked])>div]:border-primary">
            <RadioGroupItem value="light" className="sr-only">
              Light
            </RadioGroupItem>

            <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
              <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">
              Light
            </span>
          </Label>

          <Label className="[&:has([data-state=checked])>div]:border-primary">
            <RadioGroupItem value="dark" className="sr-only">
              Dark
            </RadioGroupItem>
            <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
              <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">
              Dark
            </span>
          </Label>
        </RadioGroup>
        <div
          id={fields.theme.errorId}
          className="text-[0.8rem] font-medium text-destructive"
        >
          {fields.theme.errors}
        </div>
      </div>

      <Button type="submit">Update preferences</Button>
    </Form>
  )
}
