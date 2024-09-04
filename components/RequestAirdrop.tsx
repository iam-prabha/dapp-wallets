"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'sonner';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';


const RequestAirdrop = () => {
    // Usewallet hook is used access the wallet public key
    const wallet = useWallet();
    const { connection } = useConnection(); // to provide connection With RPC to airdrop
    const [amount,setAmount] = useState<string>("")
     const handleAmountChange =(e :React.ChangeEvent<HTMLInputElement>)=>{
        setAmount(e.target.value);
     }
    const handleRequestAirdrop = async () =>{
        try {
          if (!wallet.publicKey){
            toast.error("Wallet is not Found!");
          return;
        }
        await connection.requestAirdrop(wallet.publicKey,Number(amount) * LAMPORTS_PER_SOL);

        setTimeout(()=>{
          if(wallet.publicKey){
            toast.success(`Requested ${amount} Sol to ${wallet.publicKey.toBase58()}`)
          }
          setAmount("");
        },2000);
        setAmount('')
        } catch (error) {
          toast.error(`${error}`)
        }
    }
  return (
    <div className="flex justify-center">
      <Card className='w-[350px]'>
        <CardHeader>
            <CardTitle>Request Airdrop</CardTitle>
        </CardHeader>
        <CardContent>
            <form>
                <div className='grid w-full items-center gap-4'>
                    <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='amount'>Enter the amount</Label>
                    <Input id='amount' placeholder='Type the amount'
                    onChange={handleAmountChange}
                    value={amount}/>
                    </div>
                </div>
            </form>
        </CardContent>
        <CardFooter className='flex justify-center'>
            <Button onClick={handleRequestAirdrop}>Request Airdrop</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default RequestAirdrop
