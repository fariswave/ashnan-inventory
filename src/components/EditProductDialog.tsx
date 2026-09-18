"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductRow } from "@/lib/db";
import { addProductSchema } from "@/validation/addProducts"; // Reuse schema
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";

type EditProductDialogProps = {
  product: ProductRow;
  onClose: () => void;
};

type EditProductInput = z.infer<typeof addProductSchema>;

export function EditProductDialog({
  product,
  onClose,
}: EditProductDialogProps) {
  const [error, setError] = useState("");
  const router = useRouter();

  // Prefill form dengan data product
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditProductInput>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: product.name,
      unit: product.unit, // Pastikan unit-nya sesuai dengan union type
    },
  });

  const onSubmit = async (data: EditProductInput) => {
    try {
      setError("");
      const response = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to update product");
      }

      // Jika berhasil: tutup dialog, refresh data, reset form
      onClose();
      router.refresh();
      reset();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit {product.name}</DialogTitle>
          </DialogHeader>

          <FieldGroup className="py-4">
            {/* Field: Name */}
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

            {/* Field: Unit */}
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
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
