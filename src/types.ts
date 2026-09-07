export type Language = 'kn' | 'en';

export type GasBrand = 'bharat' | 'gogas' | 'powergas' | 'all';

export interface CylinderProduct {
  id: string;
  brand: 'Bharat Gas' | 'Go Gas' | 'Power Gas';
  brandKey: 'bharat' | 'gogas' | 'powergas';
  nameEn: string;
  nameKn: string;
  capacity: string;
  typeEn: string;
  typeKn: string;
  idealForEn: string;
  idealForKn: string;
  featuresEn: string[];
  featuresKn: string[];
  badgeEn?: string;
  badgeKn?: string;
  color: {
    primary: string;
    secondary: string;
    bg: string;
    border: string;
  };
}

export interface ServiceItem {
  id: string;
  iconName: string;
  titleEn: string;
  titleKn: string;
  descEn: string;
  descKn: string;
  highlightsEn: string[];
  highlightsKn: string[];
}

export interface CustomerSegment {
  id: string;
  titleEn: string;
  titleKn: string;
  descEn: string;
  descKn: string;
  icon: string;
  tagEn: string;
  tagKn: string;
}

export interface AccessoryItem {
  id: string;
  nameEn: string;
  nameKn: string;
  categoryEn: string;
  categoryKn: string;
  descEn: string;
  descKn: string;
}

export type UserRole = 'customer' | 'distributor' | 'admin';
export type ActivePortalTab = 'website' | 'customer' | 'distributor' | 'admin' | 'gmail';

export type PaymentMode = 'cash' | 'online' | 'pending' | 'credit';
export type OrderStatus = 'placed' | 'confirmed' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface CustomerAccount {
  id: string;
  businessName: string;
  contactPerson: string;
  phone: string;
  email?: string;
  businessType: 'Restaurant / Hotel' | 'Bakery / Sweets' | 'Wedding / Banquet Hall' | 'Highway Dhaba' | 'Industrial / Factory Canteen' | 'Other';
  area: string;
  pincode: string;
  password?: string;
  preferredBrand: 'Bharat Gas 19kg' | 'Bharat Gas 47.5kg' | 'Go Gas 21kg' | 'Power Gas 19kg';
  balanceAmount: number; // Outstanding amount in INR
  emptyCylindersDue: number; // Empty / MT cylinders due to be returned
  createdAt: string;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  businessName: string;
  phone: string;
  area: string;
  cylinderBrand: string;
  cylinderType: string;
  quantity: number;
  totalAmount: number;
  amountPaid: number;
  paymentMode: PaymentMode;
  emptyCylindersReturned: number;
  emptyCylindersPending: number;
  status: OrderStatus;
  orderedAt: string;
  deliveredAt?: string;
  notes?: string;
  isOneClick?: boolean;
}

export interface LedgerEntry {
  id: string;
  customerId: string;
  date: string;
  type: 'delivery' | 'payment_cash' | 'payment_online' | 'empty_return' | 'adjustment';
  description: string;
  cylindersDelivered?: number;
  emptyCollected?: number;
  amountBilled: number;
  amountPaid: number;
  balanceAfter: number;
  emptyBalanceAfter: number;
  paymentMode?: 'cash' | 'online';
  invoiceNo?: string;
}

export interface AuditReportItem {
  id: string;
  timestamp: string;
  actorRole: UserRole;
  actorName: string;
  actionType:
    | 'CUSTOMER_1CLICK_ORDER'
    | 'CUSTOMER_ORDER_PLACED'
    | 'DISTRIBUTOR_STATUS_UPDATE'
    | 'DISTRIBUTOR_PAYMENT_COLLECTED'
    | 'DISTRIBUTOR_EMPTY_RETURN'
    | 'DISTRIBUTOR_DELIVERY_COMPLETED'
    | 'ADMIN_RATE_UPDATE'
    | 'ADMIN_LEDGER_ADJUST'
    | 'CUSTOMER_REGISTERED'
    | 'PASSWORD_RESET';
  summaryEn: string;
  summaryKn: string;
  targetCustomer: string;
  orderId?: string;
  amount?: number;
  paymentMode?: PaymentMode;
  mtCount?: number;
}

