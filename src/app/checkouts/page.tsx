"use server";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CheckoutPage = async () => {
  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-6 md:px-16 lg:px-24 py-8 flex flex-col md:flex-row gap-8 rounded-md shadow-md ">
      <div className="w-full md:w-1/2 flex flex-col gap-4  rounded-md p-4">
        <div>
          <p>Express checkout</p>
          <div className="flex flex-row gap-x-2">
            <div className="bg-red-400 w-36 h-12">1</div>
            <div className="bg-blue-400 w-36 h-12">2</div>
            <div className="bg-green-400 w-36 h-12">3</div>
          </div>
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

        {/* Delivery */}
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-row justify-between">
            <h1 className="text-xl">Delivery</h1>
            <span className="text-muted-foreground text-sm">Sign in</span>
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

        {/* Shipping method */}
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
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center gap-4  rounded-md p-4"></div>
    </div>
  );
};

export default CheckoutPage;
