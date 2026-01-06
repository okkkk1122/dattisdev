import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mockPosts } from '@/lib/data/mockData';

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  content?: string;
  status: 'منتشر شده' | 'پیش‌نویس';
  views: number;
}

interface PostsState {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'views'>) => void;
  updatePost: (id: number, post: Partial<Post>) => void;
  deletePost: (id: number) => void;
  getPost: (id: number) => Post | undefined;
  getPublishedPosts: () => Post[];
}

export const usePostsStore = create<PostsState>()(
  persist(
    (set, get) => ({
      posts: mockPosts as Post[],
      addPost: (post) => {
        const newPost: Post = {
          ...post,
          id: Date.now(),
          views: 0,
          status: post.status || 'پیش‌نویس',
        };
        set((state) => ({
          posts: [newPost, ...state.posts],
        }));
      },
      updatePost: (id, updatedPost) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, ...updatedPost } : post
          ),
        }));
      },
      deletePost: (id) => {
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        }));
      },
      getPost: (id) => {
        return get().posts.find((post) => post.id === id);
      },
      getPublishedPosts: () => {
        return get().posts.filter((post) => post.status === 'منتشر شده');
      },
    }),
    {
      name: 'dattisdev-posts-storage',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined,
      skipHydration: false,
    }
  )
);

