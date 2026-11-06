import { ArrowUpRight, Lock, ShieldCheck, Sparkles, Wallet } from 'lucide-react'
import type { ProjectVariant } from '@/data/projects'

type ProjectVisualProps = {
  variant: ProjectVariant
  accent: string
  className?: string
}

function BankingArt() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#071018] p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-cyan-200/60">
          Onboarding / KYC
        </span>
        <span className="flex items-center gap-1 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-2 py-0.5 font-mono text-[6px] uppercase tracking-[0.14em] text-cyan-200/80">
          <Lock size={6} /> Encrypted
        </span>
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex flex-1 items-center gap-1.5">
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full border font-mono text-[6px] ${
                step < 3
                  ? 'border-cyan-300/50 bg-cyan-400/20 text-cyan-100'
                  : 'border-white/15 text-white/40'
              }`}
            >
              {step}
            </span>
            {step < 4 && (
              <span className={`h-px flex-1 ${step < 3 ? 'bg-cyan-300/40' : 'bg-white/10'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 flex-1 rounded-[3px] border border-white/10 bg-white/[0.02] p-3">
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={9} className="text-cyan-300/80" />
          <span className="font-mono text-[6px] uppercase tracking-[0.16em] text-white/50">
            Identity verification
          </span>
        </div>
        <div className="mt-2.5 space-y-2">
          <div className="h-1.5 w-4/5 rounded-full bg-white/10" />
          <div className="h-1.5 w-3/5 rounded-full bg-white/[0.07]" />
          <div className="mt-2 flex gap-1.5">
            <div className="h-5 flex-1 rounded-[2px] border border-cyan-300/25 bg-cyan-400/10" />
            <div className="h-5 flex-1 rounded-[2px] border border-white/10 bg-white/[0.03]" />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1">
          <span className="h-1 w-1 rounded-full bg-emerald-400" />
          <span className="font-mono text-[6px] uppercase tracking-[0.14em] text-emerald-300/70">
            DigiLocker verified
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="font-mono text-[6px] uppercase tracking-[0.16em] text-white/35">
          SBI · Axis
        </span>
        <span className="flex items-center gap-1 rounded-full bg-cyan-400/90 px-2.5 py-1 font-mono text-[6px] uppercase tracking-[0.14em] text-[#071018]">
          Continue <ArrowUpRight size={6} />
        </span>
      </div>
    </div>
  )
}

function AgentArt() {
  return (
    <div className="absolute inset-0 bg-[#0d0a18]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(124,107,255,0.28),transparent_62%)]" />
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/25" />
      <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/20" />
      <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-violet-200/40 bg-violet-400/20 backdrop-blur">
        <Sparkles size={13} className="text-violet-100" />
      </div>

      {[
        { label: 'Agent', x: '14%', y: '22%' },
        { label: 'Tools', x: '68%', y: '18%' },
        { label: 'Memory', x: '72%', y: '66%' },
        { label: 'Workflow', x: '12%', y: '68%' },
      ].map((node) => (
        <div
          key={node.label}
          className="absolute flex items-center gap-1 rounded-full border border-white/12 bg-white/[0.05] px-2 py-1 backdrop-blur"
          style={{ left: node.x, top: node.y }}
        >
          <span className="h-1 w-1 rounded-full bg-violet-300 blink-dot" />
          <span className="font-mono text-[6px] uppercase tracking-[0.14em] text-violet-100/80">
            {node.label}
          </span>
        </div>
      ))}

      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <line x1="24%" y1="28%" x2="47%" y2="45%" stroke="rgba(169,155,255,0.3)" strokeWidth="0.6" className="dash-flow" />
        <line x1="76%" y1="25%" x2="55%" y2="45%" stroke="rgba(169,155,255,0.3)" strokeWidth="0.6" className="dash-flow" />
        <line x1="76%" y1="70%" x2="55%" y2="56%" stroke="rgba(169,155,255,0.3)" strokeWidth="0.6" className="dash-flow" />
        <line x1="22%" y1="72%" x2="45%" y2="56%" stroke="rgba(169,155,255,0.3)" strokeWidth="0.6" className="dash-flow" />
      </svg>

      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
        <span className="font-mono text-[6px] uppercase tracking-[0.18em] text-violet-200/50">
          Web Components
        </span>
        <span className="font-mono text-[6px] uppercase tracking-[0.18em] text-violet-200/50">
          Micro-frontend
        </span>
      </div>
    </div>
  )
}

