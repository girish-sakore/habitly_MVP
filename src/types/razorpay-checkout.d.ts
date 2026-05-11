export {};

type RazorpaySuccessResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

declare global {
  interface Window {
    Razorpay?: new (options: {
      key: string;
      amount: string;
      currency: string;
      name: string;
      description?: string;
      order_id: string;
      handler: (response: RazorpaySuccessResponse) => void;
      modal?: {
        ondismiss?: () => void;
      };
      prefill?: { email?: string; name?: string; contact?: string };
      notes?: Record<string, string>;
      theme?: { color?: string };
    }) => {
      open: () => void;
      on: (
        event: "payment.failed",
        cb: (res: {
          error: { description?: string; code?: string; source?: string; step?: string };
        }) => void
      ) => void;
    };
  }
}
