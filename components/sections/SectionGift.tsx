'use client'

import { weddingConfig } from '@/lib/weddingData'
import { CreditCard, Package, Copy, Check, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const BCA_INSTRUCTIONS = [
  {
    title: 'Sesama BCA (BCA Mobile)',
    type: 'ol' as const,
    steps: [
      'Buka BCA Mobile, pilih m-BCA & masukkan kode akses.',
      'Pilih m-Transfer > Transfer Antar Rekening.',
      'Pilih Daftar Rekening atau langsung Transfer.',
      'Masukkan nomor rekening tujuan, isi nominal.',
      'Masukkan PIN BCA. Dana masuk real-time.',
    ],
  },
  {
    title: 'Beda Bank (BCA Mobile)',
    type: 'ol' as const,
    steps: [
      'Buka BCA Mobile, pilih m-BCA.',
      'Pilih m-Transfer > Transfer Antar Bank.',
      'Daftarkan bank tujuan (nomor rek & pilih bank).',
      'Pilih bank tujuan & masukkan nominal.',
      'Pilih BI-FAST (Rp2.500) atau Transfer Online (Rp6.500).',
      'Cek data, masukkan PIN. Selesai.',
    ],
  },
  {
    title: 'Via ATM BCA',
    type: 'ul' as const,
    steps: [
      'Sesama: Kartu > PIN > Transfer > Ke Rek BCA > No. Rek & Nominal.',
      'Beda Bank: Kartu > PIN > Transfer > Ke Bank Lain > Kode Bank + No. Rek > Nominal.',
    ],
  },
]

const BSI_INSTRUCTIONS = [
  {
    title: 'Sesama BSI (BSI Mobile)',
    type: 'ol' as const,
    steps: [
      'Buka aplikasi BSI Mobile dan login.',
      'Pilih menu Transfer.',
      'Pilih Transfer antar Rekening BSI.',
      'Masukkan PIN, lalu masukkan nomor rekening tujuan dan nominal.',
      'Konfirmasi detail transfer dan selesai.',
    ],
  },
  {
    title: 'Beda Bank / BI Fast (BSI Mobile)',
    type: 'ol' as const,
    steps: [
      'Buka aplikasi BSI Mobile dan login.',
      'Pilih menu Transfer.',
      'Pilih Transfer ke Bank Lain.',
      'Pilih metode, disarankan BI Fast untuk biaya lebih murah.',
      'Pilih bank tujuan dan masukkan nomor rekening tujuan.',
      'Masukkan nominal, konfirmasi, dan masukkan PIN.',
    ],
  },
]

const BANK_META: Record<string, { instructions: typeof BCA_INSTRUCTIONS }> = {
  'Bank BCA': { instructions: BCA_INSTRUCTIONS },
  'Bank BSI': { instructions: BSI_INSTRUCTIONS },
}

const S: Record<string, React.CSSProperties> = {
  label: {
    fontSize: 11, fontWeight: 500, color: 'var(--ink-3)',
    letterSpacing: '0.06em', textTransform: 'uppercase' as const,
  },
  tabBtn: {
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    padding: '12px', borderRadius: 12, border: '1px solid var(--border)',
    fontSize: 13, fontWeight: 600, transition: 'all 0.2s', cursor: 'pointer',
  },
}

const copyKeyframes = `
@keyframes copyBounce {
  0%   { transform: scale(1); }
  25%  { transform: scale(0.88); }
  55%  { transform: scale(1.1); }
  80%  { transform: scale(0.97); }
  100% { transform: scale(1); }
}
@keyframes iconOut {
  0%   { opacity: 1; transform: scale(1) rotate(0deg); }
  100% { opacity: 0; transform: scale(0.3) rotate(-20deg); }
}
@keyframes iconIn {
  0%   { opacity: 0; transform: scale(0.3) rotate(20deg); }
  100% { opacity: 1; transform: scale(1) rotate(0deg); }
}
@keyframes numFlash {
  0%   { color: var(--ink-1); }
  35%  { color: var(--accent); }
  100% { color: var(--ink-1); }
}
`

function TransferInstructions({ instructions }: { instructions: typeof BCA_INSTRUCTIONS }) {
  if (!instructions.length) return null
  return (
    <div style={{ padding: '4px 16px 14px', fontSize: 11, color: 'var(--ink-3)', lineHeight: 1.7 }}>
      {instructions.map((section, i) => (
        <div key={i} style={{ marginTop: i === 0 ? 0 : 10 }}>
          <p style={{
            fontSize: 10, fontWeight: 700, color: 'var(--ink-2)',
            textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4,
          }}>
            {section.title}
          </p>
          {section.type === 'ol' ? (
            <ol style={{ paddingLeft: 16 }}>
              {section.steps.map((s, j) => <li key={j} style={{ marginBottom: 2 }}>{s}</li>)}
            </ol>
          ) : (
            <ul style={{ paddingLeft: 16 }}>
              {section.steps.map((s, j) => <li key={j} style={{ marginBottom: 2 }}>{s}</li>)}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

function BankCard({
  acc,
  index,
  copiedId,
  onCopy,
}: {
  acc: typeof weddingConfig.gifts.accounts[0]
  index: number
  copiedId: string | null
  onCopy: (text: string, id: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [animating, setAnimating] = useState(false)
  const instructions = BANK_META[acc.bankName]?.instructions ?? []
  const isCopied = copiedId === `bank-${index}`

  const handleCopyClick = () => {
    setAnimating(true)
    onCopy(acc.number, `bank-${index}`)
    setTimeout(() => setAnimating(false), 500)
  }

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <style>{copyKeyframes}</style>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>
              {acc.bankName}
            </p>
            <p style={{
              fontSize: 18, fontWeight: 700, margin: '4px 0', letterSpacing: '0.02em',
              animation: animating ? 'numFlash 0.6s ease forwards' : 'none',
              color: 'var(--ink-1)',
            }}>
              {acc.number}
            </p>
            <p style={{ fontSize: 12, color: 'var(--ink-3)' }}>a.n {acc.holder}</p>
          </div>
          <button
            onClick={handleCopyClick}
            style={{
              background: 'var(--accent-bg)', border: 'none', borderRadius: 8,
              padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              animation: animating ? 'copyBounce 0.45s ease forwards' : 'none',
            }}
          >
            <span style={{ position: 'relative', width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{
                position: 'absolute',
                animation: animating ? 'iconOut 0.2s ease forwards' : 'none',
                opacity: isCopied ? 0 : 1,
              }}>
                <Copy size={14} color="var(--accent)" strokeWidth={2.5} />
              </span>
              <span style={{
                position: 'absolute',
                animation: animating ? 'iconIn 0.2s ease 0.2s forwards' : 'none',
                opacity: isCopied ? 1 : 0,
              }}>
                <Check size={14} color="var(--accent)" strokeWidth={3} />
              </span>
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)' }}>
              {isCopied ? 'Disalin' : 'Salin'}
            </span>
          </button>
        </div>
      </div>

      {instructions.length > 0 && (
        <>
          <div style={{ height: '0.5px', background: 'var(--border)' }} />
          <button
            onClick={() => setOpen(!open)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 16px', background: 'transparent', border: 'none',
              cursor: 'pointer', textAlign: 'left' as const,
            }}
          >
            <span style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 500 }}>Cara transfer</span>
            <ChevronDown
              size={13}
              color="var(--ink-3)"
              style={{
                transition: 'transform 0.25s',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                flexShrink: 0,
              }}
            />
          </button>
          <div style={{ overflow: 'hidden', maxHeight: open ? 700 : 0, transition: 'max-height 0.3s ease' }}>
            <TransferInstructions instructions={instructions} />
          </div>
        </>
      )}
    </div>
  )
}

export default function SectionGift() {
  const { gifts } = weddingConfig
  const [activeTab, setActiveTab] = useState<'bank' | 'kado'>('bank')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div style={{ padding: '0 20px', marginTop: 16, paddingBottom: 16 }} className="fade-up fade-up-delay-5">

      <p style={{ ...S.label, marginBottom: 12 }}>Wedding Gift</p>

      <div style={{
        display: 'flex', gap: 10, marginBottom: 16,
        background: 'var(--surface)', padding: 4, borderRadius: 14,
        border: '1px solid var(--border)',
      }}>
        <button onClick={() => setActiveTab('bank')} style={{
          ...S.tabBtn,
          background: activeTab === 'bank' ? 'var(--accent)' : 'transparent',
          color: activeTab === 'bank' ? '#fff' : 'var(--ink-2)',
          borderColor: activeTab === 'bank' ? 'var(--accent)' : 'transparent',
          boxShadow: activeTab === 'bank' ? '0 4px 12px rgba(var(--accent-rgb), 0.2)' : 'none',
        }}>
          <CreditCard size={16} /> Transfer
        </button>
        <button onClick={() => setActiveTab('kado')} style={{
          ...S.tabBtn,
          background: activeTab === 'kado' ? 'var(--accent)' : 'transparent',
          color: activeTab === 'kado' ? '#fff' : 'var(--ink-2)',
          borderColor: activeTab === 'kado' ? 'var(--accent)' : 'transparent',
          boxShadow: activeTab === 'kado' ? '0 4px 12px rgba(var(--accent-rgb), 0.2)' : 'none',
        }}>
          <Package size={16} /> Kirim Kado
        </button>
      </div>

      <div className="fade-in">
        {activeTab === 'bank' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {gifts.accounts.map((acc, index) => (
              <BankCard
                key={index}
                acc={acc}
                index={index}
                copiedId={copiedId}
                onCopy={handleCopy}
              />
            ))}
          </div>
        )}

        {activeTab === 'kado' && (
          <div className="card" style={{ padding: 20, borderStyle: 'dashed', borderWidth: 2 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-1)', marginBottom: 4 }}>
              {gifts.shipping.receiver}
            </p>
            <p style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.6, marginBottom: 16 }}>
              {gifts.shipping.address}
            </p>
            <button
              onClick={() => handleCopy(gifts.shipping.address, 'address')}
              style={{
                width: '100%', padding: '12px', background: 'var(--accent-bg)',
                border: 'none', borderRadius: 10, fontSize: 12, fontWeight: 700,
                color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                cursor: 'pointer',
              }}
            >
              {copiedId === 'address' ? <Check size={14} /> : <Copy size={14} />}
              {copiedId === 'address' ? 'Alamat Disalin' : 'Salin Alamat Lengkap'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}