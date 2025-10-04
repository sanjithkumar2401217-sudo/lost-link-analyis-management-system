
import type { LostItem, FoundItem, OwnerDetails, HandoverDetails, ItemDetails } from './types';
import { ItemStatus } from './types';

export const MOCK_LOST_ITEMS: LostItem[] = [
  { sn: 1, item: 'iPhone 13 Pro', lostLocation: 'Library', lostDate: '2024-07-10', status: ItemStatus.Found },
  { sn: 2, item: 'Dell XPS Laptop Charger', lostLocation: 'Cafeteria', lostDate: '2024-07-11', status: ItemStatus.Pending },
  { sn: 3, item: 'Black Leather Wallet', lostLocation: 'Gymnasium', lostDate: '2024-07-12', status: ItemStatus.Claimed },
  { sn: 4, item: 'Water Bottle', lostLocation: 'Lecture Hall 3', lostDate: '2024-07-13', status: ItemStatus.Pending },
  { sn: 5, item: 'Airpods Pro', lostLocation: 'Student Lounge', lostDate: '2024-07-14', status: ItemStatus.Found },
];

export const MOCK_ITEM_DETAILS: ItemDetails[] = [
  { sn: 1, itemPicture: 'https://picsum.photos/seed/iphone/200/200', specification: 'Graphite color, small crack on top left' },
  { sn: 2, itemPicture: 'https://picsum.photos/seed/charger/200/200', specification: '90W Dell charger' },
  { sn: 3, itemPicture: 'https://picsum.photos/seed/wallet/200/200', specification: 'Contains ID and credit cards' },
  { sn: 4, itemPicture: 'https://picsum.photos/seed/bottle/200/200', specification: 'Hydroflask, blue, 32oz' },
  { sn: 5, itemPicture: 'https://picsum.photos/seed/airpods/200/200', specification: 'White case with a keychain' },
];

export const MOCK_FOUND_ITEMS: FoundItem[] = [
  { sno: 1, item: 'iPhone 13 Pro', foundLocation: 'Library Front Desk', foundDate: '2024-07-10', claimed: true },
  { sno: 2, item: 'Red Scarf', foundLocation: 'Main Gate', foundDate: '2024-07-12', claimed: false },
  { sno: 3, item: 'Airpods Pro', foundLocation: 'Security Office', foundDate: '2024-07-14', claimed: false },
  { sno: 4, item: 'Set of Keys', foundLocation: 'Cafeteria', foundDate: '2024-07-15', claimed: false },
  { sno: 5, item: 'Notebook', foundLocation: 'Library', foundDate: '2024-07-16', claimed: false },
];

export const MOCK_OWNER_DETAILS: OwnerDetails[] = [
  { sn: 1, registerNumber: 'RA2111003010123', year: 3, dept: 'Computer Science' },
  { sn: 3, registerNumber: 'RA2111003010456', year: 2, dept: 'Mechanical Engineering' },
];

export const MOCK_HANDOVER_DETAILS: HandoverDetails[] = [
  { sn: 1, name: 'John Doe', faculty: 'Dr. Smith', dept: 'Library Services', cabinNo: 'LIB-101' },
  { sn: 3, name: 'Jane Smith', faculty: 'Mr. Jones', dept: 'Student Affairs', cabinNo: 'SA-202' },
];
