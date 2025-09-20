"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Input } from "./ui/input";

export const CheckoutPaymentAccordion = () => {
  const [value, setValue] = useState("option1");

  return (
    <RadioGroup value={value} onValueChange={setValue} className="w-full">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={value}
        onValueChange={setValue}
      >
        <AccordionItem value="option1" className="border rounded-lg">
          <AccordionTrigger onClick={() => setValue("option1")} className="p-2">
            <RadioGroupItem
              value="option1"
              id="option1"
              checked={value === "option1"}
              className="pointer-events-none"
            />
            <span>Paypal</span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="p-4 text-sm text-muted-foreground h-36 ">
              After clicking &quot;Pay with PayPal&quot;, you will be redirected
              to PayPal to complete your purchase securely.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="option2" className="border rounded-lg">
          <AccordionTrigger
            onClick={() => setValue("option2")}
            className="flex p-2"
          >
            <RadioGroupItem
              value="option2"
              id="option2"
              checked={value === "option2"}
              className="pointer-events-none"
            />
            <span>Credit card</span>
          </AccordionTrigger>
          <AccordionContent className="p-4 h-fit">
            <div className="flex flex-col gap-y-2">
              <Input placeholder="Card number" />
              <div className="flex flex-row gap-x-2">
                <Input placeholder="Expiration date (MM/YY)" />
                <Input placeholder="Security code" />
              </div>
              <Input placeholder="Name on card" />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="option3" className="border rounded-lg">
          <AccordionTrigger onClick={() => setValue("option3")} className="p-2">
            <RadioGroupItem
              value="option3"
              id="option3"
              checked={value === "option3"}
              className="pointer-events-none"
            />
            <span>Klarna - Flexible payments</span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="p-4 text-sm text-muted-foreground h-36 ">
              After clicking &quot;Pay now&quot;, you will be redirected to
              Klarna - Flexible payments to complete your purchase securely.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="option4" className="border rounded-lg">
          <AccordionTrigger onClick={() => setValue("option4")} className="p-2">
            <RadioGroupItem
              value="option4"
              id="option4"
              checked={value === "option4"}
              className="pointer-events-none"
            />
            <span>Alipay & WeChatPay</span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="p-4 text-sm text-muted-foreground h-36 ">
              After clicking &quot;Pay now&quot;, you will be redirected to
              Alipay & WeChatPay to complete your purchase securely.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </RadioGroup>
  );
};
