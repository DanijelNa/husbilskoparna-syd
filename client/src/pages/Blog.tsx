import { useState, useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";

// SEO optimization for blog listing page
function BlogSEOHead() {
  useEffect(() => {
    document.title = 'Husbilsbloggen - Expertråd om Husbilar | Husbilsköparna Syd';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', 'Läs expertråd om husbilar - från köp och försäljning till underhåll och äventyr. Tips som hjälper dig ta rätt beslut om din husbil.');
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }

    // Add structured data for blog listing
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Husbilsbloggen - Husbilsköparna Syd",
      "description": "Expertråd och tips om husbilar från Husbilsköparna Syd",
      "url": "https://husbilskoparnayd.se/blog",
      "inLanguage": "sv-SE",
      "publisher": {
        "@type": "Organization",
        "name": "Husbilsköparna Syd",
        "url": "https://husbilskoparnayd.se"
      }
    };

    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.title = 'Husbilsköparna Syd - Vi köper din husbil';
    };
  }, []);

  return null;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  imageUrl?: string;
  tags?: string[];
  featured: boolean;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/blog-data/posts.json')
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <BlogSEOHead />
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        {/* Header - SEO optimized with semantic HTML */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Husbilsbloggen
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tips, råd och expertkunskap om husbilar - från köp och försäljning till underhåll och äventyr.
          </p>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#49B265] mx-auto"></div>
            <p className="mt-4 text-gray-600">Laddar artiklar...</p>
          </div>
        )}

        {/* Blog Posts Grid - SEO optimized */}
        {!loading && (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="main">
            {posts.map((post) => (
              <article key={post.id}>
                <Link href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                    {/* Featured Image - SEO optimized */}
                    {post.imageUrl && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={post.imageUrl}
                          alt={`Bild för artikel: ${post.title}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          width="400"
                          height="225"
                        />
                      </div>
                    )}
                  
                  <CardHeader className="pb-3">
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs bg-[#49B265]/10 text-[#49B265] hover:bg-[#49B265]/20"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Title - SEO optimized heading */}
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#49B265] transition-colors">
                      {post.title}
                    </h2>

                    {/* Meta Info */}
                    <div className="flex items-center text-sm text-gray-500 space-x-4 mb-3">
                      <div className="flex items-center">
                        <CalendarDays className="w-4 h-4 mr-1" />
                        {formatDate(post.publishedAt)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readingTime} min
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center text-[#49B265] font-medium group-hover:text-[#3a8f4f] transition-colors">
                      <span>Läs mer</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                  </Card>
                </Link>
              </article>
            ))}
          </section>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Inga artiklar hittades
            </h3>
            <p className="text-gray-600">
              Nya artiklar kommer snart!
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}