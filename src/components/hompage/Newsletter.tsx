"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    console.log("Subscribing email:", email);
    setEmail("");
  };
  return (
    <section className="py-16 bg-muted">
      <div className="container max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-muted-foreground mb-8">
          Stay updated with our latest products and special offers.
        </p>
        <form
          onSubmit={handleSubscribe}
          className="flex gap-2 max-w-md mx-auto"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
