// Define the structure of the user object in the session/token
interface UserSession {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

interface ProjectSummary {
  progress: number;
  currentPhase: number;
  investment: number;
  budget: number;
  daysRemaining: number;
  startDate: string;
  estimatedEndDate?: string; // Make optional as it might not always be present
}

interface Milestone {
  id: string;
  date: string;
  description: string;
}

interface Activity {
  id: string;
  timestamp: string;
  description: string;
  type: string;
}

interface PhaseProgress {
  phase: number;
  name: string;
  progress: number;
}

// Dashboard data structure
interface DashboardData {
  projectSummary: ProjectSummary;
  nextMilestones: Milestone[];
  recentActivity: Activity[];
  progressByPhase: PhaseProgress[];
}

interface Expense {
  id: string;
  date: string;
  phase: number;
  category: string;
  description: string;
  amount: number;
  status: string;
}

interface BudgetSummary {
    totalBudget: number;
    totalSpent: number;
    remainingBudget: number;
}

interface BudgetPhase {
    phase: number;
    name: string;
    budget: number;
    spent: number;
}

// Financial data structure
interface FinancialData {
  expenses: Expense[];
  budgetSummary: BudgetSummary;
  budgetByPhase: BudgetPhase[];
}

interface Photo {
  id: string;
  url: string;
  thumbnailUrl: string;
  phase: number;
  date: string;
  description: string;
}

// Gallery data structure
interface GalleryData {
  photos: Photo[];
}

interface User {
  id: string;
  name: string;
  role: string;
}

interface Attachment {
  name: string;
  url: string;
}

interface Message {
  id: string;
  timestamp: string;
  sender: User;
  recipient: User;
  subject: string;
  body: string;
  read: boolean;
  attachments: Attachment[];
}

// Messages data structure
interface MessagesData {
  messages: Message[];
}

interface DocumentFile {
  id: string;
  name: string;
  category: string;
  uploadDate: string;
  fileUrl: string;
  fileType: string;
  sizeMB: number;
}

// Documents data structure
interface DocumentsData {
  documents: DocumentFile[];
}

// Export necessary types individually if needed elsewhere, or keep them internal if only used by mock data
export type { UserSession, ProjectSummary, Milestone, Activity, PhaseProgress, DashboardData, Expense, BudgetSummary, BudgetPhase, Photo, User, Attachment, Message, DocumentFile, DocumentsData, GalleryData, MessagesData, FinancialData };

