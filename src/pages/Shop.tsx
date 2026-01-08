import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Globe, Truck, RotateCcw, Heart, ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  sizes?: string[];
  inStock: boolean;
  designer?: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "NINETEEN TWENTY - Sweatpants",
    price: 899,
    image: "https://tilshop2-i05.mycdn.no/mysimgprod/tilshop2_mystore_no/images/media/xIEPRZHUMA6aAsVDw88NNN4pSfckcTraav0ZdBpw.jpg/w1440h1800.jpg",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    inStock: true,
    designer: "Simen Staal"
  },
  {
    id: "2",
    name: "NINETEEN TWENTY - T-shirt",
    price: 499,
    image: "https://tilshop2-i03.mycdn.no/mysimgprod/tilshop2_mystore_no/images/media/CFoFUtjnoAp5XTFgGBpYnWPS5HGPB9eijHWq5duM.png/w600h750.png",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    inStock: true,
    designer: "Simen Staal"
  },
  {
    id: "3",
    name: "TIL Card Deck",
    price: 169,
    image: "https://tilshop2-i04.mycdn.no/mysimgprod/tilshop2_mystore_no/images/media/Yg5YRrJQycK7ZUFYA3HfxWfCuntWIwfBe4hrts8b.png/w600h750.png",
    inStock: true
  },
  {
    id: "4",
    name: "TIL Birthday Package",
    price: 299,
    image: "https://tilshop2-i04.mycdn.no/mysimgprod/tilshop2_mystore_no/images/media/PWrUJ8ssjxmVPUxG1Hpf5aDFkGhOqJTBjXSKfr6H.png/w600h750.png",
    inStock: true
  },
  {
    id: "5",
    name: "TIL T-shirt",
    price: 349,
    image: "https://tilshop2-i04.mycdn.no/mysimgprod/tilshop2_mystore_no/images/media/U1DCFRb6Pz8zqlJtmOYnjDzKnb9vGzx2INRZPiyQ.png/w1800h619.png",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    inStock: true
  },
  {
    id: "6",
    name: "Bucket Hat with TIL logo",
    price: 299,
    image: "https://tilshop2-i05.mycdn.no/mysimgprod/tilshop2_mystore_no/images/media/xIEPRZHUMA6aAsVDw88NNN4pSfckcTraav0ZdBpw.jpg/w1440h1800.jpg",
    sizes: ["One Size"],
    inStock: true
  },
  {
    id: "7",
    name: "TIL Home Jersey 2025",
    price: 899,
    originalPrice: 999,
    image: "https://tilshop2-i05.mycdn.no/mysimgprod/tilshop2_mystore_no/images/media/xIEPRZHUMA6aAsVDw88NNN4pSfckcTraav0ZdBpw.jpg/w1440h1800.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true
  },
  {
    id: "8",
    name: "TIL Away Jersey 2025",
    price: 899,
    originalPrice: 999,
    image: "https://tilshop2-i03.mycdn.no/mysimgprod/tilshop2_mystore_no/images/media/CFoFUtjnoAp5XTFgGBpYnWPS5HGPB9eijHWq5duM.png/w600h750.png",
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true
  },
  {
    id: "9",
    name: "TIL Scarf - Red/White",
    price: 249,
    image: "https://tilshop2-i04.mycdn.no/mysimgprod/tilshop2_mystore_no/images/media/Yg5YRrJQycK7ZUFYA3HfxWfCuntWIwfBe4hrts8b.png/w600h750.png",
    inStock: true
  },
  {
    id: "10",
    name: "TIL Cap - Black",
    price: 299,
    image: "https://tilshop2-i04.mycdn.no/mysimgprod/tilshop2_mystore_no/images/media/PWrUJ8ssjxmVPUxG1Hpf5aDFkGhOqJTBjXSKfr6H.png/w600h750.png",
    sizes: ["One Size"],
    inStock: true
  },
  {
    id: "11",
    name: "TIL Hoodie - Grey",
    price: 699,
    image: "https://tilshop2-i03.mycdn.no/mysimgprod/tilshop2_mystore_no/images/media/CFoFUtjnoAp5XTFgGBpYnWPS5HGPB9eijHWq5duM.png/w600h750.png",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    inStock: true
  },
  {
    id: "12",
    name: "TIL Mug",
    price: 149,
    image: "https://tilshop2-i04.mycdn.no/mysimgprod/tilshop2_mystore_no/images/media/Yg5YRrJQycK7ZUFYA3HfxWfCuntWIwfBe4hrts8b.png/w600h750.png",
    inStock: true
  }
];

