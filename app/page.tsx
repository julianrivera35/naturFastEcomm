
import Carousel from 'components/carousel';
import ThreeItemGrid from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import { getProducts } from 'lib/supabase/queries/products';
import { getActivePromotions } from 'lib/supabase/queries/promotions';
import { Product } from 'lib/supabase/types/products';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Supabase.',
  openGraph: {
    type: 'website'
  }
};

export const revalidate = 60;

export default async function HomePage() {
  const [products, promotions] = await Promise.all([
    getProducts({}),
    getActivePromotions()
  ]);

  const featuredProducts = products.slice(0, 3) as Product[];
  const carouselProducts = products.slice(3, 10) as Product[];

  return (
    <>
      <ThreeItemGrid products={featuredProducts} />
      <Carousel products={carouselProducts} />
      {promotions.length > 0 && (
        <div className="py-8">
          {/* TODO: Promotions banner */}
        </div>
      )}
      <Footer />
    </>
  );
}