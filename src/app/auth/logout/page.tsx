import { Card } from "@/components/ui/card";
import { deleteStorageKey } from "@/lib/storage";
import { useEffect } from "react";

export default function LogoutPage() {
    useEffect(() => {
        deleteStorageKey("session")
        return setTimeout(() => {
            router.push("/");
        }, 2000);
    }, [])
    return (
    <Card className="w-full sm:w-lg">
        Logging out...
    </Card>)
}