function MicroArt() {
  return (
    <div className="absolute inset-0 bg-[#0a0a14] p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-violet-200/60">
          Feature domains
        </span>
        <span className="font-mono text-[6px] uppercase tracking-[0.16em] text-white/30">
          Independent deploy
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className={`flex h-9 items-center justify-center rounded-[2px] border font-mono text-[6px] uppercase tracking-[0.1em] ${
              index === 4
                ? 'border-violet-300/50 bg-violet-500/20 text-violet-100'
                : 'border-white/10 bg-white/[0.025] text-white/30'
            }`}
          >
            {index === 4 ? 'Host' : `M${index + 1}`}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-[2px] border border-white/[0.08] bg-white/[0.02] px-2.5 py-1.5">
        <span className="flex items-center gap-1 font-mono text-[6px] uppercase tracking-[0.14em] text-white/40">
          <span className="h-1 w-1 rounded-full bg-emerald-400" /> Build passing
        </span>
        <span className="font-mono text-[6px] uppercase tracking-[0.14em] text-violet-200/60">
          5+ domains
        </span>
      </div>
    </div>
  )
}

function CommerceArt() {
  return (
    <div className="absolute inset-0 bg-[#160d09] p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-orange-200/60">
          Gift cards
        </span>
        <span className="flex items-center gap-1 font-mono text-[6px] uppercase tracking-[0.14em] text-orange-200/50">
          <Wallet size={6} /> PayU
        </span>
      </div>

      <div className="mt-3 flex gap-2">
        <div className="relative h-[4.6rem] flex-1 overflow-hidden rounded-[3px] border border-orange-200/25 bg-gradient-to-br from-orange-400/30 via-orange-500/10 to-transparent p-2">
          <span className="font-mono text-[6px] uppercase tracking-[0.16em] text-orange-100/70">
            Gift card
          </span>
          <span className="mt-3 block font-mono text-[11px] tracking-[0.18em] text-orange-50/90">
            •••• 4821
          </span>
          <span className="absolute bottom-2 left-2 font-mono text-[6px] text-orange-100/40">
            ₹ 2,000
          </span>
        </div>
        <div className="h-[4.6rem] flex-1 rounded-[3px] border border-white/10 bg-white/[0.03] p-2">
          <span className="font-mono text-[6px] uppercase tracking-[0.16em] text-white/35">
            Order
          </span>
          <div className="mt-2 space-y-1.5">
            <div className="h-1 w-3/4 rounded-full bg-white/10" />
            <div className="h-1 w-1/2 rounded-full bg-white/[0.07]" />
          </div>
          <span className="mt-3 block font-mono text-[6px] text-emerald-300/70">Paid</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-[2px] border border-white/[0.08] bg-white/[0.02] px-2.5 py-1.5">
        <span className="font-mono text-[6px] uppercase tracking-[0.14em] text-white/35">
          Token lifecycle
        </span>
        <span className="rounded-full bg-orange-400/90 px-2 py-0.5 font-mono text-[6px] uppercase tracking-[0.12em] text-[#160d09]">
          Secure pay
        </span>
      </div>
    </div>
  )
}

export function ProjectVisual({ variant, accent, className = '' }: ProjectVisualProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[3px] border border-white/[0.08] ${className}`}
      style={{ boxShadow: `0 30px 80px -40px ${accent}55` }}
      aria-hidden="true"
    >
      {variant === 'banking' && <BankingArt />}
      {variant === 'agent' && <AgentArt />}
      {variant === 'micro' && <MicroArt />}
      {variant === 'commerce' && <CommerceArt />}
    </div>
  )
}
