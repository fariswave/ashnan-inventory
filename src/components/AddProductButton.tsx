"use client";

import { Card } from "./Card";
import { Button } from "./ui/button";

interface AddProductButtonProps {
  onToggle: () => void;
}

export function AddProductButton({ onToggle }: AddProductButtonProps) {
  return (
    <Button onClick={onToggle} className="bg-blue-500! text-white">
      + Add Product
    </Button>
  );
}
