import { CustomerAccount, OrderRecord, LedgerEntry, AuditReportItem, PaymentMode, OrderStatus, UserRole } from '../types';

const STORAGE_KEY = 'sandhya_portal_state_v2';

export interface DistributorApplicant {
  id: string;
  name: string;
  phone: string;
  area: string;
  workType: 'full_time' | 'part_time' | 'agency_franchise';
  vehicleType: string;
  appliedAt: string;
  status: 'pending' | 'reviewed' | 'approved';
}

export interface PortalState {
  customers: CustomerAccount[];
  orders: OrderRecord[];
  ledgers: LedgerEntry[];
  auditLogs: AuditReportItem[];
  distributorApplicants: DistributorApplicant[];
  currentUserRole: UserRole;
  currentCustomerId: string | null;
  isDistributorAuth: boolean;
  isAdminAuth: boolean;
  dailyRateNotice: {
    bharat19kgApprox: number;
    bharat47kgApprox: number;
    gogasApprox: number;
    lastUpdated: string;
  };
}

const INITIAL_CUSTOMERS: CustomerAccount[] = [
  {
    id: 'cust-1',
    businessName: 'Hotel Udupi Grand',
    contactPerson: 'Suresh Bhat',
    phone: '9845112233',
    email: 'udupigrand.nela@gmail.com',
    businessType: 'Restaurant / Hotel',
    area: 'Nelamangala Town (562123)',
    pincode: '562123',
    password: 'password123',
    preferredBrand: 'Bharat Gas 19kg',
    balanceAmount: 3850, // ₹3,850 pending
    emptyCylindersDue: 3, // 3 MT Cylinders owed
    createdAt: '2024-01-15'
  },
  {
    id: 'cust-2',
    businessName: 'Sri Krishna Bhavan & Sweets',
    contactPerson: 'Manjunath Rao',
    phone: '9900223344',
    email: 'krishnabhavan@gmail.com',
    businessType: 'Bakery / Sweets',
    area: 'Nelamangala Rural (562123)',
    pincode: '562123',
    password: 'password123',
    preferredBrand: 'Bharat Gas 19kg',
    balanceAmount: 0, // Nil balance
    emptyCylindersDue: 1, // 1 MT Cylinder owed
    createdAt: '2024-02-10'
  },
  {
    id: 'cust-3',
    businessName: 'Highway Star Dhaba & Family Restaurant',
    contactPerson: 'Gurvinder Singh',
    phone: '9741556677',
    businessType: 'Highway Dhaba',
    area: 'Nelamangala Highway (562123)',
    pincode: '562123',
    password: 'password123',
    preferredBrand: 'Bharat Gas 47.5kg',
    balanceAmount: 8400, // ₹8,400 pending
    emptyCylindersDue: 4, // 4 MT Cylinders owed
    createdAt: '2024-03-01'
  },
  {
    id: 'cust-4',
    businessName: 'Raj Palace Kalyana Mantapa',
    contactPerson: 'Ramesh Gowda',
    phone: '9880119922',
    email: 'rajpalace.events@gmail.com',
    businessType: 'Wedding / Banquet Hall',
    area: 'Tumkur Highway (Bulk Order)',
    pincode: '572101',
    password: 'password123',
    preferredBrand: 'Bharat Gas 19kg',
    balanceAmount: 14500, // Bulk booking pending
    emptyCylindersDue: 12, // 12 MT Cylinders from weekend marriage event
    createdAt: '2024-04-12'
  }
];

