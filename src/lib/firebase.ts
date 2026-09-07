import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  setDoc,
  collection,
  getDocs,
  onSnapshot
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App singleton
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

/* CRITICAL: Must pass firebaseConfig.firestoreDatabaseId */
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Validate connection to Firestore on boot
 */
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('[Firebase] Firestore connected successfully to database:', firebaseConfig.firestoreDatabaseId);
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    } else {
      console.warn('[Firebase] Test connection probe completed:', error instanceof Error ? error.message : error);
    }
    return false;
  }
}

// Auto-run connection check on module import
testFirestoreConnection();

/**
 * Persist Rate Inquiry to Firestore
 */
export async function saveInquiryToFirestore(inquiry: {
  id: string;
  clientName?: string;
  phone?: string;
  brand: string;
  quantity: number;
  location: string;
  notes?: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}) {
  const path = `inquiries/${inquiry.id}`;
  try {
    await setDoc(doc(db, 'inquiries', inquiry.id), inquiry);
    console.log('[Firebase] Inquiry saved to Firestore:', inquiry.id);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Persist Cylinder Order to Firestore
 */
export async function saveOrderToFirestore(order: {
  id: string;
  orderNumber: string;
  customerId?: string;
  businessName?: string;
  contactPerson?: string;
  phone?: string;
  brand: string;
  cylinderType?: string;
  quantity: number;
  deliveryArea: string;
  pincode?: string;
  status: 'pending' | 'confirmed' | 'dispatched' | 'delivered' | 'cancelled';
  totalAmount?: number;
  paymentStatus?: 'paid' | 'pending' | 'cod' | 'credit';
  emptyCylindersReturned?: number;
  notes?: string;
  createdAt: string;
}) {
  const path = `orders/${order.id}`;
  try {
    await setDoc(doc(db, 'orders', order.id), order);
    console.log('[Firebase] Order saved to Firestore:', order.id);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Persist Distributor Applicant to Firestore
 */
export async function saveApplicantToFirestore(applicant: {
  id: string;
  name: string;
  phone: string;
  area: string;
  workType: 'full_time' | 'part_time' | 'agency_franchise';
  vehicleType?: string;
  status: 'pending' | 'reviewed' | 'approved';
  appliedAt: string;
}) {
  const path = `applicants/${applicant.id}`;
  try {
    await setDoc(doc(db, 'applicants', applicant.id), applicant);
    console.log('[Firebase] Applicant saved to Firestore:', applicant.id);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}
