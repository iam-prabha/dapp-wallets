"use client"
import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import bs58 from 'bs58';
import { toast } from "sonner";

const SignMessages = () => {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState("")
  const [signature, setSignature] = useState<string | null>(null);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const sign = async () => {
    setSignature(null);
    try {
      if (!publicKey) throw new Error('Wallet not connected!');
      if (!signMessage) throw new Error('Wallet does not support message signing!');
      const encodeMessage = new TextEncoder().encode(message);
      const signature = await signMessage(encodeMessage);
      if (!ed25519.verify(signature, encodeMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
      setSignature(bs58.encode(signature));
      // console.log(`success, message signature : ${bs58.encode(signature)}`)
      toast.success(`${bs58.encode(signature)}`);
      setMessage("")
    } catch (error) {
      if (error instanceof Error){
        toast.error(`${error.message}`);
      }else{
        toast.error(`An unknow error occurred`)
      }
    }
  }

  return (
    <div className="flex justify-center">
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Sign message</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault() }}>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='sign'></Label>
                <Input id='sign'
                  placeholder="Enter message"
                  onChange={handleMessageChange}
                  value={message} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button onClick={sign}>Sign Message</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignMessages;
