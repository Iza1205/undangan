'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import * as XLSX from 'xlsx'

type Guest    = { id:string; name:string; slug:string; type:'umum'|'vip'; category:string; phone:string; notes:string; opened:boolean; openedAt:string|null; createdAt:string }
type RSVP     = { id:string; name:string; attendance:'hadir'|'tidak'; notes:string; createdAt:string }
type Doa      = { id:string; name:string; message:string; createdAt:string }
type Stats    = { total:number; opened:number; vip:number }
type RsvpStats = { total:number; hadir:number; tidak:number }
type DoaStats  = { total:number }
type Tab      = 'guests'|'import'|'template'|'rsvp'|'doa'

const BASE_URL = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000')
const GROOM = process.env.NEXT_PUBLIC_GROOM_NAME ?? 'Iza'
const BRIDE = process.env.NEXT_PUBLIC_BRIDE_NAME ?? 'Nurul'

const DEFAULT_TEMPLATE = `Assalamualaikum Wr. Wb. 🌸

Kepada Yth.
Bapak/Ibu/Saudara/i
*{nama}*

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat untuk menghadiri acara pernikahan kami.

Berikut link undangan kami, untuk info lengkap dari acara bisa kunjungi :

{link}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Wassalamu'alaikum Warahmatullahi Wabarakatuh

Terima kasih banyak atas perhatiannya.

_Keluarga Besar ${GROOM} & ${BRIDE}_`

const invUrl = (slug:string) => `${BASE_URL}/invitation/${slug}`

function buildMsg(tmpl:string, g:Guest) {
  return tmpl
    .replace(/\{nama\}/gi, g.name)
    .replace(/\{link\}/gi, invUrl(g.slug))
    .replace(/\{groom\}/gi, GROOM)
    .replace(/\{bride\}/gi, BRIDE)
}

function waUrl(g:Guest, tmpl:string) {
  const phone = g.phone.replace(/\D/g,'').replace(/^0/,'62')
  const msg   = encodeURIComponent(buildMsg(tmpl, g))
  return phone ? `https://wa.me/${phone}?text=${msg}` : `https://wa.me/?text=${msg}`
}

const T = {
  font:     "'Plus Jakarta Sans', sans-serif",
  bg:       '#F7F7F8',
  surface:  '#FFFFFF',
  border:   '#EBEBEC',
  ink1:     '#111113',
  ink2:     '#4A4A52',
  ink3:     '#9898A0',
  accent:   '#4F46E5',
  accentBg: '#EEEDF9',
}

const inp: React.CSSProperties = {
  width:'100%', padding:'9px 12px',
  background:T.bg, border:`1px solid ${T.border}`, borderRadius:8,
  color:T.ink1, fontFamily:T.font, fontSize:13, fontWeight:400, outline:'none',
}

function Lbl({ children }: { children:React.ReactNode }) {
  return <label style={{ fontSize:11, fontWeight:500, color:T.ink3, letterSpacing:'0.06em', textTransform:'uppercase', display:'block', marginBottom:5 }}>{children}</label>
}

function Tag({ children }: { children:React.ReactNode }) {
  return <code style={{ background:T.accentBg, color:T.accent, padding:'1px 7px', borderRadius:4, fontSize:12, fontFamily:'monospace' }}>{children}</code>
}

