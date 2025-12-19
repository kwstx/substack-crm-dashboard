"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Package,
    Plus,
    ChevronRight,
    Users,
    DollarSign,
} from "lucide-react";

interface Product {
    id: string;
    name: string;
    description: string | null;
    price: number; // in cents
    currency: string | null;
    type: string | null;
    subscribers?: number;
    revenue?: number; // in cents
}

interface ProductsContentProps {
    initialProducts: Product[];
}

export default function ProductsContent({ initialProducts }: ProductsContentProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-display text-3xl font-bold tracking-tight">Products</h1>
                    <p className="text-muted-foreground mt-1">Manage your subscription tiers and digital products</p>
                </div>
                <Button className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Product
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {initialProducts?.map((product) => (
                    <Card key={product.id} className="border-border/50 shadow-sm hover:shadow-md transition-all group overflow-hidden">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
                                    <Package className="w-5 h-5" />
                                </div>
                                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100">
                                    {/* {product.status} Status mostly not in DB schema yet, defaulting */}
                                    active
                                </Badge>
                            </div>
                            <CardTitle className="text-xl">{product.name}</CardTitle>
                            <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-3xl font-bold">${(product.price / 100).toFixed(2)}</span>
                                <span className="text-sm text-muted-foreground">/ {product.type === 'subscription' ? 'mo' : 'one-time'}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                <div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                                        <Users className="w-3 h-3" />
                                        Sales/Subs
                                    </div>
                                    <div className="font-semibold">{product.subscribers?.toLocaleString() || 0}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                                        <DollarSign className="w-3 h-3" />
                                        Total Revenue
                                    </div>
                                    <div className="font-semibold">${((product.revenue || 0) / 100).toFixed(1)}</div>
                                </div>
                            </div>

                            <Button variant="outline" className="w-full mt-6 rounded-xl group-hover:bg-violet-600 group-hover:text-white transition-colors">
                                Edit Product
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
                {initialProducts?.length === 0 && (
                    <div className="col-span-3 text-center p-12 text-muted-foreground bg-gray-50 rounded-xl">
                        No products found. Create one above!
                    </div>
                )}
            </div>

            <Card className="border-border/50 shadow-sm">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">One-time Purchases</CardTitle>
                        <Button variant="ghost" size="sm" className="text-violet-600 font-medium">View all</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-2xl bg-secondary/20">
                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                            <Plus className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <p className="font-medium">No digital products yet</p>
                        <p className="text-sm text-muted-foreground mt-1 max-w-[250px] text-center">
                            Sell e-books, courses, or exclusive downloads to your subscribers.
                        </p>
                        <Button variant="outline" className="mt-6 rounded-xl">
                            Create First Product
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
