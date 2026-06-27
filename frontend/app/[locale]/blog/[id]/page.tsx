import BlogDetailPage from '@/components/features/blog/BlogDetailPage';

export default function Page({ params }: { params: { locale: string; id: string } }) {
  return <BlogDetailPage postId={params.id} />;
}