export default function AdminDashboard() {
  const [guests, setGuests]             = useState<Guest[]>([])
  const [stats,  setStats]              = useState<Stats>({ total:0, opened:0, vip:0 })
  const [rsvps,  setRsvps]              = useState<RSVP[]>([])
  const [rsvpStats, setRsvpStats]       = useState<RsvpStats>({ total:0, hadir:0, tidak:0 })
  const [doas,   setDoas]               = useState<Doa[]>([])
  const [doaStats, setDoaStats]         = useState<DoaStats>({ total:0 })
  const [loading, setLoading]           = useState(true)
  const [rsvpLoading, setRsvpLoading]   = useState(true)
  const [doaLoading, setDoaLoading]     = useState(true)
  const [tab,    setTab]                = useState<Tab>('guests')
  const [search, setSearch]             = useState('')
  const [fType,  setFType]              = useState<'all'|'vip'|'umum'>('all')
  const [rsvpFilter, setRsvpFilter]     = useState<'all'|'hadir'|'tidak'>('all')
  const [tmpl,   setTmpl]               = useState(DEFAULT_TEMPLATE)
  const [copied, setCopied]             = useState<string|null>(null)
  const [preview, setPreview]           = useState<Array<{name:string;type:string;category:string;phone:string}>>([])
  const [importing, setImporting]       = useState(false)
  const [addForm, setAddForm]           = useState({ name:'', type:'umum', category:'', phone:'' })
  const [adding, setAdding]             = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const fetchGuests = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/guests'); const d = await r.json()
      setGuests(d.guests ?? []); setStats(d.stats ?? { total:0, opened:0, vip:0 })
    } catch(e){console.error(e)} finally{setLoading(false)}
  }, [])

  const fetchRsvp = useCallback(async () => {
    setRsvpLoading(true)
    try {
      const r = await fetch('/api/rsvp'); const d = await r.json()
      setRsvps(d.rsvps ?? []); setRsvpStats(d.stats ?? { total:0, hadir:0, tidak:0 })
    } catch(e){console.error(e)} finally{setRsvpLoading(false)}
  }, [])

  const fetchDoa = useCallback(async () => {
    setDoaLoading(true)
    try {
      const r = await fetch('/api/doa'); const d = await r.json()
      setDoas(d.doas ?? []); setDoaStats(d.stats ?? { total:0 })
    } catch(e){console.error(e)} finally{setDoaLoading(false)}
  }, [])

  useEffect(() => { fetchGuests() }, [fetchGuests])
  useEffect(() => { if (tab === 'rsvp') fetchRsvp() }, [tab, fetchRsvp])
  useEffect(() => { if (tab === 'doa')  fetchDoa()  }, [tab, fetchDoa])

  const filtered = guests.filter(g =>
    (g.name.toLowerCase().includes(search.toLowerCase()) || g.category.toLowerCase().includes(search.toLowerCase())) &&
    (fType==='all' || g.type===fType)
  )

  const filteredRsvp = rsvps.filter(r => rsvpFilter === 'all' || r.attendance === rsvpFilter)

  const copy = async (text:string, key:string) => {
    await navigator.clipboard.writeText(text)
    setCopied(key); setTimeout(() => setCopied(null), 2000)
  }

  const handleAdd = async () => {
    if (!addForm.name.trim()) return
    setAdding(true)
    try {
      const r = await fetch('/api/guests', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(addForm) })
      if (r.ok) { setAddForm({ name:'', type:'umum', category:'', phone:'' }); await fetchGuests() }
    } finally { setAdding(false) }
  }

  const handleDelete = async (id:string) => {
    if (!confirm('Hapus tamu ini?')) return
    await fetch(`/api/guests/${id}`, { method:'DELETE' }); await fetchGuests()
  }

  const handleDeleteRsvp = async (id:string) => {
    if (!confirm('Hapus konfirmasi ini?')) return
    await fetch(`/api/rsvp?id=${id}`, { method:'DELETE' }); await fetchRsvp()
  }

  const handleDeleteDoa = async (id:string) => {
    if (!confirm('Hapus ucapan ini?')) return
    await fetch(`/api/doa?id=${id}`, { method:'DELETE' }); await fetchDoa()
  }

  const handleFile = (file:File) => {
    const reader = new FileReader()
    reader.onload = evt => {
      const wb = XLSX.read(evt.target?.result, { type:'binary' })
      const ws = wb.Sheets[wb.SheetNames[0]]
      const rows = XLSX.utils.sheet_to_json<Record<string,string>>(ws)
      setPreview(rows.map(r => ({
        name: String(r['Nama']||r['name']||'').trim(),
        type: String(r['Tipe']||r['type']||'umum').toLowerCase().trim(),
        category: String(r['Kategori']||r['category']||'').trim(),
        phone: String(r['No HP']||r['phone']||r['Telepon']||'').trim(),
      })).filter(r => r.name))
    }
    reader.readAsBinaryString(file)
  }

  const handleImport = async () => {
    if (!preview.length) return
    setImporting(true)
    try {
      const r = await fetch('/api/guests/import', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ guests:preview }) })
      if (r.ok) { setPreview([]); if (fileRef.current) fileRef.current.value=''; await fetchGuests(); setTab('guests') }
    } finally { setImporting(false) }
  }

  const dlTemplate = () => {
    const ws = XLSX.utils.aoa_to_sheet([['Nama','Tipe','Kategori','No HP'],['Budi Santoso','vip','Keluarga','08123456789'],['Siti Rahayu','umum','Teman','08234567890']])
    const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Tamu'); XLSX.writeFile(wb, 'template-undangan.xlsx')
  }

  const dlRsvpExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      ['Nama','Kehadiran','Keterangan','Waktu'],
      ...rsvps.map(r => [r.name, r.attendance==='hadir'?'Hadir':'Tidak Hadir', r.notes || '—', new Date(r.createdAt).toLocaleString('id-ID')])
    ])
    const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Konfirmasi'); XLSX.writeFile(wb, 'konfirmasi-kehadiran.xlsx')
  }

  const dlDoaExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet([['Nama','Ucapan & Doa','Waktu'], ...doas.map(d => [d.name, d.message, new Date(d.createdAt).toLocaleString('id-ID')])])
    const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Ucapan'); XLSX.writeFile(wb, 'ucapan-doa.xlsx')
  }

  return (
    <div style={{ minHeight:'100vh', background:T.bg, fontFamily:T.font, color:T.ink1 }}>
      <div style={{ display:'flex', minHeight:'100vh' }}>

        {/* SIDEBAR */}
        <aside style={{ width:220, background:T.surface, borderRight:`1px solid ${T.border}`, display:'flex', flexDirection:'column', padding:'24px 12px', position:'sticky', top:0, height:'100vh', flexShrink:0 }}>
          <div style={{ padding:'0 8px', marginBottom:28 }}>
            <div style={{ width:34, height:34, borderRadius:8, background:T.accent, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, marginBottom:12 }}>💍</div>
            <p style={{ fontSize:15, fontWeight:700, color:T.ink1, letterSpacing:'-0.03em', lineHeight:1.2 }}>{GROOM} &amp; {BRIDE}</p>
            <p style={{ fontSize:10, fontWeight:500, color:T.ink3, letterSpacing:'0.08em', textTransform:'uppercase', marginTop:3 }}>Admin Panel</p>
          </div>
          <nav style={{ flex:1, display:'flex', flexDirection:'column', gap:2 }}>
            {([
              { key:'guests',   icon:'👥', label:'Daftar Tamu',  badge: null },
              { key:'rsvp',     icon:'✅', label:'Konfirmasi',   badge: rsvpStats.total > 0 ? rsvpStats.total : null },
              { key:'doa',      icon:'🤲', label:'Ucapan & Doa', badge: doaStats.total > 0 ? doaStats.total : null },
              { key:'import',   icon:'📂', label:'Import Excel', badge: null },
              { key:'template', icon:'✉️',  label:'Template WA',  badge: null },
            ] as {key:Tab;icon:string;label:string;badge:number|null}[]).map(item => (
              <button key={item.key} onClick={() => setTab(item.key)}
                style={{ display:'flex', alignItems:'center', gap:9, padding:'9px 10px', borderRadius:8, border:'none', cursor:'pointer', textAlign:'left', fontSize:13, fontWeight:500, fontFamily:T.font, transition:'all 0.15s', background: tab===item.key ? T.accentBg : 'transparent', color: tab===item.key ? T.accent : T.ink2 }}
              >
                <span style={{ fontSize:14 }}>{item.icon}</span>
                {item.label}
                {item.badge !== null && (
                  <span style={{ marginLeft:'auto', background:T.accent, color:'#fff', fontSize:10, fontWeight:700, padding:'1px 6px', borderRadius:10 }}>{item.badge}</span>
                )}
              </button>
            ))}
          </nav>
          <a href="/undangan" target="_blank" style={{ display:'flex', alignItems:'center', gap:9, padding:'9px 10px', borderRadius:8, textDecoration:'none', fontSize:13, fontWeight:500, color:T.ink3 }}>
            <span style={{ fontSize:14 }}>↗</span> Preview
          </a>
        </aside>

        {/* MAIN */}
        <main style={{ flex:1, padding:'28px 28px', overflowX:'auto', minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:22 }}>
            <div>
              <h1 style={{ fontSize:18, fontWeight:700, color:T.ink1, letterSpacing:'-0.03em', margin:0 }}>
                {tab==='guests' ? 'Daftar Tamu' : tab==='import' ? 'Import Excel' : tab==='rsvp' ? 'Konfirmasi Kehadiran' : tab==='doa' ? 'Ucapan & Doa' : 'Template WhatsApp'}
              </h1>
              <p style={{ fontSize:12, color:T.ink3, margin:'3px 0 0' }}>
                {tab==='guests' ? `${stats.total} tamu terdaftar` : tab==='import' ? 'Upload file Excel untuk import massal' : tab==='rsvp' ? `${rsvpStats.hadir} hadir · ${rsvpStats.tidak} tidak hadir` : tab==='doa' ? `${doaStats.total} ucapan masuk` : 'Kustomisasi pesan undangan'}
              </p>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              {tab==='import' && <button onClick={dlTemplate} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:8, border:`1px solid ${T.border}`, background:T.surface, color:T.ink2, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:T.font }}>↓ Template Excel</button>}
              {tab==='rsvp' && rsvps.length > 0 && <button onClick={dlRsvpExcel} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:8, border:`1px solid ${T.border}`, background:T.surface, color:T.ink2, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:T.font }}>↓ Export Excel</button>}
              {tab==='doa' && doas.length > 0 && <button onClick={dlDoaExcel} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:8, border:`1px solid ${T.border}`, background:T.surface, color:T.ink2, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:T.font }}>↓ Export Excel</button>}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:22 }}>
            {(tab==='rsvp' ? [
              { label:'Total Konfirmasi', val:rsvpStats.total, accent:'#4F46E5', bg:'#EEEDF9', icon:'📋' },
              { label:'Hadir',            val:rsvpStats.hadir, accent:'#059669', bg:'#D1FAE5', icon:'✅' },
              { label:'Tidak Hadir',      val:rsvpStats.tidak, accent:'#DC2626', bg:'#FEE2E2', icon:'❌' },
            ] : tab==='doa' ? [
              { label:'Total Ucapan', val:doaStats.total, accent:'#4F46E5', bg:'#EEEDF9', icon:'🤲' },
              { label:'Hadir',        val:rsvpStats.hadir, accent:'#059669', bg:'#D1FAE5', icon:'✅' },
              { label:'Tidak Hadir',  val:rsvpStats.tidak, accent:'#DC2626', bg:'#FEE2E2', icon:'❌' },
            ] : [
              { label:'Total Tamu',   val:stats.total,  accent:'#4F46E5', bg:'#EEEDF9', icon:'👥' },
              { label:'Sudah Dibuka', val:stats.opened, accent:'#059669', bg:'#D1FAE5', icon:'💌' },
              { label:'VIP',          val:stats.vip,    accent:'#D97706', bg:'#FEF3C7', icon:'⭐' },
            ]).map(s => (
              <div key={s.label} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:10, padding:'16px 18px', display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:38, height:38, borderRadius:8, background:s.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:17, flexShrink:0 }}>{s.icon}</div>
                <div>
                  <p style={{ fontSize:22, fontWeight:700, color:s.accent, letterSpacing:'-0.03em', lineHeight:1 }}>{s.val}</p>
                  <p style={{ fontSize:11, color:T.ink3, marginTop:2 }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* TAB: GUESTS */}
          {tab==='guests' && (<>
            <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:10, padding:'18px 20px', marginBottom:16 }}>
              <p style={{ fontSize:11, fontWeight:600, color:T.ink3, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:14 }}>Tambah Tamu</p>
              <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 100px auto', gap:10, alignItems:'end' }}>
                {[{ k:'name', label:'Nama *', ph:'Nama tamu...' }, { k:'category', label:'Kategori', ph:'Keluarga...' }, { k:'phone', label:'No HP', ph:'628...' }].map(f => (
                  <div key={f.k}>
                    <Lbl>{f.label}</Lbl>
                    <input style={inp} placeholder={f.ph} value={(addForm as any)[f.k]} onChange={e => setAddForm(p => ({...p,[f.k]:e.target.value}))} onKeyDown={e => f.k==='name' && e.key==='Enter' && handleAdd()} />
                  </div>
                ))}
                <div>
                  <Lbl>Tipe</Lbl>
                  <select style={inp} value={addForm.type} onChange={e => setAddForm(p => ({...p,type:e.target.value}))}>
                    <option value="umum">Umum</option>
                    <option value="vip">VIP</option>
                  </select>
                </div>
                <button onClick={handleAdd} disabled={adding||!addForm.name.trim()} style={{ padding:'9px 16px', borderRadius:8, border:'none', background:T.accent, color:'#fff', fontSize:13, fontWeight:600, cursor:adding?'not-allowed':'pointer', fontFamily:T.font, opacity:adding?0.6:1, whiteSpace:'nowrap' }}>
                  {adding ? '...' : '+ Tambah'}
                </button>
              </div>
            </div>
            <div style={{ display:'flex', gap:10, marginBottom:12 }}>
              <div style={{ flex:1, display:'flex', alignItems:'center', gap:8, background:T.surface, border:`1px solid ${T.border}`, borderRadius:8, padding:'0 12px' }}>
                <span style={{ fontSize:13 }}>🔍</span>
                <input style={{ border:'none', outline:'none', background:'transparent', fontSize:13, color:T.ink1, width:'100%', padding:'9px 0', fontFamily:T.font }} placeholder="Cari nama atau kategori..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <div style={{ display:'flex', background:T.surface, border:`1px solid ${T.border}`, borderRadius:8, padding:3, gap:2 }}>
                {(['all','vip','umum'] as const).map(t => (
                  <button key={t} onClick={() => setFType(t)} style={{ padding:'5px 14px', borderRadius:6, border:'none', cursor:'pointer', fontSize:12, fontWeight:500, fontFamily:T.font, transition:'all 0.15s', background: fType===t ? T.accentBg : 'transparent', color: fType===t ? T.accent : T.ink3 }}>
                    {t==='all' ? 'Semua' : t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:10, overflow:'hidden' }}>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', minWidth:860 }}>
                  <thead>
                    <tr style={{ borderBottom:`1px solid ${T.border}` }}>
                      {['No','Nama','Tipe','Kategori','Status','Link','WhatsApp',''].map(h => (
                        <th key={h} style={{ padding:'11px 16px', textAlign:'left', fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:T.ink3, fontWeight:600, whiteSpace:'nowrap', fontFamily:T.font }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={8} style={{ padding:36, textAlign:'center', color:T.ink3, fontSize:13 }}>Memuat...</td></tr>
                    ) : filtered.length===0 ? (
                      <tr><td colSpan={8} style={{ padding:36, textAlign:'center', color:T.ink3, fontSize:13 }}>Belum ada tamu ditemukan</td></tr>
                    ) : filtered.map((g, i) => (
                      <tr key={g.id} style={{ borderBottom:`1px solid ${T.border}` }}>
                        <td style={{ padding:'12px 16px', fontSize:12, color:T.ink3 }}>{i+1}</td>
                        <td style={{ padding:'12px 16px' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                            <div style={{ width:30, height:30, borderRadius:8, background:T.accentBg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:T.accent, flexShrink:0 }}>{g.name[0]}</div>
                            <div>
                              <p style={{ fontSize:13, fontWeight:600, color:T.ink1, letterSpacing:'-0.02em' }}>{g.name}</p>
                              <p style={{ fontSize:10, color:T.ink3, marginTop:1 }}>{g.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding:'12px 16px' }}>
                          <span style={{ padding:'2px 8px', borderRadius:4, fontSize:10, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', background: g.type==='vip' ? '#FEF3C7' : T.accentBg, color: g.type==='vip' ? '#D97706' : T.accent }}>{g.type}</span>
                        </td>
                        <td style={{ padding:'12px 16px', fontSize:12, color:T.ink2 }}>{g.category||'—'}</td>
                        <td style={{ padding:'12px 16px' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                            <div style={{ width:6, height:6, borderRadius:'50%', background: g.opened ? '#059669' : T.border, flexShrink:0 }} />
                            <span style={{ fontSize:12, color: g.opened ? '#059669' : T.ink3 }}>{g.opened ? 'Dibuka' : 'Belum'}</span>
                          </div>
                          {g.openedAt && <p style={{ fontSize:10, color:T.ink3, marginTop:2 }}>{new Date(g.openedAt).toLocaleDateString('id-ID')}</p>}
                        </td>
                        <td style={{ padding:'12px 16px' }}>
                          <div style={{ display:'flex', gap:6 }}>
                            <button onClick={() => copy(invUrl(g.slug), g.id+'-link')} style={{ padding:'5px 10px', borderRadius:6, border:`1px solid ${T.border}`, background:T.bg, color: copied===g.id+'-link' ? '#059669' : T.ink2, fontSize:11, fontWeight:600, cursor:'pointer', fontFamily:T.font }}>
                              {copied===g.id+'-link' ? '✓ Copied' : '🔗 Link'}
                            </button>
                            <a href={invUrl(g.slug)} target="_blank" rel="noopener noreferrer" style={{ padding:'5px 10px', borderRadius:6, border:`1px solid ${T.border}`, background:T.bg, color:T.ink3, fontSize:11, fontWeight:500, textDecoration:'none' }}>Preview</a>
                          </div>
                        </td>
                        <td style={{ padding:'12px 16px' }}>
                          <div style={{ display:'flex', gap:6 }}>
                            <button onClick={() => copy(buildMsg(tmpl,g), g.id+'-msg')} style={{ padding:'5px 10px', borderRadius:6, border:'1px solid rgba(37,211,102,0.3)', background:'rgba(37,211,102,0.07)', color: copied===g.id+'-msg' ? '#059669' : '#1a9544', fontSize:11, fontWeight:600, cursor:'pointer', fontFamily:T.font }}>
                              {copied===g.id+'-msg' ? '✓ Copied' : '📋 Salin'}
                            </button>
                            <a href={waUrl(g,tmpl)} target="_blank" rel="noopener noreferrer" style={{ padding:'5px 10px', borderRadius:6, border:'1px solid rgba(37,211,102,0.3)', background:'rgba(37,211,102,0.07)', color:'#1a9544', fontSize:11, fontWeight:600, textDecoration:'none' }}>
                              WA
                            </a>
                          </div>
                        </td>
                        <td style={{ padding:'12px 16px' }}>
                          <button onClick={() => handleDelete(g.id)} style={{ padding:'5px 9px', borderRadius:6, border:'1px solid rgba(239,68,68,0.2)', background:'rgba(239,68,68,0.06)', color:'#DC2626', fontSize:11, fontWeight:600, cursor:'pointer', fontFamily:T.font }}>Hapus</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>)}

          {/* TAB: RSVP */}
          {tab==='rsvp' && (<>
            <div style={{ display:'flex', gap:10, marginBottom:12 }}>
              <div style={{ display:'flex', background:T.surface, border:`1px solid ${T.border}`, borderRadius:8, padding:3, gap:2 }}>
                {([{ v:'all', label:'Semua' }, { v:'hadir', label:'✅ Hadir' }, { v:'tidak', label:'❌ Tidak Hadir' }] as {v:'all'|'hadir'|'tidak';label:string}[]).map(t => (
                  <button key={t.v} onClick={() => setRsvpFilter(t.v)} style={{ padding:'5px 14px', borderRadius:6, border:'none', cursor:'pointer', fontSize:12, fontWeight:500, fontFamily:T.font, transition:'all 0.15s', background: rsvpFilter===t.v ? T.accentBg : 'transparent', color: rsvpFilter===t.v ? T.accent : T.ink3 }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:10, overflow:'hidden' }}>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', minWidth:560 }}>
                  <thead>
                    <tr style={{ borderBottom:`1px solid ${T.border}` }}>
                      {['No','Nama','Kehadiran','Keterangan','Waktu',''].map(h => (
                        <th key={h} style={{ padding:'11px 16px', textAlign:'left', fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:T.ink3, fontWeight:600, whiteSpace:'nowrap', fontFamily:T.font }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rsvpLoading ? (
                      <tr><td colSpan={6} style={{ padding:36, textAlign:'center', color:T.ink3, fontSize:13 }}>Memuat...</td></tr>
                    ) : filteredRsvp.length===0 ? (
                      <tr><td colSpan={6} style={{ padding:36, textAlign:'center', color:T.ink3, fontSize:13 }}>Belum ada konfirmasi</td></tr>
                    ) : filteredRsvp.map((r, i) => (
                      <tr key={r.id} style={{ borderBottom:`1px solid ${T.border}` }}>
                        <td style={{ padding:'12px 16px', fontSize:12, color:T.ink3 }}>{i+1}</td>
                        <td style={{ padding:'12px 16px' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                            <div style={{ width:30, height:30, borderRadius:8, background:T.accentBg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:T.accent, flexShrink:0 }}>{r.name[0]}</div>
                            <p style={{ fontSize:13, fontWeight:600, color:T.ink1 }}>{r.name}</p>
                          </div>
                        </td>
                        <td style={{ padding:'12px 16px' }}>
                          <span style={{ padding:'3px 10px', borderRadius:4, fontSize:11, fontWeight:700, letterSpacing:'0.04em', background: r.attendance==='hadir' ? '#D1FAE5' : '#FEE2E2', color: r.attendance==='hadir' ? '#059669' : '#DC2626' }}>
                            {r.attendance==='hadir' ? '✅ Hadir' : '❌ Tidak Hadir'}
                          </span>
                        </td>
                        <td style={{ padding:'12px 16px', fontSize:12, color:T.ink2, maxWidth:200 }}>
                          {r.notes ? (
                            <span style={{ background:T.bg, padding:'3px 8px', borderRadius:6, fontSize:11 }}>{r.notes}</span>
                          ) : (
                            <span style={{ color:T.ink3, fontSize:11 }}>—</span>
                          )}
                        </td>
                        <td style={{ padding:'12px 16px', fontSize:11, color:T.ink3, whiteSpace:'nowrap' }}>
                          {new Date(r.createdAt).toLocaleString('id-ID', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })}
                        </td>
                        <td style={{ padding:'12px 16px' }}>
                          <button onClick={() => handleDeleteRsvp(r.id)} style={{ padding:'5px 9px', borderRadius:6, border:'1px solid rgba(239,68,68,0.2)', background:'rgba(239,68,68,0.06)', color:'#DC2626', fontSize:11, fontWeight:600, cursor:'pointer', fontFamily:T.font }}>Hapus</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>)}

          {/* TAB: DOA */}
          {tab==='doa' && (
            <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:10, overflow:'hidden' }}>
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', minWidth:500 }}>
                  <thead>
                    <tr style={{ borderBottom:`1px solid ${T.border}` }}>
                      {['No','Nama','Ucapan & Doa','Waktu',''].map(h => (
                        <th key={h} style={{ padding:'11px 16px', textAlign:'left', fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:T.ink3, fontWeight:600, whiteSpace:'nowrap', fontFamily:T.font }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {doaLoading ? (
                      <tr><td colSpan={5} style={{ padding:36, textAlign:'center', color:T.ink3, fontSize:13 }}>Memuat...</td></tr>
                    ) : doas.length===0 ? (
                      <tr><td colSpan={5} style={{ padding:36, textAlign:'center', color:T.ink3, fontSize:13 }}>Belum ada ucapan masuk</td></tr>
                    ) : doas.map((d, i) => (
                      <tr key={d.id} style={{ borderBottom:`1px solid ${T.border}` }}>
                        <td style={{ padding:'12px 16px', fontSize:12, color:T.ink3 }}>{i+1}</td>
                        <td style={{ padding:'12px 16px' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                            <div style={{ width:30, height:30, borderRadius:8, background:'#FEF3C7', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>🤲</div>
                            <p style={{ fontSize:13, fontWeight:600, color:T.ink1 }}>{d.name}</p>
                          </div>
                        </td>
                        <td style={{ padding:'12px 16px', fontSize:12, color:T.ink2, maxWidth:360 }}>
                          <p style={{ whiteSpace:'pre-wrap', lineHeight:1.6 }}>{d.message}</p>
                        </td>
                        <td style={{ padding:'12px 16px', fontSize:11, color:T.ink3, whiteSpace:'nowrap' }}>
                          {new Date(d.createdAt).toLocaleString('id-ID', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })}
                        </td>
                        <td style={{ padding:'12px 16px' }}>
                          <button onClick={() => handleDeleteDoa(d.id)} style={{ padding:'5px 9px', borderRadius:6, border:'1px solid rgba(239,68,68,0.2)', background:'rgba(239,68,68,0.06)', color:'#DC2626', fontSize:11, fontWeight:600, cursor:'pointer', fontFamily:T.font }}>Hapus</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: IMPORT */}
          {tab==='import' && (
            <div style={{ maxWidth:660 }}>
              <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:10, padding:'22px', marginBottom:16 }}>
                <p style={{ fontSize:13, color:T.ink2, marginBottom:14, lineHeight:1.7 }}>
                  Upload file Excel dengan kolom: <Tag>Nama</Tag> <Tag>Tipe</Tag> <Tag>Kategori</Tag> <Tag>No HP</Tag>
                </p>
                <div onClick={() => fileRef.current?.click()} style={{ border:`2px dashed ${T.border}`, borderRadius:10, padding:'40px 20px', textAlign:'center', cursor:'pointer' }} onMouseEnter={e => (e.currentTarget.style.borderColor='#4F46E5')} onMouseLeave={e => (e.currentTarget.style.borderColor='#EBEBEC')}>
                  <p style={{ fontSize:28, marginBottom:8 }}>📂</p>
                  <p style={{ fontSize:13, fontWeight:600, color:T.ink1, marginBottom:3 }}>Klik untuk upload file Excel</p>
                  <p style={{ fontSize:12, color:T.ink3 }}>Format: .xlsx atau .xls</p>
                  <input ref={fileRef} type="file" accept=".xlsx,.xls" style={{ display:'none' }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
                </div>
              </div>
              {preview.length > 0 && (
                <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:10, overflow:'hidden' }}>
                  <div style={{ padding:'14px 20px', borderBottom:`1px solid ${T.border}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <span style={{ fontSize:13, fontWeight:600, color:T.ink1 }}>Preview — {preview.length} tamu</span>
                    <button onClick={handleImport} disabled={importing} style={{ padding:'8px 18px', borderRadius:8, border:'none', background:T.accent, color:'#fff', fontSize:13, fontWeight:600, cursor:importing?'not-allowed':'pointer', opacity:importing?0.6:1, fontFamily:T.font }}>
                      {importing ? 'Mengimpor...' : `Import ${preview.length} Tamu`}
                    </button>
                  </div>
                  <table style={{ width:'100%', borderCollapse:'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom:`1px solid ${T.border}` }}>
                        {['Nama','Tipe','Kategori','No HP'].map(h => (<th key={h} style={{ padding:'10px 16px', textAlign:'left', fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:T.ink3, fontWeight:600 }}>{h}</th>))}
                      </tr>
                    </thead>
                    <tbody>
                      {preview.slice(0,25).map((g,i) => (
                        <tr key={i} style={{ borderBottom:`1px solid ${T.border}` }}>
                          <td style={{ padding:'10px 16px', fontSize:13, fontWeight:500, color:T.ink1 }}>{g.name}</td>
                          <td style={{ padding:'10px 16px' }}><span style={{ fontSize:10, fontWeight:700, padding:'2px 7px', borderRadius:4, background: g.type==='vip'?'#FEF3C7':'#EEEDF9', color: g.type==='vip'?'#D97706':'#4F46E5' }}>{g.type.toUpperCase()}</span></td>
                          <td style={{ padding:'10px 16px', fontSize:12, color:T.ink2 }}>{g.category||'—'}</td>
                          <td style={{ padding:'10px 16px', fontSize:12, color:T.ink2 }}>{g.phone||'—'}</td>
                        </tr>
                      ))}
                      {preview.length>25 && <tr><td colSpan={4} style={{ padding:'10px 16px', fontSize:12, color:T.ink3, textAlign:'center' }}>...dan {preview.length-25} tamu lainnya</td></tr>}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB: TEMPLATE */}
          {tab==='template' && (
            <div style={{ maxWidth:660 }}>
              <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:10, padding:'22px' }}>
                <p style={{ fontSize:13, color:T.ink2, marginBottom:14, lineHeight:1.7 }}>
                  Variabel: <Tag>{'{nama}'}</Tag> <Tag>{'{link}'}</Tag> <Tag>{'{groom}'}</Tag> <Tag>{'{bride}'}</Tag>
                </p>
                <textarea value={tmpl} onChange={e => setTmpl(e.target.value)} rows={14} style={{ ...inp, resize:'vertical', lineHeight:1.8, fontFamily:'monospace', fontSize:12 }} />
                <div style={{ display:'flex', gap:10, marginTop:12, alignItems:'center' }}>
                  <button onClick={() => setTmpl(DEFAULT_TEMPLATE)} style={{ padding:'8px 14px', borderRadius:8, border:`1px solid ${T.border}`, background:'transparent', color:T.ink2, fontSize:12, fontWeight:500, cursor:'pointer', fontFamily:T.font }}>Reset Default</button>
                  <span style={{ fontSize:12, color:T.ink3 }}>✓ Tersimpan dalam sesi ini</span>
                </div>
                <div style={{ marginTop:22, paddingTop:20, borderTop:`1px solid ${T.border}` }}>
                  <p style={{ fontSize:10, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:T.ink3, marginBottom:10 }}>Preview (Budi Santoso)</p>
                  <div style={{ background:'#0d1f10', borderRadius:10, padding:'16px 18px', fontSize:12, color:'#e0e0e0', whiteSpace:'pre-wrap', lineHeight:1.8, fontFamily:'sans-serif', border:'1px solid rgba(37,211,102,0.12)' }}>
                    {tmpl.replace(/\{nama\}/gi,'Budi Santoso').replace(/\{link\}/gi,`${BASE_URL}/invitation/budi-santoso-ab1`).replace(/\{groom\}/gi,GROOM).replace(/\{bride\}/gi,BRIDE)}
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}