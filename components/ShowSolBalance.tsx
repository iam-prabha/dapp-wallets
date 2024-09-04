"use client"
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";


const ShowSolBalance = () => {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [showbalance, setShowBalanace] = useState<number>(0);

    const getBalance = async () => {
        if (wallet.publicKey) {

            const balance = await connection.getBalance(wallet.publicKey);
            setShowBalanace(balance / LAMPORTS_PER_SOL);
            toast.success(`your request to get balance successfully done!`)
        }
    }
    return (
        <div className="flex justify-center items-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Show Balance</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <p className="text-center">{showbalance +" "+ "SOL"}</p>
                        <Button onClick={getBalance}>Get Balance</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default ShowSolBalance;