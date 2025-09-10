import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, ArrowLeft, ArrowRight } from "lucide-react";

// SEO Meta component
function SEOHead({ post }: { post: BlogPost }) {
  useEffect(() => {
    // Update document title and meta tags
    document.title = `${post.title} | Husbilsköparna Syd`;
    
    // Update or create meta description
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', post.metaDescription || post.excerpt);
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }

    // Add Open Graph meta tags
    const ogTags = [
      { property: 'og:title', content: post.title },
      { property: 'og:description', content: post.metaDescription || post.excerpt },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: `https://husbilskoparnayd.se/blog/${post.slug}` },
      { property: 'og:image', content: post.imageUrl ? `https://husbilskoparnayd.se${post.imageUrl}` : '' },
      { property: 'og:site_name', content: 'Husbilsköparna Syd' },
      { property: 'article:author', content: post.author },
      { property: 'article:published_time', content: post.publishedAt },
      { property: 'article:section', content: 'Husbil' },
    ];

    ogTags.forEach(({ property, content }) => {
      if (content) {
        let metaTag = document.querySelector(`meta[property="${property}"]`) || document.createElement('meta');
        metaTag.setAttribute('property', property);
        metaTag.setAttribute('content', content);
        if (!document.querySelector(`meta[property="${property}"]`)) {
          document.head.appendChild(metaTag);
        }
      }
    });

    // Add Twitter Card meta tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: post.title },
      { name: 'twitter:description', content: post.metaDescription || post.excerpt },
      { name: 'twitter:image', content: post.imageUrl ? `https://husbilskoparnayd.se${post.imageUrl}` : '' },
    ];

    twitterTags.forEach(({ name, content }) => {
      if (content) {
        let metaTag = document.querySelector(`meta[name="${name}"]`) || document.createElement('meta');
        metaTag.setAttribute('name', name);
        metaTag.setAttribute('content', content);
        if (!document.querySelector(`meta[name="${name}"]`)) {
          document.head.appendChild(metaTag);
        }
      }
    });

    // Add JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.metaDescription || post.excerpt,
      "image": post.imageUrl ? `https://husbilskoparnayd.se${post.imageUrl}` : undefined,
      "author": {
        "@type": "Organization",
        "name": post.author,
        "url": "https://husbilskoparnayd.se"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Husbilsköparna Syd",
        "url": "https://husbilskoparnayd.se",
        "logo": {
          "@type": "ImageObject",
          "url": "https://husbilskoparnayd.se/husbilskoparna-logo-green-black.png"
        }
      },
      "datePublished": post.publishedAt,
      "dateModified": post.publishedAt,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://husbilskoparnayd.se/blog/${post.slug}`
      },
      "url": `https://husbilskoparnayd.se/blog/${post.slug}`,
      "wordCount": post.content.split(' ').length,
      "keywords": post.tags?.join(', '),
      "inLanguage": "sv-SE",
      "about": {
        "@type": "Thing",
        "name": "Husbil",
        "description": "Motorhome sales and buying guide"
      }
    };

    // Remove existing structured data script
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Add canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', `https://husbilskoparnayd.se/blog/${post.slug}`);
    if (!document.querySelector('link[rel="canonical"]')) {
      document.head.appendChild(canonicalLink);
    }

    // Cleanup function to reset on unmount
    return () => {
      document.title = 'Husbilsköparna Syd - Vi köper din husbil';
    };
  }, [post]);

  return null;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  imageUrl?: string;
  metaDescription?: string;
  tags?: string[];
}

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (params?.slug) {
      fetch(`/blog-data/${params.slug}.json`)
        .then(res => {
          if (!res.ok) {
            setNotFound(true);
            return null;
          }
          return res.json();
        })
        .then(data => {
          if (data) {
            setPost(data.post);
          }
          setLoading(false);
        })
        .catch(() => {
          setNotFound(true);
          setLoading(false);
        });
    }
  }, [params?.slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const renderContent = (content: string) => {
    // Basic markdown-like rendering for the blog content
    return content
      .replace(/#{1,6}\s(.+)/g, (match, text) => {
        const level = match.match(/#{1,6}/)?.[0].length || 1;
        return `<h${level} class="text-${4-level}xl font-bold text-gray-900 mb-4 mt-8">${text}</h${level}>`;
      })
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[#49B265] hover:underline">$1</a>')
      .split('\n\n')
      .map(paragraph => {
        if (paragraph.startsWith('<h')) return paragraph;
        if (paragraph.startsWith('|')) {
          // Simple table rendering
          const rows = paragraph.split('\n');
          return `<div class="overflow-x-auto my-6">
            <table class="min-w-full border-collapse border border-gray-300">
              ${rows.map((row, index) => {
                const cells = row.split('|').slice(1, -1);
                const tag = index === 0 ? 'th' : 'td';
                const className = index === 0 ? 'bg-gray-50 font-semibold' : '';
                return `<tr class="${className}">
                  ${cells.map(cell => `<${tag} class="border border-gray-300 px-4 py-2 text-left">${cell.trim()}</${tag}>`).join('')}
                </tr>`;
              }).join('')}
            </table>
          </div>`;
        }
        return `<p class="text-gray-700 leading-relaxed mb-6">${paragraph}</p>`;
      })
      .join('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#49B265] mx-auto"></div>
          <p className="mt-4 text-gray-600">Laddar artikel...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Artikel hittades inte</h1>
          <p className="text-gray-600 mb-8">Den artikel du letar efter finns inte längre.</p>
          <Link href="/blog">
            <Button className="bg-[#49B265] hover:bg-[#3a8f4f]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tillbaka till bloggen
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {post && <SEOHead post={post} />}
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back to Blog */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 text-[#49B265] hover:text-[#3a8f4f]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tillbaka till bloggen
          </Button>
        </Link>

        <article className="max-w-4xl mx-auto">
          {/* Hero Image - SEO Optimized with responsive loading */}
          {post.imageUrl && (
            <figure className="aspect-video overflow-hidden rounded-lg mb-8">
              <picture>
                <source 
                  media="(max-width: 480px)" 
                  srcSet="/blog-images/Swedish_motorhome_lake_scene_small.jpg"
                />
                <source 
                  media="(max-width: 768px)" 
                  srcSet="/blog-images/Swedish_motorhome_lake_scene_medium.jpg"
                />
                <img
                  src={post.imageUrl}
                  alt="Svensk husbil parkerad vid en pittoresk sjö med berg i bakgrunden - representerar beslutsögonblicket om att sälja sin husbil"
                  className="w-full h-full object-cover"
                  loading="eager"
                  width="1200"
                  height="675"
                />
              </picture>
              <figcaption className="sr-only">
                Husbil vid svensk sjö - illustration till artikel om när det är dags att sälja sin husbil
              </figcaption>
            </figure>
          )}

          {/* Article Header */}
          <header className="mb-8">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-[#49B265]/10 text-[#49B265]"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center text-gray-500 space-x-6 mb-6">
              <div className="flex items-center">
                <CalendarDays className="w-5 h-5 mr-2" />
                Publicerad {formatDate(post.publishedAt)}
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {post.readingTime} min läsning
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
          />

          {/* Call to Action */}
          <div className="bg-[#49B265]/5 rounded-lg p-8 mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Redo att sälja din husbil?
            </h3>
            <p className="text-gray-600 mb-6">
              Vi köper husbilar i alla skick direkt och betalar inom 24 timmar.
            </p>
            <div className="space-x-4">
              <Link href="/quote">
                <Button className="bg-[#49B265] hover:bg-[#3a8f4f]">
                  Få erbjudande nu
                </Button>
              </Link>
              <Link href="/quote">
                <Button variant="outline" className="border-[#49B265] text-[#49B265] hover:bg-[#49B265] hover:text-white">
                  Värdera först
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}