
export enum ItemStatus {
  Pending = 'Pending',
  Found = 'Found',
  Claimed = 'Claimed',
}

export interface LostItem {
  sn: number;
  item: string;
  lostLocation: string;
  lostDate: string;
  status: ItemStatus;
}

export interface ItemDetails {
  sn: number;
  itemPicture: string;
  specification: string;
}

export interface FoundItem {
  sno: number;
  item: string;
  foundLocation: string;
  foundDate: string;
  claimed: boolean;
}

export interface OwnerDetails {
  sn: number;
  registerNumber: string;
  year: number;
  dept: string;
}

export interface HandoverDetails {
  sn: number;
  name: string;
  faculty: string;
  dept: string;
  cabinNo: string;
}
