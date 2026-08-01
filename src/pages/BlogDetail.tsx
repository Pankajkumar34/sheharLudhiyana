import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Eye, User, Clock, Share2, Facebook, Twitter, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import bizRestaurant from "@/assets/biz-restaurant.jpg";
import bizMall from "@/assets/biz-mall.jpg";
import bizGym from "@/assets/biz-gym.jpg";

const blogData: Record<string, any> = {
  "10-best-street-food-places-in-ludhiana": {
    title: "10 Best Street Food Places in Ludhiana You Must Try",
    excerpt: "From famous kulchas to delicious parathas, discover the ultimate street food guide for Ludhiana food lovers.",
    author: "Priya Sharma",
    date: "January 15, 2024",
    readTime: "5 min read",
    views: 2340,
    category: "Food & Restaurants",
    image: bizRestaurant,
    content: `
Ludhiana is not just the industrial capital of Punjab — it's also a paradise for food lovers. The city's streets are lined with vendors serving some of the most authentic and delicious Punjabi street food you'll find anywhere.

## 1. Kulcha King - Ferozepur Road

Starting our list is the legendary Kulcha King on Ferozepur Road. Known for their butter-laden Amritsari kulchas stuffed with paneer and aloo, this place has been serving hungry Ludhianvis for over 30 years.

**Must Try:** Paneer Kulcha with Chole  
**Price Range:** ₹60 - ₹120

## 2. Baba Ji Ka Dhaba - Chaura Bazaar

A tiny dhaba with massive flavors. Their dal makhani slow-cooked overnight is simply divine. Pair it with hot butter naan for the perfect meal.

**Must Try:** Dal Makhani with Butter Naan  
**Price Range:** ₹80 - ₹150

## 3. Sardarji Paratha Corner - Model Town

The parathas here are legendary — stuffed with generous amounts of gobi, paneer, or mixed vegetables, and served with a dollop of white butter and homemade pickle.

**Must Try:** Gobi Paratha with Lassi  
**Price Range:** ₹50 - ₹100

## 4. Giani Di Hatti - Sarabha Nagar

Famous for their samosas and jalebis, this decades-old shop draws crowds every evening. The crispy samosas filled with spiced potatoes are addictive.

**Must Try:** Samosa with Chole  
**Price Range:** ₹30 - ₹60

## 5. Lucky Chicken Corner - Gill Road

For non-vegetarian food lovers, Lucky Chicken Corner serves the best tandoori chicken in the city. The smoky flavors and tender meat keep customers coming back.

**Must Try:** Full Tandoori Chicken  
**Price Range:** ₹350 - ₹500

## Tips for Street Food Exploration

- **Best Time:** Evening (5 PM - 9 PM) is when most street food stalls are at their freshest
- **Carry Cash:** Most street vendors don't accept digital payments
- **Go Hungry:** You'll want to try everything!
- **Ask Locals:** The best spots are often hidden gems known only to locals

Ludhiana's street food scene is constantly evolving, with new vendors and flavors emerging regularly. Whether you're a lifelong resident or a first-time visitor, these spots are guaranteed to satisfy your cravings!
    `,
  },
  "starting-your-business-in-ludhiana": {
    title: "Starting Your Business in Ludhiana: Complete Guide 2024",
    excerpt: "Everything you need to know about starting and growing your business in Ludhiana.",
    author: "Rajesh Kumar",
    date: "January 12, 2024",
    readTime: "8 min read",
    views: 1876,
    category: "Business Tips",
    image: bizGym,
    content: `
Ludhiana offers incredible opportunities for entrepreneurs. As Punjab's largest industrial city, it has a thriving ecosystem for businesses of all sizes.

## Why Start a Business in Ludhiana?

Ludhiana is known as the Manchester of India for its textile and hosiery industry. The city has excellent infrastructure, a skilled workforce, and strong market connections.

## Key Steps to Start

1. **Register your business** with the local authorities
2. **Choose the right location** — Focal Point for manufacturing, Model Town for retail
3. **Get necessary licenses** from the Municipal Corporation
4. **Open a business bank account**
5. **Register on Shehar Ludhiana** to reach local customers!

## Financial Support

Several banks and government schemes support new businesses in Ludhiana, including MUDRA loans and Punjab State Industrial Development Corporation (PSIDC) schemes.
    `,
  },
};

