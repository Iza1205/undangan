import { getBySlug } from '@/lib/store'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const WEDDING_TITLE = 'The Wedding Of Nurul & Iza | by Izwed Invitation'
const WEDDING_DATE = 'Selasa, 02 Juni 2026'
const SITE_NAME = 'izwed.my.id'
const BASE_URL = 'https://izwed.my.id'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  return {
    title: WEDDING_TITLE,
    description: WEDDING_DATE,
    openGraph: {
      title: WEDDING_TITLE,
      description: WEDDING_DATE,
      url: `${BASE_URL}/invitation/${params.slug}`,
      siteName: SITE_NAME,
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: WEDDING_TITLE,
        },
      ],
    },
  }
}

export default async function InvitationSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const guest = await getBySlug(params.slug)
  if (!guest) notFound()

  const redirectUrl = `/undangan?untuk=${encodeURIComponent(guest.name)}`

  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${redirectUrl}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            sessionStorage.setItem('from_cover', 'true');
            window.location.replace('${redirectUrl}');
          `,
        }}
      />
    </>
  )
}