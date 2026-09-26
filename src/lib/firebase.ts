import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App singleton
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

/* Pass firestoreDatabaseId if configured */
const firestoreDbId = (firebaseConfig as any).firestoreDatabaseId;
export const db = firestoreDbId ? getFirestore(app, firestoreDbId) : getFirestore(app);
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
    console.log('[Firebase] Firestore connected successfully to database:', firestoreDbId || '(default)');
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.info('[Firebase] Database initialized; running in responsive cached mode.');
    } else {
      console.info('[Firebase] Test connection probe completed:', error instanceof Error ? error.message : error);
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

/**
 * Persist or Update User Profile in Firestore
 */
export async function saveUserProfileToFirestore(profile: {
  uid: string;
  displayName?: string;
  email: string;
  photoURL?: string;
  businessName?: string;
  phone?: string;
  area?: string;
  role?: 'customer' | 'distributor' | 'admin';
  createdAt: string;
}) {
  const path = `users/${profile.uid}`;
  try {
    await setDoc(doc(db, 'users', profile.uid), profile, { merge: true });
    console.log('[Firebase] User profile synced to Firestore:', profile.uid);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Get User Profile from Firestore
 */
export async function getUserProfileFromFirestore(uid: string) {
  const path = `users/${uid}`;
  try {
    const snap = await getDocFromServer(doc(db, 'users', uid));
    return snap.exists() ? snap.data() : null;
  } catch (error) {
    console.warn('[Firebase] Could not fetch user profile:', error);
    return null;
  }
}

/**
 * Fetch all Orders from Firestore
 */
export async function fetchOrdersFromFirestore(): Promise<any[]> {
  const path = 'orders';
  try {
    const snap = await getDocs(collection(db, 'orders'));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.warn('[Firebase] Could not fetch orders:', error);
    return [];
  }
}

/**
 * Real-time subscription to Cylinder Orders from Firestore
 */
export function subscribeToCylinderBookings(
  onUpdate: (orders: any[]) => void,
  onError?: (err: any) => void
): () => void {
  try {
    const colRef = collection(db, 'orders');
    return onSnapshot(
      colRef,
      (snap) => {
        const list: any[] = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        // Sort descending by createdAt or orderNumber
        list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        onUpdate(list);
      },
      (error) => {
        console.warn('[Firebase] Orders subscription warning:', error);
        if (onError) onError(error);
      }
    );
  } catch (err) {
    console.warn('[Firebase] Subscription exception:', err);
    if (onError) onError(err);
    return () => {};
  }
}

/**
 * Update cylinder booking status in Firestore
 */
export async function updateCylinderBookingStatus(
  orderId: string,
  newStatus: 'pending' | 'confirmed' | 'dispatched' | 'delivered' | 'cancelled'
): Promise<void> {
  const path = `orders/${orderId}`;
  try {
    await updateDoc(doc(db, 'orders', orderId), {
      status: newStatus,
      updatedAt: new Date().toISOString()
    });
    console.log('[Firebase] Order status updated in Firestore:', orderId, newStatus);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

/**
 * Cancel cylinder booking in Firestore
 */
export async function cancelCylinderBooking(orderId: string): Promise<void> {
  return updateCylinderBookingStatus(orderId, 'cancelled');
}

/**
 * Delete cylinder booking from Firestore (for admin clean up)
 */
export async function deleteCylinderBooking(orderId: string): Promise<void> {
  const path = `orders/${orderId}`;
  try {
    await deleteDoc(doc(db, 'orders', orderId));
    console.log('[Firebase] Order deleted from Firestore:', orderId);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

/**
 * Fetch all Inquiries from Firestore
 */
export async function fetchInquiriesFromFirestore(): Promise<any[]> {
  const path = 'inquiries';
  try {
    const snap = await getDocs(collection(db, 'inquiries'));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.warn('[Firebase] Could not fetch inquiries:', error);
    return [];
  }
}

