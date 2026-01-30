import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface NameFieldsProps {
  control: Control<any>;
}

function EmailField({ control }: NameFieldsProps) {
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs tracking-wider text-zinc-500">
            Email Address
          </FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder="someone@domain.com"
              {...field}
              className="z-80 h-11 border-zinc-800 bg-neutral-900 text-zinc-100 placeholder:text-center placeholder:text-zinc-700"
            />
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}

export default EmailField;
