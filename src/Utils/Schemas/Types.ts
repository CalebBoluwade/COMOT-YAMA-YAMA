interface API {
    url: string;
    token: string;
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    data: any;
    body: any;
    params: any;
  }

  type serverData = {
    imageData: Array<string>;
    discount: number;
    showDisount: boolean;
  }
 
  interface InitData {
    initData: serverData;
    status: {
      isActive: boolean | null;
      message: string;
    },
  }

  interface registerData {
    "fullName": string;
    "email": string;
    "password": string,
    "userType": string,
    "refCode": string;
    "phoneNumber": string;
  }

  enum TranactionType {
    "CREDIT" = "CREDIT",
    "DEBIT" = "DEBIT"
  }

  enum TranactionStatus {
    "SUCCESSFUL" =  "SUCCESSFUL",
    "FAILED" = "FAILED",
    "PENDING" = "PENDING"
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

export { API, InitData, serverData, registerData, Transaction, TranactionStatus, TranactionType }