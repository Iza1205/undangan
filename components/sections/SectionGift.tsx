'use client'

import { weddingConfig } from '@/lib/weddingData'
import { CreditCard, Package, Copy, Check } from 'lucide-react'
import { useState } from 'react'

const S: Record<string, React.CSSProperties> = {
  label: { fontSize: 11, fontWeight: 500, color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase' as const },
  tabBtn: {
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    padding: '12px', borderRadius: 12, border: '1px solid var(--border)',
    fontSize: 13, fontWeight: 600, transition: 'all 0.2s', cursor: 'pointer'
  }
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
        border: '1px solid var(--border)' 
      }}>
        <button onClick={() => setActiveTab('bank')} style={{ 
          ...S.tabBtn, 
          background: activeTab === 'bank' ? 'var(--accent)' : 'transparent',
          color: activeTab === 'bank' ? '#fff' : 'var(--ink-2)',
          borderColor: activeTab === 'bank' ? 'var(--accent)' : 'transparent',
          boxShadow: activeTab === 'bank' ? '0 4px 12px rgba(var(--accent-rgb), 0.2)' : 'none'
        }}>
          <CreditCard size={16} /> Transfer
        </button>
        <button onClick={() => setActiveTab('kado')} style={{ 
          ...S.tabBtn, 
          background: activeTab === 'kado' ? 'var(--accent)' : 'transparent',
          color: activeTab === 'kado' ? '#fff' : 'var(--ink-2)',
          borderColor: activeTab === 'kado' ? 'var(--accent)' : 'transparent',
          boxShadow: activeTab === 'kado' ? '0 4px 12px rgba(var(--accent-rgb), 0.2)' : 'none'
        }}>
          <Package size={16} /> Kirim Kado
        </button>
      </div>

      <div className="fade-in">
        {activeTab === 'bank' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {gifts.accounts.map((acc, index) => (
              <div key={index} className="card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>{acc.bankName}</p>
                    <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink-1)', margin: '4px 0', letterSpacing: '0.02em' }}>{acc.number}</p>
                    <p style={{ fontSize: 12, color: 'var(--ink-3)' }}>a.n {acc.holder}</p>
                  </div>
                  <button onClick={() => handleCopy(acc.number, `bank-${index}`)} style={{
                    background: 'var(--accent-bg)', border: 'none', borderRadius: 8,
                    padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
                  }}>
                    {copiedId === `bank-${index}` ? <Check size={14} color="var(--accent)" strokeWidth={3} /> : <Copy size={14} color="var(--accent)" strokeWidth={2.5} />}
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)' }}>
                      {copiedId === `bank-${index}` ? 'Disalin' : 'Salin'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'kado' && (
          <div className="card" style={{ padding: 20, borderStyle: 'dashed', borderWidth: 2 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-1)', marginBottom: 4 }}>{gifts.shipping.receiver}</p>
            <p style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.6, marginBottom: 16 }}>{gifts.shipping.address}</p>
            <button onClick={() => handleCopy(gifts.shipping.address, 'address')} style={{
              width: '100%', padding: '12px', background: 'var(--accent-bg)', 
              border: 'none', borderRadius: 10, fontSize: 12, fontWeight: 700, 
              color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
            }}>
              {copiedId === 'address' ? <Check size={14} /> : <Copy size={14} />}
              {copiedId === 'address' ? 'Alamat Disalin' : 'Salin Alamat Lengkap'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}