"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { importSubscribers, type ImportResult } from "@/actions/subscribers";
import { useRouter } from "next/navigation";

export function ImportDialog() {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const result = await importSubscribers(formData);

            if (result.success) {
                toast.success(result.message);
                setOpen(false);
                setFile(null);
                router.refresh();
            } else {
                toast.error(result.message || "Import failed");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="rounded-xl border-gray-200 shadow-sm font-bold text-gray-600 gap-2 px-3 md:px-4 h-9 md:h-10">
                    <Upload className="h-4 w-4 md:mr-2" />
                    <span className="hidden md:inline">Import</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Import Subscribers</DialogTitle>
                    <DialogDescription>
                        Upload your Substack CSV export file to import subscribers.
                        We'll update existing subscribers and add new ones.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="csv">CSV File</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                id="csv"
                                type="file"
                                accept=".csv"
                                onChange={handleFileChange}
                                disabled={isUploading}
                                className="cursor-pointer"
                            />
                        </div>
                        {file && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 bg-slate-50 p-2 rounded border border-slate-100">
                                <FileText className="h-4 w-4 text-blue-500" />
                                <span className="truncate max-w-[200px]">{file.name}</span>
                                <span className="text-xs">({(file.size / 1024).toFixed(1)} KB)</span>
                            </div>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={isUploading}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpload} disabled={!file || isUploading} className="gap-2">
                        {isUploading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Importing...
                            </>
                        ) : (
                            <>
                                <Upload className="h-4 w-4" />
                                Import Subscribers
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