const categories = [
  { name: "Jerseys", image: "https://tilshop2-i05.mycdn.no/mysimgprod/tilshop2_mystore_no/images/media/xIEPRZHUMA6aAsVDw88NNN4pSfckcTraav0ZdBpw.jpg/w1440h1800.jpg", description: "Not all heroes wear capes, some wear TIL jerseys" },
  { name: "Supporter Items", image: "https://tilshop2-i03.mycdn.no/mysimgprod/tilshop2_mystore_no/images/media/CFoFUtjnoAp5XTFgGBpYnWPS5HGPB9eijHWq5duM.png/w600h750.png", description: "Get ready for the match" },
  { name: "Gifts & Accessories", image: "https://tilshop2-i04.mycdn.no/mysimgprod/tilshop2_mystore_no/images/media/Yg5YRrJQycK7ZUFYA3HfxWfCuntWIwfBe4hrts8b.png/w600h750.png", description: "Something for big and small" },
  { name: "Match Tickets", image: "https://tilshop2-i04.mycdn.no/mysimgprod/tilshop2_mystore_no/images/media/PWrUJ8ssjxmVPUxG1Hpf5aDFkGhOqJTBjXSKfr6H.png/w600h750.png", description: "Never miss an experience at the stadium" }
];

const Shop = () => {
  const handleBuy = (product: Product) => {
    alert(`Added "${product.name}" to cart!\nPrice: ${product.price} NOK`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground mb-4">
                OFFICIAL MERCH
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
                THE WORLD'S NORTHERNMOST PROFESSIONAL FOOTBALL CLUB
              </p>
              <Button size="lg" variant="secondary" className="font-bold">
                SHOP NOW
              </Button>
            </div>
            <div className="w-full md:w-1/2">
              <img 
                src="https://tilshop2-i05.mycdn.no/mysimgprod/tilshop2_mystore_no/images/media/xIEPRZHUMA6aAsVDw88NNN4pSfckcTraav0ZdBpw.jpg/w1440h1800.jpg"
                alt="TIL Merch"
                className="w-full max-w-md mx-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-primary/90 py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center text-primary-foreground">
              <Globe className="w-6 h-6 mb-2" />
              <span className="text-sm">Worldwide Shipping</span>
            </div>
            <div className="flex flex-col items-center text-primary-foreground">
              <Truck className="w-6 h-6 mb-2" />
              <span className="text-sm">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center text-primary-foreground">
              <RotateCcw className="w-6 h-6 mb-2" />
              <span className="text-sm">30 Day Returns</span>
            </div>
            <div className="flex flex-col items-center text-primary-foreground">
              <Heart className="w-6 h-6 mb-2" />
              <span className="text-sm">Remember Match Tickets</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <a 
              key={category.name}
              href="#"
              className="group relative overflow-hidden rounded-lg aspect-[3/4] bg-muted"
            >
              <img 
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-heading font-bold text-lg">{category.name}</h3>
                <p className="text-sm text-white/80">{category.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8">Loved by Supporters...</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-card rounded-lg overflow-hidden border group">
              <div className="aspect-square overflow-hidden bg-muted relative">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.originalPrice && (
                  <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                    SALE
                  </span>
                )}
              </div>
              <div className="p-3">
                {product.designer && (
                  <p className="text-xs text-muted-foreground mb-1">{product.designer}</p>
                )}
                <h3 className="font-semibold text-sm mb-1 line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold">{product.price},-</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">{product.originalPrice},-</span>
                  )}
                </div>
                {product.inStock && (
                  <p className="text-xs text-green-600 mb-2">In Stock</p>
                )}
                {product.sizes && (
                  <p className="text-xs text-muted-foreground mb-2">
                    Available in: {product.sizes.join(", ")}
                  </p>
                )}
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleBuy(product)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Buy
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
