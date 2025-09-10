import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, ArrowLeft, ArrowRight } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
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
      fetch(`/api/blog/posts/${params.slug}`)
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
          {/* Hero Image */}
          {post.imageUrl && (
            <div className="aspect-video overflow-hidden rounded-lg mb-8">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
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