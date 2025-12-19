import { getProducts } from "@/actions/products";
import ProductsContent from "./products-content";

export default async function ProductsPage() {
  const { data } = await getProducts();

  // Transform DB data if necessary, or pass directly
  const formattedProducts = data?.map(p => ({
    ...p,
    // Provide defaults for strictly typed props
    description: p.description || null,
    currency: p.currency || "USD",
    type: p.type || "subscription"
  })) || [];

  return <ProductsContent initialProducts={formattedProducts} />;
}