const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'ord-101',
    orderNumber: 'SE-2026-101',
    customerId: 'cust-1',
    customerName: 'Suresh Bhat',
    businessName: 'Hotel Udupi Grand',
    phone: '9845112233',
    area: 'Nelamangala Town (562123)',
    cylinderBrand: 'Bharat Gas',
    cylinderType: '19kg Commercial VOT',
    quantity: 4,
    totalAmount: 7600,
    amountPaid: 3750,
    paymentMode: 'cash',
    emptyCylindersReturned: 2,
    emptyCylindersPending: 2,
    status: 'delivered',
    orderedAt: '2026-09-01T09:30:00.000Z',
    deliveredAt: '2026-09-01T11:45:00.000Z',
    notes: 'Morning rush delivery before breakfast prep',
    isOneClick: false
  },
  {
    id: 'ord-102',
    orderNumber: 'SE-2026-102',
    customerId: 'cust-3',
    customerName: 'Gurvinder Singh',
    businessName: 'Highway Star Dhaba',
    phone: '9741556677',
    area: 'Nelamangala Highway (562123)',
    cylinderBrand: 'Bharat Gas',
    cylinderType: '47.5kg Industrial',
    quantity: 2,
    totalAmount: 9200,
    amountPaid: 4600,
    paymentMode: 'online',
    emptyCylindersReturned: 1,
    emptyCylindersPending: 1,
    status: 'delivered',
    orderedAt: '2026-09-02T14:15:00.000Z',
    deliveredAt: '2026-09-02T16:20:00.000Z',
    notes: 'Paid ₹4600 via PhonePe UPI, remaining on next cycle',
    isOneClick: true
  },
  {
    id: 'ord-103',
    orderNumber: 'SE-2026-103',
    customerId: 'cust-1',
    customerName: 'Suresh Bhat',
    businessName: 'Hotel Udupi Grand',
    phone: '9845112233',
    area: 'Nelamangala Town (562123)',
    cylinderBrand: 'Bharat Gas',
    cylinderType: '19kg Commercial VOT',
    quantity: 3,
    totalAmount: 5700,
    amountPaid: 0,
    paymentMode: 'pending',
    emptyCylindersReturned: 0,
    emptyCylindersPending: 3,
    status: 'placed',
    orderedAt: '2026-09-03T08:15:00.000Z',
    notes: 'Urgent 1-Click reorder from Customer Portal',
    isOneClick: true
  }
];

const INITIAL_LEDGERS: LedgerEntry[] = [
  {
    id: 'led-1',
    customerId: 'cust-1',
    date: '2026-08-25',
    type: 'delivery',
    description: 'Delivered 4x Bharat Gas 19kg Cylinders',
    cylindersDelivered: 4,
    emptyCollected: 2,
    amountBilled: 7600,
    amountPaid: 4000,
    balanceAfter: 3600,
    emptyBalanceAfter: 2,
    paymentMode: 'cash',
    invoiceNo: 'INV-2026-0825'
  },
  {
    id: 'led-2',
    customerId: 'cust-1',
    date: '2026-08-28',
    type: 'payment_online',
    description: 'Online Payment received via GPay/UPI Ref: 482910',
    amountBilled: 0,
    amountPaid: 3600,
    balanceAfter: 0,
    emptyBalanceAfter: 2,
    paymentMode: 'online',
    invoiceNo: 'RCT-2026-0828'
  },
  {
    id: 'led-3',
    customerId: 'cust-1',
    date: '2026-09-01',
    type: 'delivery',
    description: 'Delivered 4x Bharat Gas 19kg (Order SE-2026-101)',
    cylindersDelivered: 4,
    emptyCollected: 3,
    amountBilled: 7600,
    amountPaid: 3750,
    balanceAfter: 3850,
    emptyBalanceAfter: 3,
    paymentMode: 'cash',
    invoiceNo: 'INV-2026-0901'
  }
];

