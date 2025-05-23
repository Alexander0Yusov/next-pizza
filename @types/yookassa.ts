export interface PaymentData {
  id: string;
  status: string;
  amount: Amount;
  description: string;
  recipient: Recipient;
  created_at: string;
  confirmation: Confirmation;
  test: boolean;
  paid: boolean;
  refundable: boolean;
  metadata: Metadata;
}

export interface Amount {
  value: string;
  currency: string;
}

export interface Recipient {
  account_id: string;
  gateway_id: string;
}

export interface Confirmation {
  type: string;
  confirmation_url: string;
}

export interface Metadata {
  order_id: string;
}

export type PaymentCallbackData = {
  type: string;
  event: string;
  object: {
    id: string;
    status: string;
    amount: { value: string; currency: "RUB" };
    income_amount: { value: string; currency: "RUB" };
    description: string;
    recipient: { account_id: string; gateway_id: string };
    payment_method: {
      type: string;
      id: string;
      saved: boolean;
      title: string;
    };
    captured_at: string;
    created_at: string;
    test: boolean;
    refunded_amount: { value: string; currency: "RUB" };
    paid: boolean;
    refundable: true;
    metadata: { order_id: string };
    authorization_details: {
      rrn: string;
      auth_code: string;
    };
  };
};

// **************************************

export interface FondyCheckoutUrlResponse {
  response: Response;
}

interface Response {
  checkout_url: string;
  payment_id: string;
  response_status: string;
  error_code?: number;
  error_message?: string;
}

export interface PaymentFondyCallbackData {
  order_id: string; // Макс. длина: 1024
  merchant_id: number; // Макс. длина: 12
  amount: number; // Макс. длина: 12
  currency: string; // Макс. длина: 3
  order_status: string; // Макс. длина: 50
  response_status: string; // Макс. длина: 50
  signature: string; // Макс. длина: 40
  order_desc: string; // Макс. длина: 1024
  response_url?: string; // URL для редиректа после оплаты
  tran_type: string; // Макс. длина: 50
  sender_cell_phone?: string; // Макс. длина: 16
  sender_account?: string; // Макс. длина: 50
  masked_card?: string; // Макс. длина: 19
  card_bin?: number; // Макс. длина: 6
  card_type?: string; // Макс. длина: 50
  rrn?: string; // Макс. длина: 50
  approval_code?: string; // Макс. длина: 6
  response_code?: number; // Макс. длина: 4
  response_description?: string; // Макс. длина: 1024
  reversal_amount?: number; // Макс. длина: 12
  settlement_amount?: number; // Макс. длина: 12
  settlement_currency?: string; // Макс. длина: 3
  order_time?: string; // Макс. длина: 19 (формат даты)
  settlement_date?: string; // Макс. длина: 10 (формат даты)
  eci?: number; // Макс. длина: 2
  fee?: number; // Макс. длина: 12
  payment_system?: string; // Макс. длина: 50
  sender_email?: string; // Макс. длина: 254
  payment_id?: number; // Макс. длина: 19
  actual_amount?: number; // Макс. длина: 12
  actual_currency?: string; // Макс. длина: 3
  product_id?: string; // Макс. длина: 1024
  merchant_data?: string; // Макс. длина: 2048
  verification_status?: string; // Макс. длина: 50
  rectoken?: string; // Макс. длина: 40
  rectoken_lifetime?: string; // Макс. длина: 19
  additional_info?: string; // Макс. длина: 20480
}
