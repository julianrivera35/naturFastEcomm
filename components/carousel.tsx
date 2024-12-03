import { Product } from 'lib/supabase/types/products';
import Link from 'next/link';
import { GridTileImage } from './grid/tile';
import { StaticImageData } from 'next/image';

interface Props {
  products: Product[];
}

const Carousel = ({ products }: Props) => {
  if (!products?.length) return null;

  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => {
          if (!product.images?.[0]) return null;
          const imageSrc = product.images[0] as (string | StaticImageData);
          
          return (
            <li
              key={`${product.id}${i}`}
              className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
            >
              <Link href={`/product/${product.slug}`} className="relative h-full w-full">
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.price.toString(),
                    currencyCode: 'USD'
                  }}
                  src={imageSrc}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Carousel;