const INITIAL_AUDIT_LOGS: AuditReportItem[] = [
  {
    id: 'audit-1',
    timestamp: '2026-09-01T11:45:00.000Z',
    actorRole: 'distributor',
    actorName: 'Kumar (Delivery Incharge)',
    actionType: 'DISTRIBUTOR_DELIVERY_COMPLETED',
    summaryEn: 'Delivered 4x Bharat Gas 19kg to Hotel Udupi Grand. Collected ₹3,750 in Cash & 2 MT Cylinders. Outstanding balance: ₹3,850.',
    summaryKn: 'ಹೋಟೆಲ್ ಉಡುಪಿ ಗ್ರ್ಯಾಂಡ್‌ಗೆ 4 ಭಾರತ್ ಗ್ಯಾಸ್ 19kg ಡೆಲಿವರಿ ಮಾಡಲಾಗಿದೆ. ನಗದು ₹3,750 ಮತ್ತು 2 ಖಾಲಿ ಸಿಲಿಂಡರ್ ಪಡೆಯಲಾಗಿದೆ. ಉಳಿದ ಬಾಕಿ: ₹3,850.',
    targetCustomer: 'Hotel Udupi Grand',
    orderId: 'ord-101',
    amount: 3750,
    paymentMode: 'cash',
    mtCount: 2
  },
  {
    id: 'audit-2',
    timestamp: '2026-09-02T16:20:00.000Z',
    actorRole: 'distributor',
    actorName: 'Ramesh (Staff Dispatch)',
    actionType: 'DISTRIBUTOR_PAYMENT_COLLECTED',
    summaryEn: 'Highway Star Dhaba: Collected ₹4,600 via Online UPI (PhonePe). 1 MT Cylinder received.',
    summaryKn: 'ಹೈವೇ ಸ್ಟಾರ್ ದಾಬಾ: ಆನ್‌ಲೈನ್ ಯುಪಿಐ ಮೂಲಕ ₹4,600 ಜಮೆ ಮಾಡಲಾಗಿದೆ. 1 ಖಾಲಿ ಸಿಲಿಂಡರ್ ಸ್ವೀಕರಿಸಲಾಗಿದೆ.',
    targetCustomer: 'Highway Star Dhaba',
    orderId: 'ord-102',
    amount: 4600,
    paymentMode: 'online',
    mtCount: 1
  },
  {
    id: 'audit-3',
    timestamp: '2026-09-03T08:15:00.000Z',
    actorRole: 'customer',
    actorName: 'Suresh Bhat (Hotel Udupi Grand)',
    actionType: 'CUSTOMER_1CLICK_ORDER',
    summaryEn: 'Instant 1-Click Cylinder Request placed for 3x Bharat Gas 19kg Commercial VOT.',
    summaryKn: '3 ಭಾರತ್ ಗ್ಯಾಸ್ 19kg ಗಾಗಿ ತುರ್ತು 1-ಕ್ಲಿಕ್ ಸಿಲಿಂಡರ್ ಬೇಡಿಕೆ ಸಲ್ಲಿಸಲಾಗಿದೆ.',
    targetCustomer: 'Hotel Udupi Grand',
    orderId: 'ord-103'
  }
];

