import { cookies } from 'next/headers';
import { api } from './api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

interface FetchNotesParams {
  page?: number;
  search?: string;
  tag?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const { page = 1, search = '', tag } = params;
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      search,
      ...(tag && tag !== 'all' ? { tag } : {}),
    },
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get<User>('/users/me', {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await api.get('/auth/session', {
    headers: { Cookie: cookieStore.toString() },
  });
  return res;
};
