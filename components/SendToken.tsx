import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { toast } from 'sonner';

const SendToken = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [to, setTo] = useState<string>("");
    const [amount, setAmount] = useState<string>('');
    const sendTokens = async () => {
        try {
            if (!wallet.publicKey) throw new Error('Wallet not found');
            const transaction = new Transaction().add(SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(to),
                lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
            }));
            await wallet.sendTransaction(transaction, connection);
            toast.success(`Sent ${amount} SOL to ${to}`);
        } catch (error) {
            toast.error(`${error}`)
        }


    }
    return (
        <div className="flex justify-center">
            <Card className='w-[350px]'>
                <CardHeader>
                    <CardTitle>Send Tokens</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className='grid w-full items-center gap-4'>
                            <div className='flex flex-col space-y-1.5'>
                                <Label htmlFor='to'>Enter the Address</Label>
                                <Input id='to' placeholder='Type the amount'
                                    onChange={(e) => {
                                        setTo(e.target.value);
                                    }}
                                    value={to} />
                            </div>
                            <div className='flex flex-col space-y-1.5'>
                                <Label htmlFor='amount'>Enter the amount</Label>
                                <Input id='amount' placeholder='Type the amount'
                                    onChange={(e) => {
                                        setAmount(e.target.value)
                                    }}
                                    value={amount} />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className='flex justify-center'>
                    <Button onClick={sendTokens}>Send Tokens</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default SendToken;