class PortalStore {
  private state: PortalState;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.state = this.loadState();
  }

  private loadState(): PortalState {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          customers: parsed.customers || INITIAL_CUSTOMERS,
          orders: parsed.orders || INITIAL_ORDERS,
          ledgers: parsed.ledgers || INITIAL_LEDGERS,
          auditLogs: parsed.auditLogs || INITIAL_AUDIT_LOGS,
          distributorApplicants: parsed.distributorApplicants || [
            {
              id: 'app-1',
              name: 'Ramesh Kumar',
              phone: '9845099881',
              area: 'Nelamangala Highway (562123)',
              workType: 'full_time',
              vehicleType: 'Piaggio Ape 3-Wheeler Commercial',
              appliedAt: new Date(Date.now() - 86400000).toISOString(),
              status: 'pending'
            }
          ],
          currentUserRole: parsed.currentUserRole || 'customer',
          currentCustomerId: parsed.currentCustomerId !== undefined ? parsed.currentCustomerId : null,
          isDistributorAuth: parsed.isDistributorAuth || false,
          isAdminAuth: parsed.isAdminAuth || false,
          dailyRateNotice: parsed.dailyRateNotice || {
            bharat19kgApprox: 1920,
            bharat47kgApprox: 4750,
            gogasApprox: 1890,
            lastUpdated: new Date().toLocaleDateString()
          }
        };
      }
    } catch {
      // Fallback
    }

    return {
      customers: INITIAL_CUSTOMERS,
      orders: INITIAL_ORDERS,
      ledgers: INITIAL_LEDGERS,
      auditLogs: INITIAL_AUDIT_LOGS,
      distributorApplicants: [
        {
          id: 'app-1',
          name: 'Ramesh Kumar',
          phone: '9845099881',
          area: 'Nelamangala Highway (562123)',
          workType: 'full_time',
          vehicleType: 'Piaggio Ape 3-Wheeler Commercial',
          appliedAt: new Date(Date.now() - 86400000).toISOString(),
          status: 'pending'
        }
      ],
      currentUserRole: 'customer',
      currentCustomerId: null, // Strictly private: no customer balance exposed until logged in
      isDistributorAuth: false, // Private staff verification required
      isAdminAuth: false, // Private management master verification required
      dailyRateNotice: {
        bharat19kgApprox: 1920,
        bharat47kgApprox: 4750,
        gogasApprox: 1890,
        lastUpdated: new Date().toLocaleDateString()
      }
    };
  }

  private saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
      // Storage error handled
    }
    this.notify();
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  public getState(): PortalState {
    return this.state;
  }

  // Auth & Session
  public setRole(role: UserRole) {
    this.state.currentUserRole = role;
    this.saveState();
  }

  public setCurrentCustomer(id: string | null) {
    this.state.currentCustomerId = id;
    this.saveState();
  }

  public loginCustomer(phoneOrEmail: string, pass: string): { success: boolean; message: string } {
    const customer = this.state.customers.find(
      (c) => (c.phone === phoneOrEmail || c.email === phoneOrEmail) && (!c.password || c.password === pass)
    );

    if (!customer) {
      return { success: false, message: 'Invalid credentials. Check mobile number or password.' };
    }

    this.state.currentUserRole = 'customer';
    this.state.currentCustomerId = customer.id;
    this.saveState();
    return { success: true, message: `Welcome back, ${customer.businessName}!` };
  }

  public registerCustomer(account: Omit<CustomerAccount, 'id' | 'balanceAmount' | 'emptyCylindersDue' | 'createdAt'>): CustomerAccount {
    const newId = `cust-${Date.now()}`;
    const newCustomer: CustomerAccount = {
      ...account,
      id: newId,
      balanceAmount: 0,
      emptyCylindersDue: 0,
      createdAt: new Date().toISOString()
    };

    this.state.customers.unshift(newCustomer);
    this.state.currentCustomerId = newId;
    this.state.currentUserRole = 'customer';

    // Log to Audit Report for Admin
    this.addAuditLog({
      actorRole: 'customer',
      actorName: account.contactPerson,
      actionType: 'CUSTOMER_REGISTERED',
      summaryEn: `New commercial client registered: ${account.businessName} (${account.area})`,
      summaryKn: `ಹೊಸ ವಾಣಿಜ್ಯ ಗ್ರಾಹಕರು ನೋಂದಾಯಿಸಿದ್ದಾರೆ: ${account.businessName} (${account.area})`,
      targetCustomer: account.businessName
    });

    this.saveState();
    return newCustomer;
  }

  public resetPassword(phoneOrEmail: string, newPass: string): boolean {
    const customer = this.state.customers.find(
      (c) => c.phone === phoneOrEmail || c.email === phoneOrEmail
    );
    if (customer) {
      customer.password = newPass;
      this.addAuditLog({
        actorRole: 'customer',
        actorName: customer.contactPerson,
        actionType: 'PASSWORD_RESET',
        summaryEn: `Password successfully updated for ${customer.businessName}`,
        summaryKn: `${customer.businessName} ಅವರ ಪಾಸ್‌ವರ್ಡ್ ಯಶಸ್ವಿಯಾಗಿ ಬದಲಾಯಿಸಲಾಗಿದೆ`,
        targetCustomer: customer.businessName
      });
      this.saveState();
      return true;
    }
    return false;
  }

  // 1-Click Order & Regular Order
  public placeOrder(
    customerId: string,
    details: {
      cylinderBrand: string;
      cylinderType: string;
      quantity: number;
      notes?: string;
      isOneClick?: boolean;
    }
  ): OrderRecord {
    const customer = this.state.customers.find((c) => c.id === customerId);
    if (!customer) throw new Error('Customer not found');

    const approxPrice = details.cylinderBrand.includes('47.5') ? 4750 : 1920;
    const totalAmount = approxPrice * details.quantity;
    const orderId = `ord-${Date.now()}`;
    const orderNumber = `SE-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const newOrder: OrderRecord = {
      id: orderId,
      orderNumber,
      customerId: customer.id,
      customerName: customer.contactPerson,
      businessName: customer.businessName,
      phone: customer.phone,
      area: customer.area,
      cylinderBrand: details.cylinderBrand,
      cylinderType: details.cylinderType,
      quantity: details.quantity,
      totalAmount,
      amountPaid: 0,
      paymentMode: 'pending',
      emptyCylindersReturned: 0,
      emptyCylindersPending: details.quantity,
      status: 'placed',
      orderedAt: new Date().toISOString(),
      notes: details.notes,
      isOneClick: !!details.isOneClick
    };

    this.state.orders.unshift(newOrder);

    // Audit Log for Admin & Distributor notification
    this.addAuditLog({
      actorRole: 'customer',
      actorName: `${customer.contactPerson} (${customer.businessName})`,
      actionType: details.isOneClick ? 'CUSTOMER_1CLICK_ORDER' : 'CUSTOMER_ORDER_PLACED',
      summaryEn: `${details.isOneClick ? '⚡ 1-Click Urgent Order' : 'New Order'}: ${details.quantity}x ${details.cylinderBrand} ${details.cylinderType} requested by ${customer.businessName}`,
      summaryKn: `${details.isOneClick ? '⚡ 1-ಕ್ಲಿಕ್ ತುರ್ತು ಬೇಡಿಕೆ' : 'ಹೊಸ ಬೇಡಿಕೆ'}: ${customer.businessName} ಅವರಿಂದ ${details.quantity} ${details.cylinderBrand} ಸಿಲಿಂಡರ್ ಆರ್ಡರ್ ಆಗಿದೆ.`,
      targetCustomer: customer.businessName,
      orderId
    });

    this.saveState();
    return newOrder;
  }

  // Distributor Operations
  public updateOrderStatus(orderId: string, status: OrderStatus, distributorName: string = 'Distributor Staff') {
    const order = this.state.orders.find((o) => o.id === orderId);
    if (!order) return;

    order.status = status;
    if (status === 'delivered') {
      order.deliveredAt = new Date().toISOString();
    }

    this.addAuditLog({
      actorRole: 'distributor',
      actorName: distributorName,
      actionType: 'DISTRIBUTOR_STATUS_UPDATE',
      summaryEn: `Order #${order.orderNumber} for ${order.businessName} status updated to '${status.toUpperCase()}'.`,
      summaryKn: `${order.businessName} ಅವರ ಆರ್ಡರ್ #${order.orderNumber} ಸ್ಥಿತಿಯನ್ನು '${status}' ಗೆ ನವೀಕರಿಸಲಾಗಿದೆ.`,
      targetCustomer: order.businessName,
      orderId
    });

    this.saveState();
  }

  public completeDeliveryWithLedger(
    orderId: string,
    payload: {
      distributorName: string;
      amountPaid: number;
      paymentMode: PaymentMode;
      emptyCylindersCollected: number;
      actualBilledAmount?: number;
      notes?: string;
    }
  ) {
    const order = this.state.orders.find((o) => o.id === orderId);
    if (!order) return;

    const customer = this.state.customers.find((c) => c.id === order.customerId);
    if (!customer) return;

    const billed = payload.actualBilledAmount !== undefined ? payload.actualBilledAmount : order.totalAmount;
    const paid = Number(payload.amountPaid) || 0;
    const mtReturned = Number(payload.emptyCylindersCollected) || 0;

    // Update order
    order.status = 'delivered';
    order.deliveredAt = new Date().toISOString();
    order.amountPaid = paid;
    order.paymentMode = payload.paymentMode;
    order.emptyCylindersReturned = mtReturned;
    order.emptyCylindersPending = Math.max(0, order.quantity - mtReturned);
    if (payload.notes) order.notes = payload.notes;

    // Update customer balances:
    // Balance owed increases by (billed - paid)
    const netAddedBalance = billed - paid;
    customer.balanceAmount = Math.max(0, customer.balanceAmount + netAddedBalance);
    // MT cylinders owed increases by (quantity delivered - empty collected)
    const netAddedMT = order.quantity - mtReturned;
    customer.emptyCylindersDue = Math.max(0, customer.emptyCylindersDue + netAddedMT);

    // Add passbook ledger entry
    const newLedger: LedgerEntry = {
      id: `led-${Date.now()}`,
      customerId: customer.id,
      date: new Date().toISOString().split('T')[0],
      type: 'delivery',
      description: `Delivery of ${order.quantity}x ${order.cylinderBrand} (Order #${order.orderNumber})`,
      cylindersDelivered: order.quantity,
      emptyCollected: mtReturned,
      amountBilled: billed,
      amountPaid: paid,
      balanceAfter: customer.balanceAmount,
      emptyBalanceAfter: customer.emptyCylindersDue,
      paymentMode: payload.paymentMode === 'online' ? 'online' : 'cash',
      invoiceNo: `INV-${order.orderNumber}`
    };
    this.state.ledgers.unshift(newLedger);

    // Audit Log for Admin Report
    this.addAuditLog({
      actorRole: 'distributor',
      actorName: payload.distributorName,
      actionType: 'DISTRIBUTOR_DELIVERY_COMPLETED',
      summaryEn: `Delivery Completed for ${customer.businessName}: Received ₹${paid.toLocaleString()} via ${payload.paymentMode.toUpperCase()} & ${mtReturned} MT Cylinders collected. Customer Balance: ₹${customer.balanceAmount.toLocaleString()} | MT Due: ${customer.emptyCylindersDue}.`,
      summaryKn: `${customer.businessName} ಗೆ ಡೆಲಿವರಿ ಪೂರ್ಣಗೊಂಡಿದೆ: ₹${paid.toLocaleString()} (${payload.paymentMode}) ಮತ್ತು ${mtReturned} ಖಾಲಿ ಸಿಲಿಂಡರ್ ಪಡೆಯಲಾಗಿದೆ. ಬಾಕಿ ಹಣ: ₹${customer.balanceAmount.toLocaleString()} | MT ಬಾಕಿ: ${customer.emptyCylindersDue}.`,
      targetCustomer: customer.businessName,
      orderId,
      amount: paid,
      paymentMode: payload.paymentMode,
      mtCount: mtReturned
    });

    this.saveState();
  }

  public recordDirectPayment(
    customerId: string,
    amount: number,
    mode: 'cash' | 'online',
    emptyReturned: number = 0,
    collectorName: string = 'Staff'
  ) {
    const customer = this.state.customers.find((c) => c.id === customerId);
    if (!customer) return;

    customer.balanceAmount = Math.max(0, customer.balanceAmount - amount);
    if (emptyReturned > 0) {
      customer.emptyCylindersDue = Math.max(0, customer.emptyCylindersDue - emptyReturned);
    }

    const newLedger: LedgerEntry = {
      id: `led-${Date.now()}`,
      customerId: customer.id,
      date: new Date().toISOString().split('T')[0],
      type: mode === 'online' ? 'payment_online' : 'payment_cash',
      description: `Payment received via ${mode.toUpperCase()}${emptyReturned > 0 ? ` + ${emptyReturned} MT Return` : ''}`,
      amountBilled: 0,
      amountPaid: amount,
      balanceAfter: customer.balanceAmount,
      emptyBalanceAfter: customer.emptyCylindersDue,
      paymentMode: mode,
      invoiceNo: `RCT-${Date.now().toString().slice(-6)}`
    };
    this.state.ledgers.unshift(newLedger);

    this.addAuditLog({
      actorRole: 'distributor',
      actorName: collectorName,
      actionType: 'DISTRIBUTOR_PAYMENT_COLLECTED',
      summaryEn: `Direct payment collected from ${customer.businessName}: ₹${amount.toLocaleString()} via ${mode.toUpperCase()} (${emptyReturned} MT Cylinders returned). New Balance: ₹${customer.balanceAmount.toLocaleString()}.`,
      summaryKn: `${customer.businessName} ಅವರಿಂದ ನೇರ ಪಾವತಿ ಪಡೆಯಲಾಗಿದೆ: ₹${amount.toLocaleString()} (${mode.toUpperCase()}) ಮತ್ತು ${emptyReturned} ಖಾಲಿ ಸಿಲಿಂಡರ್. ಉಳಿದ ಬಾಕಿ: ₹${customer.balanceAmount.toLocaleString()}.`,
      targetCustomer: customer.businessName,
      amount,
      paymentMode: mode,
      mtCount: emptyReturned
    });

    this.saveState();
  }

  // Admin Override / Rate Update
  public adminAdjustBalance(
    customerId: string,
    newBalance: number,
    newEmptyDue: number,
    reason: string,
    adminName: string = 'Admin Executive'
  ) {
    const customer = this.state.customers.find((c) => c.id === customerId);
    if (!customer) return;

    const oldBalance = customer.balanceAmount;
    const oldMT = customer.emptyCylindersDue;
    customer.balanceAmount = newBalance;
    customer.emptyCylindersDue = newEmptyDue;

    this.state.ledgers.unshift({
      id: `led-${Date.now()}`,
      customerId: customer.id,
      date: new Date().toISOString().split('T')[0],
      type: 'adjustment',
      description: `Admin balance adjustment: ${reason}`,
      amountBilled: 0,
      amountPaid: 0,
      balanceAfter: newBalance,
      emptyBalanceAfter: newEmptyDue,
      invoiceNo: `ADJ-${Date.now().toString().slice(-5)}`
    });

    this.addAuditLog({
      actorRole: 'admin',
      actorName: adminName,
      actionType: 'ADMIN_LEDGER_ADJUST',
      summaryEn: `Admin adjusted balance for ${customer.businessName}: Amount ₹${oldBalance} -> ₹${newBalance} | MT ${oldMT} -> ${newEmptyDue}. Reason: ${reason}`,
      summaryKn: `ಅಡ್ಮಿನ್ ${customer.businessName} ಅವರ ಬ್ಯಾಲೆನ್ಸ್ ಬದಲಾಯಿಸಿದ್ದಾರೆ: ₹${oldBalance} -> ₹${newBalance} | MT ${oldMT} -> ${newEmptyDue}. ಕಾರಣ: ${reason}`,
      targetCustomer: customer.businessName
    });

    this.saveState();
  }

  private addAuditLog(item: Omit<AuditReportItem, 'id' | 'timestamp'>) {
    const newLog: AuditReportItem = {
      ...item,
      id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString()
    };
    this.state.auditLogs.unshift(newLog);
  }

  // Private & Official Staff Security Gates
  public authenticateDistributor(pin: string): { success: boolean; message: string } {
    // Official Sandhya Staff Passcode
    if (pin.trim() === 'DIST2026' || pin.trim() === '1234') {
      this.state.isDistributorAuth = true;
      this.saveState();
      return { success: true, message: 'Distributor Desk Unlocked. Welcome, Staff Personnel.' };
    }
    return { success: false, message: 'Invalid Staff Access Code. Please check with Sandhya Agency Desk.' };
  }

  public lockDistributor() {
    this.state.isDistributorAuth = false;
    this.saveState();
  }

  public authenticateAdmin(pin: string): { success: boolean; message: string } {
    // Official Master Management Security PIN
    if (pin.trim() === 'ADMIN2026' || pin.trim() === '9500') {
      this.state.isAdminAuth = true;
      this.saveState();
      return { success: true, message: 'Admin Command Center Unlocked. Welcome, Management.' };
    }
    return { success: false, message: 'Invalid Admin Master PIN. Unauthorized access blocked.' };
  }

  public lockAdmin() {
    this.state.isAdminAuth = false;
    this.saveState();
  }

  // Distributor & Delivery Partner Onboarding
  public submitDistributorApplication(applicant: {
    name: string;
    phone: string;
    area: string;
    workType: 'full_time' | 'part_time' | 'agency_franchise';
    vehicleType: string;
  }): { success: boolean; id: string } {
    const newId = `app-${Date.now()}`;
    const newRecord: DistributorApplicant = {
      ...applicant,
      id: newId,
      appliedAt: new Date().toISOString(),
      status: 'pending'
    };

    if (!this.state.distributorApplicants) {
      this.state.distributorApplicants = [];
    }

    this.state.distributorApplicants.unshift(newRecord);

    this.addAuditLog({
      actorRole: 'distributor',
      actorName: applicant.name,
      actionType: 'CUSTOMER_REGISTERED',
      summaryEn: `New Delivery Partner Application submitted by ${applicant.name} (${applicant.phone}) for ${applicant.area} [${applicant.workType}].`,
      summaryKn: `ಹೊಸ ಡೆಲಿವರಿ ಪಾರ್ಟ್ನರ್ ಅರ್ಜಿ ಸಲ್ಲಿಕೆ: ${applicant.name} (${applicant.phone}), ${applicant.area} [${applicant.workType}].`,
      targetCustomer: applicant.name
    });

    this.saveState();
    return { success: true, id: newId };
  }

  public updateApplicantStatus(id: string, status: 'pending' | 'reviewed' | 'approved') {
    const app = this.state.distributorApplicants?.find((a) => a.id === id);
    if (app) {
      app.status = status;
      this.saveState();
    }
  }

  public resetDemoData() {
    this.state = {
      customers: INITIAL_CUSTOMERS,
      orders: INITIAL_ORDERS,
      ledgers: INITIAL_LEDGERS,
      auditLogs: INITIAL_AUDIT_LOGS,
      distributorApplicants: [
        {
          id: 'app-1',
          name: 'Ramesh Kumar',
          phone: '9845099881',
          area: 'Nelamangala Highway (562123)',
          workType: 'full_time',
          vehicleType: 'Piaggio Ape 3-Wheeler Commercial',
          appliedAt: new Date(Date.now() - 86400000).toISOString(),
          status: 'pending'
        }
      ],
      currentUserRole: 'customer',
      currentCustomerId: null,
      isDistributorAuth: false,
      isAdminAuth: false,
      dailyRateNotice: {
        bharat19kgApprox: 1920,
        bharat47kgApprox: 4750,
        gogasApprox: 1890,
        lastUpdated: new Date().toLocaleDateString()
      }
    };
    this.saveState();
  }
}

export const portalStore = new PortalStore();
