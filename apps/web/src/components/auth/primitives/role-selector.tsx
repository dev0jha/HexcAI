import { FormFieldsProps } from "@/components/auth/primitives/name-fields";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { USER_ROLE_VALUES } from "@/db/schema/enums";

interface RoleSelectorProps extends FormFieldsProps {}

export default function RoleSelectorField({ control }: RoleSelectorProps) {
  return (
    <FormField
      control={control}
      name="role"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs tracking-wider text-zinc-500">
            Role
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            name={field.name}
          >
            <FormControl>
              <SelectTrigger className="h-11 border border-zinc-800 bg-zinc-900 text-zinc-100 placeholder:text-zinc-700 focus:border-zinc-700">
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="border-zinc-800 bg-zinc-950 text-zinc-200">
              {USER_ROLE_VALUES.map((role) => (
                <SelectItem
                  key={role}
                  value={role}
                  className="cursor-pointer focus:bg-zinc-800 focus:text-white"
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
