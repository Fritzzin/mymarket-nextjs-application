"use client"
// Hooks funcionam apenas em client side

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { ProductCategory, ProductCategoryValues } from "@/enums/productCategory"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectSeparator } from "../ui/select"
import { SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { types } from "node:util"

// Schema do form utilizando Zod
const formSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required.")
        .max(50),
    description: z
        .string()
        .min(1, "Description is required")
        .max(255, "Description must be lower than 255 characters long."),
    ProductCategory: z.enum(ProductCategory, 'Pick a valid option'),
    // ProductCategory: z
    //     .number()
    //     .min(0)
    //     .max(9),
    price: z
        .number()
        .min(0.01),
    // sku: z
    //     .string()
    //     .min(0)
    //     .max(6),
    // stock: z
    //     .number()
    //     .min(1)
})



// const productCategory = Object.fromEntries(Object.entries(ProductCategory));

export default function ProductAddForm() {
    const productCategory = [
        {
            id: 0,
            name: 'Eletronics'
        },
        {
            id: 1,
            name: 'Clothing'
        }
    ]

    //     'Electronics',
    //     'Clothing',
    //     'Food',
    //     'Beauty',
    //     'Furniture',
    //     'Sports',
    //     'Books',
    //     'Toys',
    //     'Automotive',
    //     'Other',


    // useForm do react-hook-form, cria uma instancia do form utilizando como resolver
    // o zod
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            ProductCategory: 0,
            price: 0,
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
                {/* Name */}
                <Controller
                    // Name = nome da propriedade no schmea
                    name="name"
                    // passando controller do zod
                    control={form.control}
                    // render do input utilizando um funcao
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

                {/* Description */}
                <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="product-description">
                                Description
                            </FieldLabel>
                            <Textarea
                                {...field}
                                id="product-description"
                                aria-invalid={fieldState.invalid}
                                placeholder="Product's Description"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {/* Categories */}
                <Controller
                    name="ProductCategory"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field orientation={"horizontal"} data-invalid={fieldState.invalid}>
                            <FieldContent>
                                <FieldLabel htmlFor="product-category">
                                    Category:
                                </FieldLabel>
                                <FieldDescription>
                                    Pick the product&apos;s category
                                </FieldDescription>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </FieldContent>

                            <Select
                                name={field.name}
                                value={field.value.toString()}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger
                                    id="product-category"
                                    aria-invalid={fieldState.invalid}
                                    className="min-w-[120px]"
                                >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="item-aligned">
                                    <SelectItem value="none">Select</SelectItem>
                                    <SelectSeparator />

                                    {
                                        // productCategory.map((category) => {
                                        //     return <SelectItem value={category.id.toString()} key={category.id}>
                                        //         {category.name}
                                        //     </SelectItem>
                                        // })
                                    }

                                    {
                                        ProductCategoryValues.map((value) => {
                                            return <SelectItem value={value.toString()} key={value} >
                                                {ProductCategory[value]}
                                            </SelectItem>
                                        })
                                    }
                                </SelectContent>
                            </Select>
                        </Field>
                    )}
                />
            </FieldGroup>
        </form>
    )
}