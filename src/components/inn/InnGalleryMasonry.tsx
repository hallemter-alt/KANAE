import Image from "next/image";

export type InnGalleryImage = {
  id: string;
  alt: string;
  imageUrl: string;
};

export type InnGalleryMasonryProps = {
  images: InnGalleryImage[];
  columns?: 2 | 3;
};

export function InnGalleryMasonry({ images, columns = 3 }: InnGalleryMasonryProps) {
  return (
    <section className="rounded border border-charcoal-black/10 bg-brick-white p-4 shadow-subtle-line">
      <h3 className="mb-3 font-serif-jp text-lg text-charcoal-black">館内ギャラリー</h3>
      <div className={`grid gap-3 ${columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        {images.map((image) => (
          <figure key={image.id} className="overflow-hidden rounded border border-concrete-grey bg-washi-white">
            <Image src={image.imageUrl} alt={image.alt} className="h-40 w-full object-cover" width={640} height={320} />
            <figcaption className="px-3 py-2 text-xs text-rust-iron">{image.alt}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default InnGalleryMasonry;
