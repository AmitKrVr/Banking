import { Control, FieldPath } from "react-hook-form"
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { z } from "zod"
import { authFormSchema } from "@/lib/utils"

const formSchema = authFormSchema("sign-up");

interface CustomInput {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder?: string
    type: string,
    maxLength?: number
}

const CustomInput = ({ control, name, label, placeholder, type, maxLength }: CustomInput) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="form-item">
                    <FormLabel className="form-label">{label}</FormLabel>
                    <div className="flex w-full flex-col">
                        <FormControl>
                            {maxLength ? <Input type={type} placeholder={placeholder} className="input-class min-w-16 max-w-24 placeholder:text-sm " maxLength={maxLength} {...field}></Input> :
                                <Input type={type} placeholder={placeholder} className="input-class" {...field}></Input>
                            }
                        </FormControl>
                        <FormMessage className="form-message mt-2" />
                    </div>
                </div>
            )}
        />
    )
}
export default CustomInput