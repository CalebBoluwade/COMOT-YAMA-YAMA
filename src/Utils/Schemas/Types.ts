interface API {
  url: string;
  token: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  data: any;
  body: any;
  params: any;
}

type serverData = {
  imageData: Array<string>;
  discount: number;
  showDisount: boolean;
};

interface InitData {
  initData: serverData;
  status: {
    isActive: boolean;
    message: string;
  };
  open: boolean;
}

export enum customerStatus {
  'ACTIVE' = 'ACTIVE',
  'PENDING' = 'PENDING',
  'DISABLED' = 'DISABLED',
  'DELETED' = 'DELETED'
}

export interface VendorListData {
  _id: string;
  companyName: string;
  email: string;
  address: string;
  phoneNumber: string;
  vendorStatus: customerStatus;
}

export interface Vendor {
  id: string;
  vendor: string;
  vendorTel: string;
  vendorEmail: string
}

export interface WasteBinData {
  ownerId: string;
  address: string|{
    address: string;
    latitude: number;
    longitude: number;
  };
  wasteBags: number;
  wasteMaterials: string[];
  phoneNumber: string;
  imageDescription: string | null;
  pickupDate: number;
  vendor: Vendor;
  CollectorStatus?: CollectorStatus;
  CompletionStatus?: CompletionStatus;
};

export enum CompletionStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  MISSED = 'MISSED',
  CANCELLED = 'CANCELLED',
  DELETED = 'DELETED'
}

export enum CollectorStatus {
  PENDING = 'PENDING',
  DECLINED = 'DECLINED',
  ACCEPTED = 'ACCEPTED'
}

enum UserSet {
  "USER" = "USER",
  "VENDOR" = "VENDOR",
  "ADMIN" = "ADMIN",
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  userType: string;
  address?: string | null;
  verificationCode?: string;
  refCode?: string;
  refCodeCount?: number;
  phoneNumber: string;
  status?: UserSet;
}

enum TranactionType {
  "CREDIT" = "CREDIT",
  "DEBIT" = "DEBIT",
}

enum TranactionStatus {
  "SUCCESSFUL" = "SUCCESSFUL",
  "FAILED" = "FAILED",
  "PENDING" = "PENDING",
}

interface Transaction {
  id: string;
  amount: number;
  email: string;
  description: string;
  status: TranactionStatus;
  type: TranactionType;
  transDate: string;
  CRacctName: string;
  CRacctNo: string;
}

export {
  API,
  InitData,
  serverData,
  UserSet,
  Transaction,
  TranactionStatus,
  TranactionType,
};
