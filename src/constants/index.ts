import {
  HiOutlineClipboardDocumentList,
  HiOutlineDocumentCheck,
  HiOutlineDocumentText,
  HiOutlineSquares2X2,
  HiOutlineUserGroup,
} from "react-icons/hi2";

export const menus = [
  {
    name: "Dashboard",
    icon: HiOutlineSquares2X2,
    link: "/dashboard",
  },
  {
    name: "My Tasks",
    icon: HiOutlineDocumentText,
    link: "/tasks",
  },
  {
    name: "My Teams",
    icon: HiOutlineUserGroup,
    link: "/team",
  },
  {
    name: "Assigned",
    icon: HiOutlineDocumentCheck,
    link: "/assigned",
  },
  {
    name: "Team Tasks",
    icon: HiOutlineClipboardDocumentList,
    link: "/team-tasks",
  },
];

export const sortBy = [
  { id: 1, value: "name-asc", label: "Sort by name (A-Z)", unavailable: false },
  { id: 2, value: "name-dsc", label: "Sort by name (Z-A)", unavailable: false },
  {
    id: 3,
    value: "priority-asc",
    label: "Sort by Priority (Low)",
    unavailable: false,
  },
  {
    id: 4,
    value: "priority-dsc",
    label: "Sort by Priority (High)",
    unavailable: false,
  },
  {
    id: 5,
    value: "due-date-asc",
    label: "Sort by Due Date (Low)",
    unavailable: false,
  },
  {
    id: 6,
    value: "due-date-dsc",
    label: "Sort by Due Date (High)",
    unavailable: false,
  },
];

export const status = [
  { id: 1, label: "Pending", value: "pending" },
  { id: 2, label: "In progress", value: "in-progress", unavailable: false },
  { id: 3, label: "Completed", value: "completed", unavailable: false },
];

export const priorities = [
  { id: 1, label: "Low", value: 1, unavailable: false },
  { id: 2, label: "Medium", value: 1, unavailable: false },
  { id: 3, label: "High", value: 3, unavailable: false },
];

export const filters = [
  { id: 1, label: "All", value: "" },
  { id: 2, label: "Pending", value: "pending" },
  { id: 3, label: "In progress", value: "in-progress" },
  { id: 4, label: "Completed", value: "completed" },
];
