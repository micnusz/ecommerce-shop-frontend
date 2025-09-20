"use server";

import { CheckoutPaymentAccordion } from "@/components/CheckoutPaymentAccordion";
import { CheckoutPaymentCartView } from "@/components/CheckoutPaymentCartView";
import { CheckoutShippingRadio } from "@/components/CheckoutShippingRadio";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const CheckoutPage = async () => {
  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-6 md:px-12 lg:px-16 py-8 flex flex-col md:flex-row gap-8 rounded-md shadow-md ">
      <div className="w-full md:w-1/2 flex flex-col gap-8  rounded-md p-4 border-1">
        {/* Express checkout */}
        <div className="flex flex-col gap-y-2">
          <p className="text-center text-sm text-muted-foreground">
            Express checkout
          </p>
          <div className="flex flex-row gap-x-2 justify-between w-full">
            <Button className="bg-red-400 flex-1 min-w-[5rem] text-md hover:bg-accent">
              Apple Pay
            </Button>
            <Button className="bg-blue-400 flex-1 min-w-[5rem] text-md hover:bg-accent">
              Paypal
            </Button>
            <Button className="bg-green-400 flex-1 min-w-[5rem] text-md hover:bg-accent">
              Google Pay
            </Button>
          </div>
        </div>
        {/* Separator */}
        <div className="justify-center items-center text-center text-xs text-muted-foreground flex flex-col gap-y-2">
          <Separator></Separator>
          <span>OR</span>
        </div>
        {/* Contact */}
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-row justify-between">
            <h1 className="text-xl">Contact</h1>
            <span className="text-muted-foreground text-sm">Sign in</span>
          </div>

          <Input placeholder="Email" required type="email" />
          <div className="flex flex-row gap-x-2 items-center">
            <Checkbox />
            <span>Email me with news and offers</span>
          </div>
        </div>
        <Separator></Separator>
        {/* Delivery */}
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-row justify-between">
            <h1 className="text-xl">Delivery</h1>
          </div>

          <Input placeholder="Country/region" required className="h-12" />
          <div className="flex flex-row gap-x-2">
            <Input placeholder="First name" required className="h-12" />
            <Input placeholder="Last name" required className="h-12" />
          </div>
          <Input placeholder="Company (optional)" required className="h-12" />
          <Input placeholder="Address or Street" required className="h-12" />
          <Input
            placeholder="Apartment, Suite, Place etc."
            required
            className="h-12"
          />
          <div className="flex flex-row gap-x-2">
            <Input placeholder="Postal code" required className="h-12" />
            <Input placeholder="City" required className="h-12" />
          </div>

          <Input placeholder="Phone" required className="h-12" />
        </div>
        <Separator></Separator>
        {/* Shipping method */}
        <CheckoutShippingRadio />
        <Separator></Separator>
        {/* Payment method */}
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-col gap-y-1">
            <h1 className="text-xl">Payment</h1>
            <span className="text-xs text-muted-foreground">
              All transactions are secure and encrypted.
            </span>
          </div>
          <CheckoutPaymentAccordion />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-4 rounded-md p-4 sticky top-12 h-fit">
        <CheckoutPaymentCartView />
      </div>
    </div>
  );
};

export default CheckoutPage;
