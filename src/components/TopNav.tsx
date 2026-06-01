'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LoaderCircle, Wallet, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useArkivStore } from '@/store/useArkivStore'
import { ARKIV_CHAIN, ARKIV_DOCS_URL, ARKIV_FAUCET_URL } from '@/lib/arkiv/chain'

const shortAddress = (address?: string) =>
  address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'

export function TopNav() {
  const connectWallet = useArkivStore((state) => state.connectWallet)
  const disconnectWallet = useArkivStore((state) => state.disconnectWallet)
  const retryNetworkSwitch = useArkivStore((state) => state.retryNetworkSwitch)
  const connecting = useArkivStore((state) => state.connecting)
  const account = useArkivStore((state) => state.account)
  const chainId = useArkivStore((state) => state.chainId)
  const walletAvailable = useArkivStore((state) => state.walletAvailable)
  const balance = useArkivStore((state) => state.balance)
  const [copied, setCopied] = useState(false)
  const [hovered, setHovered] = useState(false)

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const onArkivNetwork = chainId === ARKIV_CHAIN.id

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav className="flex items-center justify-between border-b border-white/10 bg-[#0a0a0a]/70 backdrop-blur-2xl px-8 py-4 shadow-lg shadow-black/40">
        {/* Logo */}
        <Link href="/" className="font-mono text-xl font-bold tracking-widest text-[#ffffff] hover:opacity-70 transition-opacity">
          [ ARKIV BUILD ]
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 mr-4 font-mono text-xs font-semibold tracking-wide text-gray-300">
            <Link
              href={ARKIV_FAUCET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center h-8 bg-blue-500 text-white px-4 shadow-md shadow-blue-500/20 hover:bg-blue-400 hover:scale-105 hover:shadow-blue-500/40 active:scale-95 transition-all duration-300"
            >
              Faucet
            </Link>
            <Link href={ARKIV_DOCS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:-translate-y-0.5 transition-all duration-300">
              Docs
            </Link>
          </div>

          {walletAvailable && account && (
            <div className="flex items-center">
              <span
                className={[
                  'shrink-0 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider',
                  onArkivNetwork
                    ? 'bg-[#0e2a18] text-[#4ade80]'
                    : 'bg-[#2e1413] text-[#f87171]',
                ].join(' ')}
              >
                {onArkivNetwork ? 'Braga' : 'Wrong network'}
              </span>

              {!onArkivNetwork && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={retryNetworkSwitch}
                  className="ml-2 h-8 px-3 text-xs shadow-sm bg-[#141414]"
                >
                  Switch
                </Button>
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            {/* Balance pill */}
            {account && (
              <div className="flex items-center h-10 px-4 border border-white/10 bg-[#141414] shadow-sm font-mono text-sm font-semibold text-gray-300">
                {balance ? `${Number(balance).toFixed(4)} GLM` : 'Loading...'}
              </div>
            )}

            {/* Wallet pill */}
            {account ? (
              <div className="flex items-center h-10 border border-white/10 bg-[#1c1c1c] shadow-lg shadow-black/30 font-mono font-semibold text-white text-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/40">
                {/* Left zone: address → hover shows Disconnect wallet, click disconnects */}
                <button
                  id="wallet-menu-btn"
                  onClick={disconnectWallet}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  className={[
                    'flex items-center gap-2 h-full pl-4 pr-3 transition-colors duration-200',
                    hovered ? 'bg-red-600/90 active:bg-red-700' : 'hover:bg-black/40 active:bg-black/60',
                  ].join(' ')}
                >
                  <Wallet className="size-4 shrink-0" />
                  {/* Fixed-width container so the pill never resizes */}
                  <span className="relative inline-block w-[9rem]">
                    <span className={`absolute inset-0 flex items-center transition-opacity duration-200 whitespace-nowrap ${hovered ? 'opacity-0' : 'opacity-100'}`}>
                      {shortAddress(account)}
                    </span>
                    <span className={`absolute inset-0 flex items-center transition-opacity duration-200 whitespace-nowrap ${hovered ? 'opacity-100' : 'opacity-0'}`}>
                      Disconnect wallet
                    </span>
                  </span>
                </button>

                {/* Faint vertical divider, inset from top & bottom */}
                <div className="self-stretch flex items-center">
                  <div className="w-px h-5 bg-white/20 " />
                </div>

                {/* Right zone: copy — completely isolated, never triggers address hover */}
                <button
                  id="copy-address-btn"
                  onClick={copyAddress}
                  className="flex items-center justify-center h-full px-3 hover:bg-black/40 active:bg-black/60 transition-colors duration-200"
                  title="Copy address"
                >
                  {copied
                    ? <Check className="size-3.5 text-green-400" />
                    : <Copy className="size-3.5 text-white/70" />}
                </button>
              </div>
            ) : (
              <Button
                onClick={connectWallet}
                className="h-10 bg-blue-600 hover:bg-blue-500 font-semibold text-white px-5 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
                disabled={connecting}
              >
                {connecting ? (
                  <LoaderCircle className="size-4 animate-spin mr-2" />
                ) : (
                  <Wallet className="size-4 mr-2" />
                )}
                Connect MetaMask
              </Button>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}
