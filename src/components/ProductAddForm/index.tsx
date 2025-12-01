"use client"
// Hooks funcionam apenas em client side

import { Controller, ControllerFieldState, ControllerRenderProps, FieldValues, useForm, UseFormStateReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { ProductCategory, ProductCategoryValues } from "@/enums/productCategory"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectSeparator } from "../ui/select"
import { SelectTrigger, SelectValue } from "@radix-ui/react-select"
import ProductService from "@/services/productService"

const categories = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
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

    productCategory: z
        .preprocess((value) => {
            if (typeof value === "string") {
                return parseInt(value)
            }
            return value
        }, z.enum(ProductCategory)),
    // .enum(categories),

    sku: z
        .string()
        .nonempty("SKU should not be empty"),

    stock: z.preprocess((val) => {
        if (typeof val === "string") {
            return parseInt(val)
        }
        return val
    }, z
        .number("Must be a whole number")
        .int('Full number')
        .min(1, "Must be higher than 0")
    ),

    price: z.preprocess((val) => {
        if (typeof val === "string") {
            return parseFloat(val);
        }
        return val;
    }, z
        .number("Must be a number")
        .min(1, "Must be higher than 0")
        .refine(val => Number.isFinite(val) && /^\d+\.\d{2}$/.test(val.toFixed(2)),
            "Must have 2 decimal places"
        )
    )
})


export default function ProductAddForm() {
    // useForm do react-hook-form, cria uma instancia do form utilizando como resolver o zod
    type FormData = z.infer<typeof formSchema>
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            ProductCategory: "none",
            sku: "",
            price: 0,
            stock: 0 
            // name: "",
            // description: "",
            // ProductCategory: "none",
            // sku: "",
            // price: 0,
            // stock: 0
        },
    })

    // Acao a ser realizada quando o evento submit disparar
    const service = new ProductService();
    async function onSubmit(data: z.infer<typeof formSchema>) {
        // console.log(data);
        const response = await service.addProduct(data);

        if (response) {
            alert("sucesso!")
            form.reset();
        }
    }

    function resetForm() {
        form.reset();
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
                    name="productCategory"
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
                                value={field.value || "none"}
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

                {/* Price */}
                <Controller
                    name="price"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="product-price">
                                Price
                            </FieldLabel>

                            <Input
                                {...field}
                                type="number"
                                step="0.01"
                            />

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {/* SKU */}
                <Controller
                    // Name = nome da propriedade no schmea
                    name="sku"
                    // passando controller do zod
                    control={form.control}
                    // render do input utilizando um funcao
                    render={({ field, fieldState }) => (
                        // passando o estado invalido (boolean) como parametro para o field
                        <Field data-invalid={fieldState.invalid} >
                            <FieldLabel htmlFor="product-sku">
                                SKU
                            </FieldLabel>
                            <Input
                                {...field}
                                id="product-name"
                                aria-invalid={fieldState.invalid}
                                placeholder="Product's SKU"
                            />

                            {/* Caso for invalido, renderizara o FieldError com o array de erros */}
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {/* Stock */}
                <Controller
                    name="stock"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="product-price">
                                Stock
                            </FieldLabel>

                            <Input
                                {...field}
                                type="number"
                                min={0}
                                step={1}
                            />

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