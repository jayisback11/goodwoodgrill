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
  // PO-BOYS (12-INCH)
  { name: "Grilled Chicken Po-Boy", price: "$9.99", category: "Po-Boys", description: "Dressed with mayo, lettuce, tomato & pickle." },
  { name: "Fried Catfish Po-Boy", price: "$9.99", category: "Po-Boys", description: "Dressed with mayo, lettuce, tomato & pickle." },
  { name: "Fried Shrimp Po-Boy", price: "$11.59", category: "Po-Boys", description: "Dressed with mayo, lettuce, tomato & pickle." },
  { name: "Grilled Shrimp Po-Boy", price: "$12.99", category: "Po-Boys", description: "Dressed with mayo, lettuce, tomato & pickle." },
  
  // BURGERS
  { name: "Hamburger", price: "$7.69", category: "Burgers", description: "Dressed with mayo, lettuce, tomato, pickle & mustard." },
  { name: "Cheeseburger", price: "$7.99", category: "Burgers", description: "Dressed with mayo, lettuce, tomato, pickle & mustard." },
  { name: "Bacon Cheeseburger", price: "$8.39", category: "Burgers", description: "Dressed with mayo, lettuce, tomato, pickle & mustard." },
  { name: "Mushroom Cheeseburger", price: "$8.39", category: "Burgers", description: "Dressed with mayo, lettuce, tomato, pickle & mustard." },
  { name: "Mega Burger", price: "$9.99", category: "Burgers", description: "Grilled onions, mushrooms, jalapeno, bacon & cheese." },
  { name: "BLT", price: "$6.29", category: "Burgers", description: "Bacon, lettuce, tomatoes & mayo." },

  // BASKETS (Served with French Fries & Garlic Bread)
  { name: "Catfish Basket", price: "$11.99", category: "Baskets", description: "Fried catfish served with French fries & garlic bread." },
  { name: "Shrimp Basket", price: "$12.99", category: "Baskets", description: "Fried shrimp served with French fries & garlic bread." },
  { name: "Combo Basket", price: "$13.99", category: "Baskets", description: "Catfish and shrimp served with French fries & garlic bread." },

  // LOW CARB MENU
  { name: "Shrimp Wrap", price: "$10.99", category: "Low Carb", description: "Dressed with lettuce, tomato, mayo and pickles." },
  { name: "Chicken Wrap", price: "$9.99", category: "Low Carb", description: "Dressed with lettuce, tomato, mayo and pickles." },
  { name: "Side-By-Side (Chicken)", price: "$11.99", category: "Low Carb", description: "Grilled chicken with grilled vegetables." },
  { name: "Side-By-Side (Shrimp)", price: "$12.99", category: "Low Carb", description: "Grilled shrimp with grilled vegetables." },

  // SPECIALTIES
  { name: "8oz Hamburger Steak", price: "$12.99", category: "Specialties", description: "Fresh ground beef covered with grilled onions, mushroom gravy. Served with salad, smothered potatoes and garlic bread." },
  { name: "12oz Hamburger Steak", price: "$13.99", category: "Specialties", description: "Fresh ground beef covered with grilled onions, mushroom gravy. Served with salad, smothered potatoes and garlic bread." },
  { name: "Grilled Chicken Platter", price: "$13.99", category: "Specialties", description: "10 oz. marinated grilled chicken breast. Served with choice of two sides and pita bread." },
  { name: "Grilled Tilapia Platter", price: "$14.99", category: "Specialties", description: "Served with choice of two sides." },
  { name: "Chicken Club", price: "$9.99", category: "Specialties", description: "Grilled chicken breast topped with bacon and Swiss. Dressed with mayo, lettuce and tomato on a bun." },
  { name: "Steak Philly", price: "$11.99", category: "Specialties", description: "Grilled with onions, mushrooms, bell peppers & jalapenos." },
  { name: "Grilled Chicken Philly", price: "$11.99", category: "Specialties", description: "Grilled with onions, mushrooms, bell peppers & jalapenos." },
  { name: "Shrimp Philly", price: "$11.99", category: "Specialties", description: "Grilled with onions, mushrooms, bell peppers & jalapenos." },
  { name: "Patty Melt", price: "$8.99", category: "Specialties", description: "10 oz. fresh ground beef, grilled onions, Swiss or American cheese on rye bread." },
  { name: "Red Beans & Rice Platter", price: "$12.99", category: "Specialties", description: "Served Monday-Friday. Choice of Sausage or Chicken Fried Steak with salad and garlic bread." },
  { name: "Chicken Kabob", price: "$13.99", category: "Specialties", description: "Served with salad, hummus, and pita bread." },
  { name: "Shrimp Kabob", price: "$14.99", category: "Specialties", description: "Served with salad, hummus, and pita bread." },

  // FRIED SEAFOOD PLATTERS (Served with choice of two sides)
  { name: "Fried Catfish Platter", price: "$12.99", category: "Seafood", description: "Fried golden brown and served with choice of two sides." },
  { name: "Fried Shrimp Platter", price: "$13.99", category: "Seafood", description: "Jumbo shrimp fried golden brown with choice of two sides." },
  { name: "Combination Platter", price: "$15.99", category: "Seafood", description: "Catfish and shrimp combo with choice of two sides." },
  { name: "Grilled Shrimp Platter", price: "$14.99", category: "Seafood", description: "Seasoned jumbo shrimp served with choice of two sides." },

  // SALADS
  { name: "Green Salad", price: "$5.99", category: "Salads", description: "Lettuce, tomato, cheese, olives & crackers." },
  { name: "Greek Salad", price: "$7.29", category: "Salads", description: "Lettuce, tomato, olives, feta and pita bread." },
  { name: "Grilled Chicken Salad", price: "$11.99", category: "Salads", description: "Diced marinated chicken, cheese, tomato, and olives on green salad with pita bread." },
  { name: "Greek Chicken Salad", price: "$11.99", category: "Salads", description: "Diced marinated chicken, feta, tomato, and olives on green salad with pita and Greek dressing." },
  { name: "Shrimp Salad (Fried or Grilled)", price: "$13.99", category: "Salads", description: "Jumbo shrimp, cheese, tomato, olives, and boiled eggs on green salad." },

  // KIDS MENU
  { name: "Kids Hamburger", price: "$5.99", category: "Kids", description: "Pickles & Ketchup only. Served with fries." },
  { name: "Kids Shrimp Basket", price: "$6.99", category: "Kids", description: "Served with French fries." },
  { name: "Kids Catfish Basket", price: "$6.99", category: "Kids", description: "Served with French fries." },
  { name: "Kids Chicken Tender Bskt", price: "$6.99", category: "Kids", description: "Served with French fries." },
  { name: "Grilled Cheese Sandwich", price: "$4.99", category: "Kids", description: "Served with French fries." },

  // SIDE ORDERS
  { name: "Cajun Curly Ques", price: "$3.29", category: "Sides", description: "Small $3.29 | Large $4.99" },
  { name: "French Fries", price: "$2.99", category: "Sides", description: "Small $2.99 | Large $4.29" },
  { name: "Onion Rings", price: "$4.99", category: "Sides", description: "Small $4.99 | Large $6.99" },
  { name: "Sweet Potato Fries", price: "$3.99", category: "Sides", description: "Small $3.99 | Large $5.99" },
  { name: "Red Beans & Rice", price: "$4.99", category: "Sides", description: "Small $4.99 | Large $6.99" },
  { name: "Mash Potatoes w/ Gravy", price: "$2.99", category: "Sides", description: "Small $2.99 | Large $4.99" },
  { name: "Macaroni & Cheese", price: "$4.99", category: "Sides", description: "Creamy mac & cheese." },
  { name: "Grilled Vegetables", price: "$4.99", category: "Sides", description: "Freshly grilled." },
  { name: "Hummus Dip", price: "$5.59", category: "Sides", description: "Served with pita." },
  { name: "Garlic Bread", price: "$.95", category: "Sides", description: "Toasted garlic bread." }
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
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-barn-red rounded-full flex items-center justify-center shadow-retro-sm">
                <Utensils className="w-5 h-5 sm:w-6 sm:h-6 text-mustard" />
              </div>
              <span className="font-heading text-xl sm:text-2xl text-barn-red hidden lg:block">Goodwood Grill</span>
            </a>

            <div className="hidden md:flex items-center gap-4 lg:gap-8">
              <a href="#specials" className="font-subheading text-lg lg:text-xl text-slate hover:text-barn-red transition-colors">Specials</a>
              <a href="#menu" className="font-subheading text-lg lg:text-xl text-slate hover:text-barn-red transition-colors">Menu</a>
              <a href="#location" className="font-subheading text-lg lg:text-xl text-slate hover:text-barn-red transition-colors">Location</a>
              
              <div className="flex items-center gap-3">
                <a href="https://www.toasttab.com/local/order/goodwood-grill-market-8558-goodwood-blvd" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-barn-red text-white font-bold uppercase text-xs lg:text-sm px-4 py-2 rounded-lg shadow-retro btn-press">Pick Up</Button>
                </a>
                <a href="https://www.doordash.com/store/goodwood-grill-baton-rouge-37983655/86901754/?event_type=autocomplete&pickup=false" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#FF3008] text-white font-bold uppercase text-xs lg:text-sm px-4 py-2 rounded-lg shadow-retro btn-press">DoorDash</Button>
                </a>
              </div>
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
              <div className="flex flex-col gap-3 pt-2">
                <a href="https://www.toasttab.com/local/order/goodwood-grill-market-8558-goodwood-blvd" target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full bg-barn-red text-white py-3 rounded-lg shadow-retro">Pick Up on ToastTab</Button>
                </a>
                <a href="https://www.doordash.com/store/goodwood-grill-baton-rouge-425895/" target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full bg-[#FF3008] text-white py-3 rounded-lg shadow-retro">Deliver on DoorDash</Button>
                </a>
              </div>
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
            <Button className="w-full bg-barn-red text-white font-bold px-8 py-4 text-lg rounded-lg shadow-retro btn-press">
              Pick Up on ToastTab <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
          <a href="https://www.doordash.com/store/goodwood-grill-baton-rouge-425895/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button className="w-full bg-[#FF3008] text-white font-bold px-8 py-4 text-lg rounded-lg shadow-retro btn-press">
              Deliver on DoorDash
            </Button>
          </a>
        </div>
        
        <div>
          <a href="#specials" className="inline-block">
            <Button className="bg-mustard text-slate font-bold px-8 py-3 text-lg rounded-lg shadow-retro btn-press">View Today's Specials</Button>
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
          <h2 className="font-heading text-4xl text-slate mb-2">Daily Specials</h2>
          <p className="font-body text-lg text-slate-light mb-2">Fresh homestyle specials served with two sides & garlic bread!</p>
          <p className="font-subheading text-xl text-barn-red font-bold underline decoration-mustard decoration-2">Special price is $12.99 on any other day.</p>
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
  const categories = ["All", "Po-Boys", "Burgers", "Baskets", "Specialties", "Seafood", "Salads", "Low Carb", "Kids", "Sides"];

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