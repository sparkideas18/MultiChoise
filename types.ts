export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string; // Material Icon name or similar identifier
  path: string;
  color: string;
}

export enum ToolCategory {
  PRODUCTIVITY = 'Productivity',
  FINANCE = 'Finance',
  UTILITY = 'Utility',
  ENTERTAINMENT = 'Entertainment',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  description: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}
