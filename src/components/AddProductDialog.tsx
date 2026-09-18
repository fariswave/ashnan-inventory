"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { addProductSchema } from "@/validation/addProducts";
import { useRouter } from "next/navigation";
import { ProductRow } from "@/lib/db";

type AddProductDialogProps = { product?: ProductRow };

type AddProductInput = z.infer<typeof addProductSchema>;

export function AddProductDialog({ product }: AddProductDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddProductInput>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: product ? product.name : "",
      unit: product ? product.unit : undefined,
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<AddProductInput> = async (data) => {
    try {
      setError("");

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to add product");
      }

      // Submit berhasil
      reset();
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button variant="outline">Add Product</Button>} />

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
          </DialogHeader>

          <FieldGroup className="py-4">
            <Field data-invalid={!!errors.name}>
              <Label htmlFor="name">Product Name</Label>

              <Input
                id="name"
                placeholder="Apple"
                aria-invalid={!!errors.name}
                {...register("name")}
              />

              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>

            <Field data-invalid={!!errors.unit}>
              <Label htmlFor="unit">Unit</Label>

              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="unit" aria-invalid={!!errors.unit}>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="PCS">PCS</SelectItem>
                      <SelectItem value="G">G</SelectItem>
                      <SelectItem value="KG">KG</SelectItem>
                      <SelectItem value="ML">ML</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.unit && <FieldError>{errors.unit.message}</FieldError>}
            </Field>
          </FieldGroup>

          {error && <FieldError>{error}</FieldError>}

          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              }
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
