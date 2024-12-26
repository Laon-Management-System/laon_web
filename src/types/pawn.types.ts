export enum PawnerStatus {
  ACTIVE = 'កំពុងបញ្ចាំ',
  COMPLETED = 'រំលោះ',
  DEFAULTED = 'ខកខាន'
}

export enum Gender {
  MALE = 'ប្រុស',
  FEMALE = 'ស្រី'
}

export interface PawnData {
  id: number;
  itemPawned: string;
  amount: string;
  currency: string;
  duration: number;
  startDate: string;
  endDate: string;
  status: string;
  interestRate: string;
  monthlyPayment: string;
  finalPayment: string;
  description: string;
  createdAt: string;
  payments: PaymentSchedule[];
}

export interface Pawner {
  id: number;
  name: string;
  phone: string;
  address: string;
  gender: string;
  currentPawn: PawnData;
  pawnHistory: PawnData[];
  totalPawns: number;
  totalAmount: number;
  completedPawns: number;
  defaultedPawns: number;
}

export interface CreatePawnerDto {
  name: string;
  phone: string;
  address?: string;
  gender: string;
  itemPawned: string;
  amount: number;
  currency: string;
  duration: number;
  startDate: string;
  interestRate: number;
  description?: string;
}

export interface UpdatePawnerDto {
  name?: string;
  phone?: string;
  address?: string;
  gender?: string;
  currentPawn?: Partial<PawnData>;
}

export interface PaymentSchedule {
  id: number;
  pawnerId: number;
  term: number;
  amount: string;
  status: string;
  dueDate: string;
  paidDate: string | null;
  createdAt: string;
  updatedAt: string;
} 