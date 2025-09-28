import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchProduct } from "./services/productService";
import Spinner from "./components/spinner";


function App() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  useEffect(() => {
    fetchProduct(12).then((data) => setProduct(data));
  }, []);

  if (!product) return <Spinner/>;

  const images = [product.image, product.image, product.image, product.image];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gray-100 font-[Poppins]">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <Slider asNavFor={nav2} ref={setNav1} arrows infinite className="mb-4">
            {images.map((img, idx) => (
              <div key={idx} className="flex justify-center items-center cursor-zoom-in">
                <img
                  src={img}
                  alt={product.title}
                  className="max-h-[300px] sm:max-h-[450px] w-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </Slider>

          <Slider
            asNavFor={nav1}
            ref={setNav2}
            slidesToShow={3}
            swipeToSlide
            focusOnSelect
            arrows={false}
            responsive={[{ breakpoint: 640, settings: { slidesToShow: 3 } }]}
          >
            {images.map((img, idx) => (
              <div key={idx} className="px-2">
                <img
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className="h-16 sm:h-20 w-16 sm:w-20 object-contain bg-gray-100 rounded-lg border p-2 cursor-pointer hover:opacity-80 transition"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="flex flex-col justify-between text-gray-800">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold mb-2">{product.title}</h1>
            <p className="text-2xl sm:text-3xl font-semibold text-[#6C63FF] mb-4">
              ${product.price}
            </p>
            <p className="mb-2 text-sm sm:text-base">
              <span className="font-medium">Category:</span>{" "}
              <span className="text-[#6C63FF]">{product.category}</span>
            </p>
            <p className="mb-4 text-sm sm:text-base">
              <span className="font-medium">Availability:</span>{" "}
              <span className="text-green-600">In Stock</span>
            </p>
            <hr className="my-4" />
            <p className="text-gray-500 text-sm leading-relaxed">{product.description}</p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3 border rounded-lg px-3 py-2 w-full sm:w-auto justify-between sm:justify-start">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-2 text-xl text-gray-600 hover:text-gray-800">-</button>
              <span className="text-lg">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="px-2 text-xl text-gray-600 hover:text-gray-800">+</button>
            </div>

            <div className="flex items-center gap-3 w-full">
              <button className="flex-1 py-3 rounded-lg bg-[#6C63FF] text-white font-medium hover:bg-[#5a52e0] transition-all duration-300 shadow-md">
                Add to Cart
              </button>
              <button className="w-12 h-12 flex items-center justify-center border rounded-full text-gray-500 hover:text-[#6C63FF] hover:border-[#6C63FF] transition">
                ❤
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
