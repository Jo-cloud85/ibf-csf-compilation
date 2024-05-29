export type Task = {
  taskName: string
  dueDate: string
}
export type Project = {
  id: string
  projectName: string
  tasks: Task[]
}
export type ProjectInfo = {
  id: string
  projectName: string
  taskCount: number
}

// Basically this is for state management where you use Component store which is storing data in memory. 
// Data will be gone after you shut down the computer. This is totally separate from Dexie
export interface ProjectSlice {
  projects: Project[]
}
