import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mockProjects } from '@/lib/data/mockData';

export interface Project {
  id: number;
  title: string;
  category: 'web' | 'app' | 'bot' | 'software' | string;
  image: string;
  description: string;
  technologies: string[];
  link: string;
  status: 'فعال' | 'غیرفعال' | string;
  views: number;
  date: string;
}

interface PortfolioState {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'views'>) => void;
  updateProject: (id: number, project: Partial<Project>) => void;
  deleteProject: (id: number) => void;
  getProject: (id: number) => Project | undefined;
  getActiveProjects: () => Project[];
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      projects: mockProjects as Project[],
      addProject: (project) => {
        const newProject: Project = {
          ...project,
          id: Date.now(),
          views: 0,
          status: project.status || 'فعال',
        };
        set((state) => ({
          projects: [newProject, ...state.projects],
        }));
      },
      updateProject: (id, updatedProject) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, ...updatedProject } : project
          ),
        }));
      },
      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        }));
      },
      getProject: (id) => {
        return get().projects.find((project) => project.id === id);
      },
      getActiveProjects: () => {
        return get().projects.filter((project) => project.status === 'فعال');
      },
    }),
    {
      name: 'dattisdev-portfolio-storage',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined,
      skipHydration: false,
    }
  )
);

