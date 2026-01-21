import { Control } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface NameFieldsProps {
  control: Control<any>
}

function EmailField({ control }: NameFieldsProps) {
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs tracking-wider text-zinc-500">Email Address</FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder="someone@domain.com"
              {...field}
              className="bg-neutral-900 placeholder:text-center border-zinc-800 text-zinc-100 placeholder:text-zinc-700  h-11 z-80"
            />
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  )
}

export default EmailField
