'use client'

import { useEffect, useRef, useState } from 'react'
import { AdminLayout, Toast, Modal, Field, input, btnPrimary, btnSecondary } from '../components/AdminLayout'

type MenuItem = { name: string; description: string; price: string; image: string }
type TeamMember = { id: number; name: string; title: string; description: string; image: string }
type MenuItems = { alacarte: MenuItem[]; grillCuts: MenuItem[]; teamMembers: TeamMember[] }

const EMPTY_ITEM: MenuItem = { name: '', description: '', price: '', image: '' }
const EMPTY_TEAM: TeamMember = { id: Date.now(), name: '', title: '', description: '', image: '' }

type ActiveTab = 'alacarte' | 'grillCuts' | 'team'

export default function AdminMenu() {
  const [data, setData] = useState<MenuItems | null>(null)
  const [tab, setTab] = useState<ActiveTab>('alacarte')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [uploading, setUploading] = useState(false)

  // Item modal (alacarte / grillCuts)
  const [modal, setModal] = useState<{ open: boolean; idx: number | null; val: MenuItem }>({ open: false, idx: null, val: EMPTY_ITEM })
  // Team modal
  const [teamModal, setTeamModal] = useState<{ open: boolean; idx: number | null; val: TeamMember }>({ open: false, idx: null, val: EMPTY_TEAM })

  const modalFileRef = useRef<HTMLInputElement>(null)
  const teamFileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/admin/menu-items').then(r => r.json()).then(d => {
      setData({ alacarte: d.alacarte ?? [], grillCuts: d.grillCuts ?? [], teamMembers: d.teamMembers ?? [] })
    })
  }, [])

  async function save(updated: MenuItems) {
    setSaving(true)
    try {
      await fetch('/api/admin/menu-items', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) })
      setData(updated)
      setToast('Saved!')
    } finally {
      setSaving(false)
    }
  }

  async function upload(file: File): Promise<string | null> {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'menu')
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      return (await res.json()).url
    } catch { alert('Upload failed'); return null }
    finally { setUploading(false) }
  }

  // ── Menu item actions ──────────────────────────────────
  function openAdd() { setModal({ open: true, idx: -1, val: { ...EMPTY_ITEM } }) }
  function openEdit(idx: number) {
    if (!data || tab === 'team') return
    setModal({ open: true, idx, val: { ...data[tab][idx] } })
  }
  function saveModal() {
    if (!data || !modal.val.name || tab === 'team') return
    const list = [...data[tab]]
    if (modal.idx === -1) list.push(modal.val)
    else if (modal.idx !== null) list[modal.idx] = modal.val
    save({ ...data, [tab]: list })
    setModal({ open: false, idx: null, val: EMPTY_ITEM })
  }
  function deleteItem(idx: number) {
    if (!data || !confirm('Delete this item?') || tab === 'team') return
    save({ ...data, [tab]: (data[tab] as MenuItem[]).filter((_, i) => i !== idx) })
  }
  function moveItem(idx: number, dir: -1 | 1) {
    if (!data || tab === 'team') return
    const list = [...data[tab]] as MenuItem[]
    const j = idx + dir
    if (j < 0 || j >= list.length) return;
    [list[idx], list[j]] = [list[j], list[idx]]
    save({ ...data, [tab]: list })
  }

  // ── Team member actions ────────────────────────────────
  function openAddTeam() { setTeamModal({ open: true, idx: -1, val: { ...EMPTY_TEAM, id: Date.now() } }) }
  function openEditTeam(idx: number) {
    if (!data) return
    setTeamModal({ open: true, idx, val: { ...data.teamMembers[idx] } })
  }
  function saveTeamModal() {
    if (!data || !teamModal.val.name) return
    const list = [...data.teamMembers]
    if (teamModal.idx === -1) list.push(teamModal.val)
    else if (teamModal.idx !== null) list[teamModal.idx] = teamModal.val
    save({ ...data, teamMembers: list })
    setTeamModal({ open: false, idx: null, val: EMPTY_TEAM })
  }
  function deleteTeam(idx: number) {
    if (!data || !confirm('Delete this team member?')) return
    save({ ...data, teamMembers: data.teamMembers.filter((_, i) => i !== idx) })
  }

  if (!data) return (
    <AdminLayout title="Menu Items">
      <div className="flex items-center justify-center h-64 text-[#C7B8A8]"><i className="fa-solid fa-spinner fa-spin mr-2" /> Loading…</div>
    </AdminLayout>
  )

  const isTeam = tab === 'team'
  const menuTab = tab as 'alacarte' | 'grillCuts'
  const items = isTeam ? [] : (data[menuTab] as MenuItem[])
  const tabLabel = tab === 'alacarte' ? 'À La Carte' : tab === 'grillCuts' ? 'Grill Cuts' : 'Team'

  return (
    <AdminLayout
      title="Menu Items"
      subtitle={`${data.alacarte.length} à la carte · ${data.grillCuts.length} grill cuts · ${data.teamMembers.length} team`}
      action={
        <button onClick={isTeam ? openAddTeam : openAdd} className={btnPrimary}>
          <i className="fa-solid fa-plus" /> Add {tabLabel}
        </button>
      }
    >
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}

      {/* Tabs */}
      <div className="border-b border-[#D4A373]/12 bg-[#0a0805]">
        <div className="flex px-4 sm:px-6">
          {(['alacarte', 'grillCuts', 'team'] as const).map(t => {
            const count = t === 'alacarte' ? data.alacarte.length : t === 'grillCuts' ? data.grillCuts.length : data.teamMembers.length
            const label = t === 'alacarte' ? 'À La Carte' : t === 'grillCuts' ? 'Grill Cuts' : 'Team'
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative px-5 py-3.5 text-sm font-black uppercase tracking-wider transition-colors ${
                  tab === t
                    ? 'text-[#fd850b] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-[#fd850b]'
                    : 'text-[#C7B8A8] hover:text-[#FFF7ED]'
                }`}
              >
                {label}
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-black ${tab === t ? 'bg-[#fd850b]/20 text-[#fd850b]' : 'bg-[#D4A373]/10 text-[#C7B8A8]'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">

        {/* ── Team tab ── */}
        {isTeam && (
          <>
            {data.teamMembers.length === 0 && (
              <div className="border-2 border-dashed border-[#D4A373]/20 rounded-2xl py-16 text-center text-[#C7B8A8]">
                <i className="fa-solid fa-user text-3xl mb-3 block text-[#C7B8A8]/30" />
                <p>No team members yet.</p>
                <button onClick={openAddTeam} className={`${btnPrimary} mx-auto mt-4`}><i className="fa-solid fa-plus" /> Add First Member</button>
              </div>
            )}
            <div className="space-y-4">
              {data.teamMembers.map((member, idx) => (
                <div key={member.id} className="bg-[#130c08] border border-[#D4A373]/12 rounded-xl overflow-hidden hover:border-[#fd850b]/25 transition-colors flex items-center gap-4 p-4">
                  {/* Square photo */}
                  <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-[#0d0905]">
                    {member.image
                      ? <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover object-top" />
                      : <div className="flex h-full items-center justify-center text-[#C7B8A8]/20"><i className="fa-solid fa-user text-2xl" /></div>
                    }
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm text-[#FFF7ED]">{member.name}</p>
                    <p className="text-xs font-black text-[#fd850b] uppercase tracking-wider mt-0.5">{member.title}</p>
                    <p className="text-xs text-[#C7B8A8] mt-1 line-clamp-1">{member.description}</p>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => openEditTeam(idx)} className="w-9 h-9 rounded-lg bg-[#D4A373]/10 hover:bg-[#fd850b]/20 text-[#C7B8A8] hover:text-[#fd850b] transition-colors flex items-center justify-center">
                      <i className="fa-solid fa-pencil text-xs" />
                    </button>
                    <button onClick={() => deleteTeam(idx)} className="w-9 h-9 rounded-lg bg-red-900/10 hover:bg-red-900/30 text-red-400 transition-colors flex items-center justify-center">
                      <i className="fa-solid fa-trash text-xs" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Menu items tab (alacarte / grillCuts) ── */}
        {!isTeam && (
          <>
            {items.length === 0 && (
              <div className="border-2 border-dashed border-[#D4A373]/20 rounded-2xl py-16 text-center text-[#C7B8A8]">
                <i className="fa-solid fa-utensils text-3xl mb-3 block text-[#C7B8A8]/30" />
                <p>No {tabLabel} items yet.</p>
                <button onClick={openAdd} className={`${btnPrimary} mx-auto mt-4`}><i className="fa-solid fa-plus" /> Add First Item</button>
              </div>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item, idx) => (
                <div key={idx} className="bg-[#130c08] border border-[#D4A373]/12 rounded-xl overflow-hidden hover:border-[#fd850b]/25 transition-colors group">
                  <div className="relative h-36 bg-[#0d0905]">
                    {item.image
                      ? <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                      : <div className="flex h-full items-center justify-center text-[#C7B8A8]/20"><i className="fa-solid fa-image text-3xl" /></div>
                    }
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => moveItem(idx, -1)} disabled={idx === 0} className="w-7 h-7 bg-black/70 text-white rounded-lg text-xs flex items-center justify-center disabled:opacity-30 hover:bg-black" title="Move up">
                        <i className="fa-solid fa-arrow-up" />
                      </button>
                      <button onClick={() => moveItem(idx, 1)} disabled={idx === items.length - 1} className="w-7 h-7 bg-black/70 text-white rounded-lg text-xs flex items-center justify-center disabled:opacity-30 hover:bg-black" title="Move down">
                        <i className="fa-solid fa-arrow-down" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-black text-sm text-[#FFF7ED] line-clamp-1">{item.name}</p>
                    <p className="text-xs text-[#C7B8A8] mt-1 line-clamp-2 leading-5">{item.description}</p>
                    <p className="text-xs font-black text-[#fd850b] mt-2">{item.price}</p>
                  </div>
                  <div className="flex border-t border-[#D4A373]/10">
                    <button onClick={() => openEdit(idx)} className="flex-1 py-2.5 text-xs font-bold text-[#C7B8A8] hover:bg-[#fd850b]/10 hover:text-[#fd850b] transition-colors flex items-center justify-center gap-1.5">
                      <i className="fa-solid fa-pencil text-[0.65rem]" /> Edit
                    </button>
                    <div className="w-px bg-[#D4A373]/10" />
                    <button onClick={() => deleteItem(idx)} className="flex-1 py-2.5 text-xs font-bold text-red-400 hover:bg-red-900/20 transition-colors flex items-center justify-center gap-1.5">
                      <i className="fa-solid fa-trash text-[0.65rem]" /> Delete
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={openAdd}
                className="h-48 border-2 border-dashed border-[#D4A373]/20 rounded-xl flex flex-col items-center justify-center gap-2 text-[#C7B8A8] hover:border-[#fd850b] hover:text-[#fd850b] transition-colors"
              >
                <i className="fa-solid fa-plus text-2xl" />
                <span className="text-xs font-black uppercase tracking-wider">Add {tabLabel} Item</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── Add/Edit Menu Item Modal ── */}
      {modal.open && (
        <Modal title={modal.idx === -1 ? `Add ${tabLabel} Item` : `Edit ${tabLabel} Item`} onClose={() => setModal({ open: false, idx: null, val: EMPTY_ITEM })}>
          <div className="space-y-4">
            <Field label="Image">
              {modal.val.image && (
                <img src={modal.val.image} alt="preview" className="h-32 w-full object-cover rounded-xl border border-[#D4A373]/15 mb-2" />
              )}
              <input
                className={input}
                value={modal.val.image}
                onChange={e => setModal(m => ({ ...m, val: { ...m.val, image: e.target.value } }))}
                placeholder="Paste image URL…"
              />
              <button onClick={() => modalFileRef.current?.click()} disabled={uploading} className={`${btnSecondary} mt-2 w-full justify-center`}>
                {uploading ? <><i className="fa-solid fa-spinner fa-spin" /> Uploading…</> : <><i className="fa-solid fa-upload" /> Upload from computer</>}
              </button>
              <input ref={modalFileRef} type="file" accept="image/*" className="hidden"
                onChange={async e => { const f = e.target.files?.[0]; if (!f) return; const url = await upload(f); if (url) setModal(m => ({ ...m, val: { ...m.val, image: url } })); e.target.value = '' }} />
            </Field>
            <Field label="Name">
              <input className={input} value={modal.val.name} onChange={e => setModal(m => ({ ...m, val: { ...m.val, name: e.target.value } }))} placeholder="Item name…" />
            </Field>
            <Field label="Description">
              <textarea className={`${input} resize-none`} rows={2} value={modal.val.description} onChange={e => setModal(m => ({ ...m, val: { ...m.val, description: e.target.value } }))} placeholder="Short description…" />
            </Field>
            <Field label="Price">
              <input className={input} value={modal.val.price} onChange={e => setModal(m => ({ ...m, val: { ...m.val, price: e.target.value } }))} placeholder={menuTab === 'alacarte' ? 'e.g. $10.95' : 'Buffet Included'} />
            </Field>
            <div className="flex gap-3 pt-1">
              <button onClick={saveModal} className={`${btnPrimary} flex-1 justify-center`}>
                <i className="fa-solid fa-check" /> {modal.idx === -1 ? 'Add Item' : 'Save Changes'}
              </button>
              <button onClick={() => setModal({ open: false, idx: null, val: EMPTY_ITEM })} className={btnSecondary}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Add/Edit Team Member Modal ── */}
      {teamModal.open && (
        <Modal title={teamModal.idx === -1 ? 'Add Team Member' : 'Edit Team Member'} onClose={() => setTeamModal({ open: false, idx: null, val: EMPTY_TEAM })}>
          <div className="space-y-4">
            <Field label="Photo">
              {teamModal.val.image && (
                <div className="relative w-28 h-28 mx-auto mb-3 rounded-xl overflow-hidden border border-[#D4A373]/15">
                  <img src={teamModal.val.image} alt="preview" className="absolute inset-0 w-full h-full object-cover object-top" />
                </div>
              )}
              <input
                className={input}
                value={teamModal.val.image}
                onChange={e => setTeamModal(m => ({ ...m, val: { ...m.val, image: e.target.value } }))}
                placeholder="Paste image URL…"
              />
              <button onClick={() => teamFileRef.current?.click()} disabled={uploading} className={`${btnSecondary} mt-2 w-full justify-center`}>
                {uploading ? <><i className="fa-solid fa-spinner fa-spin" /> Uploading…</> : <><i className="fa-solid fa-upload" /> Upload from computer</>}
              </button>
              <input ref={teamFileRef} type="file" accept="image/*" className="hidden"
                onChange={async e => { const f = e.target.files?.[0]; if (!f) return; const url = await upload(f); if (url) setTeamModal(m => ({ ...m, val: { ...m.val, image: url } })); e.target.value = '' }} />
            </Field>
            <Field label="Name">
              <input className={input} value={teamModal.val.name} onChange={e => setTeamModal(m => ({ ...m, val: { ...m.val, name: e.target.value } }))} placeholder="e.g. Chef Carlos" />
            </Field>
            <Field label="Title / Role">
              <input className={input} value={teamModal.val.title} onChange={e => setTeamModal(m => ({ ...m, val: { ...m.val, title: e.target.value } }))} placeholder="e.g. Head Chef" />
            </Field>
            <Field label="Bio">
              <textarea className={`${input} resize-none`} rows={3} value={teamModal.val.description} onChange={e => setTeamModal(m => ({ ...m, val: { ...m.val, description: e.target.value } }))} placeholder="Short bio…" />
            </Field>
            <div className="flex gap-3 pt-1">
              <button onClick={saveTeamModal} className={`${btnPrimary} flex-1 justify-center`}>
                <i className="fa-solid fa-check" /> {teamModal.idx === -1 ? 'Add Member' : 'Save Changes'}
              </button>
              <button onClick={() => setTeamModal({ open: false, idx: null, val: EMPTY_TEAM })} className={btnSecondary}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  )
}
