import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug?.[0] ?? 'all';

  const title = `Notes filtered by: ${filter} | NoteHub`;
  const description = `Browse notes filtered by ${filter} in NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-chi-lac.vercel.app/notes/filter/${slug.join('/')}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes filtered by ${filter}`,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug?.[0] ?? 'all';

  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes({ page: 1, search: '', tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
