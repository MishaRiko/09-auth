// import axios from 'axios';
// import type { Note } from '../types/note.ts';

// const API_URL = 'https://notehub-public.goit.study/api';
// const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
// export interface FetchNotesResponse {
//   notes: Note[];
//   totalPages: number;
//   // page: number;
//   // perPage: number;
// }
// export const fetchNoteById = async (id: string): Promise<Note> => {
//   const response = await axios.get<Note>(`${API_URL}/notes/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };
// export const fetchNotes = async (
//   page: number,
//   search: string,
//   tag?: string
// ): Promise<FetchNotesResponse> => {
//   const response = await axios.get<FetchNotesResponse>(`${API_URL}/notes`, {
//     params: {
//       page,
//       perPage: 12,
//       search,
//       ...(tag && tag !== 'all' ? { tag } : {}),
//     },
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };

// export interface CreateNotePayload {
//   title: string;
//   content?: string;
//   tag: Note['tag'];
// }

// export const createNote = async (note: CreateNotePayload): Promise<Note> => {
//   const response = await axios.post<Note>(`${API_URL}/notes`, note, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   return response.data;
// };

// export const deleteNote = async (id: string): Promise<Note> => {
//   const response = await axios.delete<Note>(`${API_URL}/notes/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };

import { api } from './api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
}
// ===== Notes =====
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  search?: string;
  tag?: string;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { page = 1, search = '', tag } = params;
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      search,
      ...(tag && tag !== 'all' ? { tag } : {}),
    },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: Note['tag'];
}

export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

// ===== Auth =====
export const register = async (payload: RegisterData): Promise<User> => {
  const { data } = await api.post<User>('/auth/register', payload);
  return data;
};

export const login = async (payload: LoginData): Promise<User> => {
  const { data } = await api.post<User>('/auth/login', payload);
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<boolean> => {
  const { data } = await api.get<{ success: boolean }>('/auth/session');
  return data.success;
};

// ===== Users =====
export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export interface UpdateMePayload {
  username: string;
}
export const updateMe = async (payload: UpdateMePayload): Promise<User> => {
  const { data } = await api.patch<User>('/users/me', payload);
  return data;
};
