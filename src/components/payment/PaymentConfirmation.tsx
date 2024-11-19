import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function PaymentConfirmation({
  amount,
  status,
  transactionId,
}: {
  amount: string;
  status: string;
  transactionId: string;
}) {
  return (
    <div className=" bg-gray-50 flex items-center justify-center p-4 h-full">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Payment Successful
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            Thank you for your payment. Your transaction has been completed
            successfully.
          </p>
          <div className="divide-y divide-gray-200">
            <div className="py-3 flex justify-between">
              <span className="font-medium text-gray-900">Amount Paid</span>
              <span className="text-gray-600">
                Rs {parseFloat(amount) / 100}
              </span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="font-medium text-gray-900">Status</span>
              <span className="text-gray-600">{status}</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="font-medium text-gray-900">Transaction ID</span>
              <span className="text-gray-600">{transactionId}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link href={'/'}>
          <Button
            className="w-full"
            >
            Return to Dashboard
          </Button>
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
