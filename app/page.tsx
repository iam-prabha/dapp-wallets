"use client"
import dynamic from 'next/dynamic';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import '@solana/wallet-adapter-react-ui/styles.css';
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';
import { ModeToggle } from '@/components/ModeToggle';
import ShowSolBalance from '@/components/ShowSolBalance';
const RequestAirdrop = dynamic(() => import('@/components/RequestAirdrop'),{ssr:false});
const SignMessages = dynamic(() => import('@/components/SignMessages'));
const SendToken = dynamic(()=>import('@/components/SendToken'));
const dapp = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  return (
    <main className='max-w-7xl mx-auto'>
      <div className='flex items-center justify-center gap-4'>
        <div>
          <h1 className='text-lg font-bold md:text-2xl text-center pt-2'>Dapp-Wallet</h1>
          <p className='font-mono text-center pt-4'>your are wallet safe, secure, instant transaction
          </p>
        </div>
        <div className='justify-end'>
          <ModeToggle />
        </div>
      </div>
      <br />
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className='flex justify-center gap-4'>
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
            <br />
            <ShowSolBalance />
            <br />
            <RequestAirdrop />
            <br />
            <div>
              <SignMessages />
            </div>
            <br />
            <SendToken />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </main>
  )
}

export default dapp;