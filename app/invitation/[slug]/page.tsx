import { getBySlug, markOpened } from '@/lib/store'
import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'

export default async function InvitationSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const guest = await getBySlug(params.slug)
  if (!guest) notFound()

  await markOpened(params.slug)

  redirect(`/undangan?untuk=${encodeURIComponent(guest.name)}`)
}