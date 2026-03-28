import { getBySlug } from '@/lib/store'
import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'

export default async function InvitationSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const guest = getBySlug(params.slug)
  if (!guest) notFound()

  // Mark as opened server-side
  const { markOpened } = await import('@/lib/store')
  markOpened(params.slug)

  // Redirect to the undangan page with the guest name
  redirect(`/undangan?untuk=${encodeURIComponent(guest.name)}`)
}
