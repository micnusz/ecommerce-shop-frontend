"use client";

import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { useCheckoutStore } from "@/lib/store/useCheckoutShippingStore";

export const CheckoutShippingRadio = () => {
  const { shippingMethods, selectedShippingMethod, setSelectedShippingMethod } =
    useCheckoutStore();

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl">Shipping</h1>
      </div>

      <RadioGroup
        value={selectedShippingMethod?.id.toString() || ""}
        onValueChange={(val) => {
          const method = shippingMethods.find((m) => m.id.toString() === val);
          if (method) setSelectedShippingMethod(method);
        }}
        className="flex flex-col gap-2"
      >
        {shippingMethods.map((method) => (
          <Button
            key={method.id}
            variant="outline"
            className={`w-full flex items-center justify-start gap-2 ${
              selectedShippingMethod?.id === method.id
                ? "bg-blue-50 border-blue-500"
                : ""
            }`}
            onClick={() => setSelectedShippingMethod(method)}
          >
            <RadioGroupItem
              value={method.id.toString()}
              id={`shipping-${method.id}`}
              checked={selectedShippingMethod?.id === method.id}
              className="pointer-events-none"
            />
            <div className="flex flex-row justify-between w-full">
              <span>{method.name} Shipping</span>
              <span>${method.price}</span>
            </div>
          </Button>
        ))}
      </RadioGroup>
    </div>
  );
};
