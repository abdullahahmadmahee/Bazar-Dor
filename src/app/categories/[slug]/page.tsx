import CategoryClient from "./CategoryClient";

export const instant = false;

export async function generateStaticParams() {
  return [
    { slug: 'chal' },
    { slug: 'dal' },
    { slug: 'tel' },
    { slug: 'sobji' },
    { slug: 'mach' },
    { slug: 'mangsho' },
    { slug: 'dim-dui' }, 
    { slug: 'mosla' },  
  ];
}

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`, {
    cache: "force-cache"
  });
  const products = await res.json();

  console.log("API Categories:", Array.from(new Set(products.map((p: any) => p.category))));
  
  const catRes = await fetch(`https://api.api-store.workers.dev/api/bazardor/categories/${slug}`, {
    cache: "force-cache"
  });
  
  let categoryDetails = null;
  if (catRes.ok) {
    categoryDetails = await catRes.json();
  }

  return <CategoryClient products={products} categoryDetails={categoryDetails} />;
}