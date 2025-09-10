#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const DOMAIN = 'https://xn--husbilskparnasyd-twb.se';
const OUTPUT_PATH = path.join(__dirname, '../client/public/sitemap.xml');
const BLOG_DATA_PATH = path.join(__dirname, '../client/public/blog-data');

// Static pages with their priorities and change frequencies
const staticPages = [
  {
    url: '/',
    lastmod: '2025-08-08',
    changefreq: 'monthly',
    priority: '1.0'
  },
  {
    url: '/quote',
    lastmod: '2025-08-08', 
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    url: '/blog',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: '/integritetspolicy',
    lastmod: '2025-08-08',
    changefreq: 'yearly', 
    priority: '0.3'
  }
];

function formatDate(dateString) {
  return new Date(dateString).toISOString().split('T')[0];
}

function generateSitemapXML(urls) {
  const urlEntries = urls.map(page => `  <url>
    <loc>${DOMAIN}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

function loadBlogPosts() {
  try {
    const postsFile = path.join(BLOG_DATA_PATH, 'posts.json');
    
    if (!fs.existsSync(postsFile)) {
      console.log('No blog posts found, generating sitemap with static pages only');
      return [];
    }

    const postsData = JSON.parse(fs.readFileSync(postsFile, 'utf8'));
    
    if (!postsData.posts || !Array.isArray(postsData.posts)) {
      console.log('Invalid blog posts structure, using static pages only');
      return [];
    }

    return postsData.posts
      .filter(post => post.published) // Only include published posts
      .map(post => ({
        url: `/blog/${post.slug}`,
        lastmod: formatDate(post.publishedAt),
        changefreq: 'monthly',
        priority: post.featured ? '0.7' : '0.6'
      }));

  } catch (error) {
    console.warn('Error loading blog posts:', error.message);
    return [];
  }
}

function generateSitemap() {
  console.log('🔄 Generating sitemap...');
  
  // Load blog posts
  const blogPages = loadBlogPosts();
  
  // Combine static pages and blog pages
  const allPages = [...staticPages, ...blogPages];
  
  // Generate XML
  const sitemapXML = generateSitemapXML(allPages);
  
  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write sitemap
  fs.writeFileSync(OUTPUT_PATH, sitemapXML, 'utf8');
  
  console.log(`✅ Sitemap generated successfully!`);
  console.log(`📍 Location: ${OUTPUT_PATH}`);
  console.log(`📄 Pages included:`);
  console.log(`   • ${staticPages.length} static pages`);
  console.log(`   • ${blogPages.length} blog posts`);
  console.log(`   • ${allPages.length} total URLs`);
  
  if (blogPages.length > 0) {
    console.log(`📝 Blog posts:`);
    blogPages.forEach(page => {
      console.log(`   • ${page.url}`);
    });
  }
}

// Run the generator
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}

export { generateSitemap };