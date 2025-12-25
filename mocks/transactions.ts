export interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: number;
  avatar: string;
  type: 'debit' | 'credit';
}

export interface QuickSendContact {
  id: string;
  name: string;
  avatar: string;
}

export const quickSendContacts: QuickSendContact[] = [
  { id: '1', name: 'Courtney', avatar: '👩🏻‍💼' },
  { id: '2', name: 'Darlene', avatar: '👨🏾‍💼' },
  { id: '3', name: 'Philip', avatar: '👩🏽' },
  { id: '4', name: 'Greg', avatar: '👨🏻‍💼' },
];

export const recentTransactions: Transaction[] = [
  {
    id: '1',
    name: 'Jacob Jones',
    date: '23 January • 11:52 PM',
    amount: 40.02,
    avatar: '👨🏻‍💼',
    type: 'credit',
  },
  {
    id: '2',
    name: 'Sarah Williams',
    date: '22 January • 3:30 PM',
    amount: -125.50,
    avatar: '👩🏽‍💼',
    type: 'debit',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    date: '21 January • 9:15 AM',
    amount: 89.99,
    avatar: '👨🏾‍💼',
    type: 'credit',
  },
];
