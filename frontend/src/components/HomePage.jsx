import React from 'react';

const HomePage = () => {
  const features = [
    {
      icon: '🚚',
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50'
    },
    {
      icon: '🔒',
      title: 'Secure Payment',
      description: '100% secure payment processing'
    },
    {
      icon: '↩️',
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: '📞',
      title: '24/7 Support',
      description: 'Round the clock customer support'
    }
  ];

  const categories = [
    {
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80',
      items: '200+ Products'
    },
    {
      name: 'Fashion',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80',
      items: '150+ Products'
    },
    {
      name: 'Home & Kitchen',
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80',
      items: '300+ Products'
    },
    {
      name: 'Sports',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
      items: '100+ Products'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to MockStore</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices. Shop with confidence and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'shopping' }))}
            >
              Start Shopping
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose MockStore?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
     <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center text-gray-800 mb-14">
      Shop by <span className="text-blue-600">Category</span>
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {categories.map((category, index) => (
        <div
          key={index}
          className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("navigate", { detail: "shopping" }))
          }
        >
          {/* Image */}
          <div className="relative overflow-hidden">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white bg-gradient-to-t from-black/60 to-transparent">
            <h3 className="text-xl font-semibold">{category.name}</h3>
            <p className="text-sm text-gray-200">{category.items}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Special Offers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Special Offers
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Summer Sale! 🌞</h3>
              <p className="text-lg mb-4">Up to 50% off on selected items</p>
              <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Shop Now
              </button>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">New Arrivals! 🎁</h3>
              <p className="text-lg mb-4">Check out our latest products</p>
              <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Explore
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;