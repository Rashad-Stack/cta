export interface DarkModeState {
  isDarkMode: boolean;
}

export interface UserTypes {
  id: string;
  name: string;
  email: string;
  password: string;
  teamId?: string[];
  image?: string;
  bio?: string;
  assignedTasks: string[];
}

export type StatusTypes = "pending" | "in-progress" | "completed";

export interface TaskTypes {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: StatusTypes;
  dueDate: string;
  teamId: string;
  priority: string;
  assigned: string[];
}

export interface TeamTypes {
  id: string;
  teamName: string;
  userId: string[];
}

export interface TeamsStatsType {
  name: string;
  totalTask: number;
  members: number;
  pending: number;
  inProgress: number;
  completed: number;
}

export interface rootState {
  darkMode: DarkModeState;
  users: {
    users: UserTypes[];
    isLoggedIn: boolean;
    currentUser: UserTypes | null;
  };
  tasks: {
    tasks: TaskTypes[];
  };
  teams: {
    teams: TeamTypes[];
  };
}