const defaultBlog = blogData["10-best-street-food-places-in-ludhiana"];

const relatedBlogs = [
  { title: "Hidden Shopping Gems in Model Town", image: bizMall, author: "Anita Singh", slug: "hidden-shopping-gems" },
  { title: "Healthcare Revolution in Ludhiana", image: bizGym, author: "Dr. Meera Patel", slug: "healthcare-revolution" },
];

const BlogDetail = () => {
  const { slug } = useParams();
  const blog = blogData[slug || ""] || defaultBlog;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-4">
        <Link to="/blogs" className="text-primary font-medium flex items-center gap-1 text-sm hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>
      </div>

      <div className="container pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          <article className="flex-1">
            <span className="text-xs px-3 py-1 rounded-full bg-primary text-primary-foreground font-medium">{blog.category}</span>
            <h1 className="text-3xl font-bold text-foreground mt-4">{blog.title}</h1>
            <p className="text-muted-foreground mt-2">{blog.excerpt}</p>

            <div className="flex items-center gap-4 mt-4 pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-semibold text-foreground text-sm">
                  {blog.author.charAt(0)}
                </div>
                <span className="text-sm font-medium text-foreground">{blog.author}</span>
              </div>
              <span className="text-sm text-muted-foreground flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {blog.date}</span>
              <span className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {blog.readTime}</span>
              <span className="text-sm text-muted-foreground flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {blog.views.toLocaleString()} views</span>
            </div>

            <img src={blog.image} alt={blog.title} className="w-full h-64 md:h-80 object-cover rounded-xl mt-6" />

            <div className="prose prose-sm max-w-none mt-6 text-muted-foreground [&_h2]:text-foreground [&_h2]:font-bold [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-3 [&_strong]:text-foreground [&_li]:ml-4">
              {blog.content.split('\n').map((line: string, i: number) => {
                if (line.startsWith('## ')) return <h2 key={i}>{line.replace('## ', '')}</h2>;
                if (line.startsWith('**') && line.endsWith('**')) return <p key={i}><strong>{line.replace(/\*\*/g, '')}</strong></p>;
                if (line.startsWith('- ')) return <li key={i}>{line.replace('- ', '')}</li>;
                if (line.match(/^\d+\./)) return <li key={i}>{line.replace(/^\d+\.\s/, '')}</li>;
                if (line.trim()) return <p key={i} className="my-2">{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>;
                return null;
              })}
            </div>

            <div className="flex items-center gap-3 mt-8 pt-4 border-t border-border">
              <span className="text-sm font-medium text-foreground">Share:</span>
              {[Facebook, Twitter, Share2, LinkIcon].map((Icon, i) => (
                <button key={i} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </article>

          <aside className="w-full lg:w-72 shrink-0 space-y-6">
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-bold text-foreground mb-4">Related Articles</h3>
              <div className="space-y-4">
                {relatedBlogs.map((b) => (
                  <div key={b.title} className="flex gap-3 cursor-pointer group">
                    <img src={b.image} alt={b.title} className="w-16 h-16 rounded-lg object-cover shrink-0" loading="lazy" />
                    <div>
                      <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">{b.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">By {b.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-accent rounded-xl border border-border p-5">
              <h3 className="font-bold text-foreground mb-2">Write Your Story</h3>
              <p className="text-sm text-muted-foreground mb-3">Share your Ludhiana experience and earn coins!</p>
              <Link to="/write-blog">
                <Button className="w-full">Start Writing</Button>
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetail;
