import { IAPIProductItem } from "../types/products";

const ProductList = ({
  images,
  title,
  price,
  description,
}: IAPIProductItem) => {
  return (
    <div className="p-2 m-2 bg-white flex max-w-5xl">
      <div className="flex-1">
        <img
          className="h-[300px] w-[300px] object-contain"
          alt={`${title} Image`}
          src={images[0]}
        />
      </div>
      <div className="flex-1">
        <div className="p-6 flex flex-col gap-6">
          <p className="text-blue-600/100 text-4xl">{title}</p>
          <p className="text-xl">{description}</p>
          <p className="text-4xl">{price} $</p>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
