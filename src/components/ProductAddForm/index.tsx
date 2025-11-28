"use client"
// Hooks de react funcionam apenas em client side

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { ProductCategory } from "@/enums/productCategory"
import { Button } from "../ui/button"

// Schema do form utilizando Zod
const formSchema = z.object({
    name: z
        .string()
        .min(1, "A name is required.")
        .max(255),
    // description: z
    //     .string()
    //     .min(1)
    //     .max(255),
    // ProductCategory: z
    //     .enum(ProductCategory),
    // price: z
    //     .number()
    //     .min(0.01),
    // sku: z
    //     .string()
    //     .min(0)
    //     .max(6),
    // stock: z
    //     .number()
    //     .min(1)
})


export default function ProductAddForm() {
    // useForm do react-hook-form, cria uma instancia do form utilizando como resolver
    // o zod
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            // description: "",
            // price: 0,
            // ProductCategory: ProductCategory.Automotive,
            // sku: "",
            // stock: 0
        },
    })

    // Acao a ser realizada quando o evento submit disparar
    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data);
    }

    return (
        // react hook form tomando conta do evento submit utilizando nossa funcao anterior
        <form
            id="form-add-product"
            className="w-[50%]"
            onSubmit={form.handleSubmit(onSubmit)}
        >
            <FieldGroup>
                {/* Controller do react-hook-form */}
                <Controller
                    // Name = nome da propriedade no schmea
                    name="name"
                    // passando controller do zod
                    control={form.control}
                    // render do input
                    render={({ field, fieldState }) => (
                        // passando o estado invalido (boolean) como parametro para o field
                        <Field data-invalid={fieldState.invalid} >
                            <FieldLabel htmlFor="product-name">
                                Name
                            </FieldLabel>
                            <Input
                                {...field}
                                id="product-name"
                                aria-invalid={fieldState.invalid}
                                placeholder="Product's Name"
                            />

                            {/* Caso for invalido, renderizara o FieldError com o array de erros */}
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>
        </form>

    )
}