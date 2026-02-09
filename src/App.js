import "@/App.css";
import { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import {
  Menu, X, Phone, MapPin, Star, Utensils,
  ChefHat, Calendar, ArrowRight, Quote, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- DATA CONSTANTS ---

const FULL_MENU = [
  // Specialties
  { name: "8 oz. Hamburger Steak", price: "$12.99", category: "Specialties", description: "Served with mashed potatoes & gravy, salad & garlic bread." },
  { name: "12 oz. Hamburger Steak", price: "$13.99", category: "Specialties", description: "Served with mashed potatoes & gravy, salad & garlic bread." },
  { name: "Grilled Chicken Platter", price: "$13.99", category: "Specialties", description: "Juicy grilled chicken breast with your choice of 2 sides." },
  { name: "Grilled Shrimp Platter", price: "$13.99", category: "Specialties", description: "Fresh seasoned shrimp grilled to perfection." },
  { name: "Red Beans & Rice Platter", price: "$12.99", category: "Specialties", description: "A Louisiana classic served with smoked sausage." },
  { name: "Chicken Kabob", price: "$13.99", category: "Specialties", description: "Served with salad, hummus & pita bread." },
  { name: "Shrimp Kabob", price: "$14.99", category: "Specialties", description: "Fresh shrimp grilled on a skewer with savory seasoning." },
  { name: "Side by Side", price: "$11.99", category: "Specialties", description: "Grilled chicken or grilled shrimp w/ grilled vegetables." },
  { name: "Shrimp Wrap", price: "$10.99", category: "Specialties", description: "Fresh shrimp wrapped in a soft tortilla with house dressing." },
  { name: "Chicken Wrap", price: "$9.99", category: "Specialties", description: "Grilled chicken wrapped in a soft tortilla with house dressing." },
  { name: "Grilled Tilapia Platter", price: "$14.99", category: "Specialties", description: "Lightly seasoned and grilled tilapia fillet." },

  // Po-Boys
  { name: "Grilled Chicken Po-Boy", price: "$9.99", category: "Po-Boys", description: "Dressed with mayo, lettuce, tomato & pickle." },
  { name: "Fried Catfish Po-Boy", price: "$9.99", category: "Po-Boys", description: "Dressed with mayo, lettuce, tomato & pickle." },
  { name: "Fried Shrimp Po-Boy", price: "$11.59", category: "Po-Boys", description: "Crispy fried shrimp on local French bread." },
  { name: "Grilled Shrimp Po-Boy", price: "$12.99", category: "Po-Boys", description: "Dressed with mayo, lettuce, tomato & pickle." },
  { name: "Sm. Hamburger Po-Boy", price: "$7.99", category: "Po-Boys", description: "Traditional burger po-boy style." },
  { name: "Lg. Hamburger Po-Boy", price: "$9.99", category: "Po-Boys", description: "Dressed with mayo, lettuce, tomato & pickle." },
  { name: "Steak Philly", price: "$11.99", category: "Po-Boys", description: "Grilled onions, mushrooms, bell peppers & jalapenos." },
  { name: "Grilled Chicken Philly", price: "$11.99", category: "Po-Boys", description: "Philly style with chicken and swiss cheese." },
  { name: "Grilled Shrimp Philly", price: "$11.99", category: "Po-Boys", description: "The ultimate seafood Philly combo." },
  { name: "1/2 Shrimp or Catfish Po-Boy Combo", price: "$12.99", category: "Po-Boys", description: "Served with fries & a drink." },

  // Burgers & Combos
  { name: "Hamburger", price: "$7.69", category: "Burgers", description: "The classic Goodwood burger." },
  { name: "Cheeseburger", price: "$7.99", category: "Burgers", description: "Classic burger with melted American cheese." },
  { name: "Bacon or Mushroom Cheeseburger", price: "$8.39", category: "Burgers", description: "Topped with your choice of crispy bacon or sautéed mushrooms." },
  { name: "Mega Burger", price: "$9.99", category: "Burgers", description: "Grilled onions, mushrooms, jalapenos, bacon & cheese." },
  { name: "Patty Melt", price: "$8.99", category: "Burgers", description: "Grilled onions and cheese on toasted bread." },
  { name: "BLT", price: "$6.39", category: "Burgers", description: "Bacon, lettuce, and tomato on toasted bread." },
  { name: "Chicken Club", price: "$9.99", category: "Burgers", description: "Triple decker with chicken and bacon." },
  { name: "Hamburger Super Value", price: "$12.49", category: "Burgers", description: "Combo includes fries & drink." },
  { name: "Cheeseburger Super Value", price: "$12.99", category: "Burgers", description: "Combo includes fries & drink." },

  // Fried Seafood
  { name: "Catfish Basket", price: "$11.99", category: "Seafood", description: "Served with fries & garlic bread." },
  { name: "Shrimp Basket", price: "$12.99", category: "Seafood", description: "Served with fries & garlic bread." },
  { name: "Combo Basket", price: "$13.99", category: "Seafood", description: "Catfish and Shrimp combo with fries." },
  { name: "Catfish Platter", price: "$13.99", category: "Seafood", description: "Platters served with your choice of two sides." },
  { name: "Shrimp Platter", price: "$13.99", category: "Seafood", description: "Platters served with your choice of two sides." },
  { name: "Combo Platter", price: "$15.99", category: "Seafood", description: "The ultimate seafood platter feast with 2 sides, garlic bread, and hush puppies." },

  // Salads
  { name: "Green Salad", price: "$5.99", category: "Salads", description: "Fresh mixed greens and seasonal vegetables." },
  { name: "Greek Salad", price: "$7.39", category: "Salads", description: "Feta, olives, and greek dressing." },
  { name: "Chicken Salad", price: "$11.99", category: "Salads", description: "Grilled or fried chicken on fresh greens." },
  { name: "Greek Chicken Salad", price: "$12.99", category: "Salads", description: "Fresh greens with feta and grilled chicken." },
  { name: "Shrimp Salad", price: "$13.99", category: "Salads", description: "Grilled or fried shrimp over mixed greens." },

  // Kids Menu
  { name: "Kids Hamburger", price: "$5.99", category: "Kids", description: "Pickles & Ketchup only. Served with French fries." },
  { name: "Kids Shrimp Basket", price: "$6.99", category: "Kids", description: "Served with French fries." },
  { name: "Kids Catfish Basket", price: "$6.99", category: "Kids", description: "Served with French fries." },
  { name: "Kids Chicken Tender", price: "$6.99", category: "Kids", description: "Served with French fries." },
  { name: "Kids Grilled Cheese", price: "$4.99", category: "Kids", description: "Served with French fries." },

  // Sides
  { name: "Cajun Curly Fries", price: "$3.49", category: "Sides", description: "Sm $3.49 / Lg $4.29" },
  { name: "French Fries", price: "$2.99", category: "Sides", description: "Sm $2.99 / Lg $3.99" },
  { name: "Onion Rings", price: "$4.99", category: "Sides", description: "Sm $4.99 / Lg $6.99" },
  { name: "Sweet Potato Fries", price: "$3.99", category: "Sides", description: "Sm $3.99 / Lg $5.99" },
  { name: "Hummus Dip", price: "$5.59", category: "Sides", description: "Creamy hummus served with pita." }
];

const DAILY_SPECIALS = [
  { day: "Monday", dish: "Chicken Fried Steak", price: "$11.99", description: "Served with mashed potatoes topped with white gravy, side salad, and garlic bread.", image: "https://images.unsplash.com/photo-1653982151807-a2ee87286ae1?w=600&h=400&fit=crop" },
  { day: "Tuesday", dish: "Red Beans & Rice", price: "$11.99", description: "Served with choice of Sausage or Chicken Fried Steak, side salad, and garlic bread.", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop" },
  { day: "Wednesday", dish: "Smothered Center Cut Pork Chop", price: "$11.99", description: "Served with rice & gravy, green beans, and garlic bread.", image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&h=400&fit=crop" },
  { day: "Thursday", dish: "Homemade Spaghetti & Meat Balls", price: "$11.99", description: "Served with a side salad and garlic bread.", image: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=600&h=400&fit=crop" },
  { day: "Friday", dish: "Fried Catfish", price: "$11.99", description: "Served with homemade potato salad and sweet peas.", image: "https://images.unsplash.com/photo-1587869776335-bdef48f8114e?w=600&h=400&fit=crop" },
  { day: "Saturday", dish: "8 oz. Hamburger Steak", price: "$11.99", description: "Topped with grilled onions & mushrooms. Served with mashed potatoes, side salad, and garlic bread.", image: "https://images.unsplash.com/photo-1720701247887-cab418baa6d6?w=600&h=400&fit=crop" },
];

const REVIEWS = [
  { name: "Sarah M.", text: "Best burger in Baton Rouge, hands down! The portions are HUGE and the staff treats you like family.", rating: 5 },
  { name: "Mike T.", text: "Been coming here for 10 years. The daily specials are unbeatable - real home cooking at diner prices.", rating: 5 },
  { name: "Jessica R.", text: "Finally found a place that reminds me of my grandma's cooking. The hamburger steak is perfection!", rating: 5 },
  { name: "David L.", text: "Friendly staff, quick service, and the Mega Burger lives up to its name. A true Baton Rouge gem!", rating: 5 },
  { name: "Karen B.", text: "The catfish on Fridays is a must-try! Crispy, flaky, and served with a smile. Best value in BR.", rating: 5 },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className={`transition-all duration-300 ${scrolled ? "bg-cream/95 backdrop-blur-sm shadow-md" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="#" className="flex items-center gap-2">
              <div className="w-12 h-12 bg-barn-red rounded-full flex items-center justify-center shadow-retro-sm">
                <Utensils className="w-6 h-6 text-mustard" />
              </div>
              <span className="font-heading text-2xl text-barn-red hidden sm:block">Goodwood Grill</span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              <a href="#specials" className="font-subheading text-xl text-slate hover:text-barn-red transition-colors">Daily Specials</a>
              <a href="#menu" className="font-subheading text-xl text-slate hover:text-barn-red transition-colors">Menu</a>
              <a href="#reviews" className="font-subheading text-xl text-slate hover:text-barn-red transition-colors">Reviews</a>
              <a href="#location" className="font-subheading text-xl text-slate hover:text-barn-red transition-colors">Location</a>
               <a href="#location" className="font-subheading text-xl text-slate hover:text-barn-red transition-colors">Contact</a>
              <a href="https://www.toasttab.com/local/order/goodwood-grill-market-8558-goodwood-blvd" target="_blank" rel="noopener noreferrer">
                <Button className="bg-barn-red text-white font-bold uppercase px-6 py-3 rounded-lg shadow-retro btn-press">Order Online</Button>
              </a>
            </div>

            <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-8 h-8 text-slate" /> : <Menu className="w-8 h-8 text-slate" />}
            </button>
          </div>

          {isOpen && (
            <div className="md:hidden bg-cream border-t-2 border-slate/20 p-4 space-y-4">
              <a href="#specials" onClick={() => setIsOpen(false)} className="block font-subheading text-xl text-slate">Daily Specials</a>
              <a href="#menu" onClick={() => setIsOpen(false)} className="block font-subheading text-xl text-slate">Menu</a>
              <a href="#reviews" onClick={() => setIsOpen(false)} className="block font-subheading text-xl text-slate">Reviews</a>
              <a href="#location" onClick={() => setIsOpen(false)} className="block font-subheading text-xl text-slate">Location</a>
               <a href="#location" onClick={() => setIsOpen(false)} className="block font-subheading text-xl text-slate">Contact</a>
              <a href="https://www.toasttab.com/local/order/goodwood-grill-market-8558-goodwood-blvd" target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full bg-barn-red text-white py-3 rounded-lg shadow-retro">Order Online</Button>
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

const HeroSection = () => (
  <section className="relative min-h-screen bg-cream flex items-center pt-24 overflow-hidden">
    <div className="absolute inset-0 bg-diner-pattern opacity-50"></div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8 animate-fade-in">
        <span className="font-accent text-2xl text-barn-red handwritten-note">Since 2004 in Baton Rouge</span>
        <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-slate leading-tight text-shadow-retro">
          Baton Rouge's Home for <span className="text-barn-red">Real Comfort Food</span>
        </h1>
        <p className="font-body text-lg text-slate-light max-w-xl">Massive burgers, fresh seafood, and homestyle specials made fresh every day on Goodwood Blvd.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="https://www.toasttab.com/local/order/goodwood-grill-market-8558-goodwood-blvd" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button className="w-full bg-barn-red text-white font-bold px-8 py-4 text-lg rounded-lg shadow-retro btn-press">Order Online Now <ArrowRight className="ml-2 w-5 h-5" /></Button>
          </a>
          <a href="#specials" className="w-full sm:w-auto">
            <Button className="w-full bg-mustard text-slate font-bold px-8 py-4 text-lg rounded-lg shadow-retro btn-press">View Today's Specials</Button>
          </a>
        </div>
      </div>
      <div className="relative animate-slide-in-right">
        <div className="relative rounded-2xl overflow-hidden border-4 border-slate shadow-retro-lg">
          <img src="https://images.unsplash.com/photo-1619810816144-68dbc1f695e8?w=800&h=600&fit=crop" alt="Mega Burger" className="w-full h-[400px] object-cover" />
          <div className="absolute bottom-0 left-0 right-0 gradient-overlay-dark p-6">
            <div className="bg-mustard inline-block px-4 py-2 rounded-lg border-2 border-slate day-badge">
              <span className="font-subheading text-xl text-slate">Try Our Famous Mega Burger!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const DailySpecialsSection = () => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  return (
    <section id="specials" className="py-20 bg-cream relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Calendar className="w-12 h-12 text-barn-red mx-auto mb-4" />
          <h2 className="font-heading text-4xl text-slate mb-4">Daily Specials</h2>
          <p className="font-body text-lg text-slate-light">Fresh homestyle specials served with two sides & cornbread!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DAILY_SPECIALS.map((special) => (
            <div key={special.day} className={`relative overflow-hidden rounded-xl border-2 border-slate shadow-retro card-hover ${today === special.day ? 'ring-4 ring-mustard' : ''}`}>
              <div className="relative h-64">
                <img src={special.image} alt={special.dish} className="w-full h-full object-cover" />
                <div className="absolute inset-0 gradient-overlay-dark"></div>
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-1 rounded-full border-2 border-slate font-subheading ${today === special.day ? 'bg-mustard text-slate' : 'bg-white text-slate'}`}>{special.day}</span>
                </div>
                <div className="absolute bottom-0 p-6">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-subheading text-2xl text-white">{special.dish}</h3>
                    <span className="text-mustard font-bold">{special.price}</span>
                  </div>
                  <p className="font-body text-white/80 text-sm">{special.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MenuSearchSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Specialties", "Po-Boys", "Burgers", "Seafood", "Salads", "Sides", "Kids"];

  const filteredMenu = useMemo(() => {
    return FULL_MENU.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <section id="menu" className="py-20 bg-slate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <ChefHat className="w-12 h-12 text-mustard mx-auto mb-4" />
          <h2 className="font-heading text-4xl sm:text-5xl text-white mb-4">Explore Our Menu</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate w-5 h-5" />
            <input
              type="text"
              placeholder="Search our menu..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-mustard bg-cream text-slate focus:ring-2 focus:ring-mustard outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-bold text-sm border-2 transition-all ${activeCategory === cat ? "bg-mustard text-slate border-slate" : "bg-slate text-white border-white/20"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map((item) => (
            <div key={item.name} className="bg-cream rounded-xl border-2 border-slate p-6 shadow-retro card-hover flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-subheading text-xl text-slate">{item.name}</h3>
                  <span className="bg-barn-red text-white px-2 py-1 rounded-md font-bold text-sm">{item.price}</span>
                </div>
                <p className="font-body text-slate-light text-sm mb-3 italic">{item.category}</p>
                <p className="font-body text-slate/80 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReviewsSection = () => (
  <section id="reviews" className="py-20 bg-cream relative">
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="flex justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-8 h-8 text-mustard fill-mustard" />)}
        </div>
        <h2 className="font-heading text-4xl text-slate mb-4">Wall of Love</h2>
        <p className="font-body text-lg text-slate-light">4.5 stars from over 1,400 happy customers.</p>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-8">
        {REVIEWS.map((review, i) => (
          <div key={i} className="flex-shrink-0 w-80 bg-white border-2 border-slate p-6 rounded-xl shadow-retro">
            <Quote className="w-8 h-8 text-barn-red/20 mb-2" />
            <p className="font-body text-slate mb-4 italic">"{review.text}"</p>
            <p className="font-subheading text-lg text-barn-red">— {review.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FooterSection = () => (
  <footer id="location" className="bg-slate text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Utensils className="w-10 h-10 text-mustard" />
          <span className="font-heading text-2xl">Goodwood Grill</span>
        </div>
        <p className="text-white/70">Serving Baton Rouge's best comfort food since 2004.</p>
      </div>
      <div>
        <h3 className="font-subheading text-2xl text-mustard mb-6">Hours</h3>
        <p>Mon - Sat: 10:30 AM - 6:00 PM</p>
        <p>Sun: Closed</p>
      </div>
      <div>
        <h3 className="font-subheading text-2xl text-mustard mb-6">Contact</h3>
        <p className="flex items-center gap-2 mb-2"><Phone className="w-5 h-5" /> (225) 927-7550</p>
        <p className="flex items-start gap-2"><MapPin className="w-5 h-5 mt-1" /> 8558 Goodwood Blvd<br />Baton Rouge, LA 70806</p>
      </div>
      <div>
        <h3 className="font-subheading text-2xl text-mustard mb-6">Find Us</h3>
        <div className="h-40 bg-white/10 rounded-lg overflow-hidden border-2 border-white/20">
          <iframe title="map" width="100%" height="100%" src="https://maps.google.com/maps?q=8558%20Goodwood%20Blvd,%20Baton%20Rouge&t=&z=13&ie=UTF8&iwloc=&output=embed" style={{ border: 0 }}></iframe>
        </div>
      </div>
    </div>
  </footer>
);

const Home = () => (
  <div className="min-h-screen">
    <Navigation />
    <HeroSection />
    <DailySpecialsSection />
    <MenuSearchSection />
    <ReviewsSection />
    <FooterSection />
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;