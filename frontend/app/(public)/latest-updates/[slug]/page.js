import { redirect } from 'next/navigation';

export default async function LatestUpdateSlugPage({ params }) {
  const { slug } = await params;
  redirect(`/latest/${slug}`);
}
