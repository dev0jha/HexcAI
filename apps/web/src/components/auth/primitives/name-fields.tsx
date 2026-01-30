import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export interface FormFieldsProps {
  control: Control<any>;
}

interface NameFieldsProps extends FormFieldsProps {}

function NameFields({ control }: NameFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs tracking-wider text-zinc-500">
              First Name
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Aniket"
                {...field}
                className="h-11 border-zinc-800 bg-zinc-900/50 text-zinc-100 placeholder:text-zinc-700 focus-visible:border-zinc-700 focus-visible:ring-1 focus-visible:ring-zinc-400"
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs tracking-wider text-zinc-500">
              Last Name
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Nishad"
                {...field}
                className="h-11 border-zinc-800 bg-zinc-900/50 text-zinc-100 placeholder:text-zinc-700 focus-visible:border-zinc-700 focus-visible:ring-1 focus-visible:ring-zinc-400"
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
}

export default NameFields;
