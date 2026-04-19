import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Category {
  label: string;
  tag: string;
  gradient: string;
  href: string;
}

interface Collection {
  title: string;
  subtitle: string;
  badge?: string;
  gradient: string;
  href: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  currentSlide = 0;

  heroSlides = [
    {
      tag: 'New Collection — Spring 2026',
      heading: 'Dress Your Best\nEvery Day',
      sub: 'Discover premium fashion that blends timeless elegance with modern style.',
      cta: 'Shop Now',
      ctaLink: '/products',
      gradient: 'linear-gradient(135deg, #1a0e05 0%, #2d1b0e 45%, #1a1a2e 100%)'
    },
    {
      tag: 'Women\'s Edit',
      heading: 'Effortless\nFemininity',
      sub: 'A curated edit of our finest women\'s wear for every occasion.',
      cta: 'Explore Women',
      ctaLink: '/products',
      gradient: 'linear-gradient(135deg, #1a0a1a 0%, #2d0d2d 45%, #0a1a2e 100%)'
    },
    {
      tag: 'Men\'s Essentials',
      heading: 'Sharp. Clean.\nConfident.',
      sub: 'Elevate your wardrobe with our modern men\'s collection.',
      cta: 'Shop Men',
      ctaLink: '/products',
      gradient: 'linear-gradient(135deg, #0a1e0a 0%, #0d2d1a 45%, #1a1a0a 100%)'
    }
  ];

  categories: Category[] = [
    {
      label: 'Women',
      tag: 'New Season',
      gradient: 'linear-gradient(145deg, #f5e6d3 0%, #e8c5a0 60%, #d4a57a 100%)',
      href: '/products'
    },
    {
      label: 'Men',
      tag: 'Essentials',
      gradient: 'linear-gradient(145deg, #1e2d3d 0%, #2e4a6b 60%, #3d6a9e 100%)',
      href: '/products'
    },
    {
      label: 'Kids',
      tag: 'New Arrivals',
      gradient: 'linear-gradient(145deg, #fff0e6 0%, #ffcba4 60%, #f7a878 100%)',
      href: '/products'
    },
    {
      label: 'Accessories',
      tag: 'Must Haves',
      gradient: 'linear-gradient(145deg, #e8f4f8 0%, #b8dce8 60%, #8bb8d4 100%)',
      href: '/products'
    }
  ];

  collections: Collection[] = [
    {
      title: 'Summer Soiree',
      subtitle: 'Light fabrics, breezy cuts',
      badge: 'Trending',
      gradient: 'linear-gradient(160deg, #1a1a1a 0%, #c8a96e 100%)',
      href: '/collections'
    },
    {
      title: 'Monochrome Magic',
      subtitle: 'Timeless black & white',
      gradient: 'linear-gradient(160deg, #2c2c2c 0%, #888 100%)',
      href: '/collections'
    },
    {
      title: 'Boho Bliss',
      subtitle: 'Free-spirited & earthy',
      badge: 'New',
      gradient: 'linear-gradient(160deg, #3d2b1f 0%, #c8956e 100%)',
      href: '/collections'
    }
  ];

  values = [
    { icon: 'shipping', label: 'Free Shipping', desc: 'On orders above \u20b9999' },
    { icon: 'returns', label: 'Easy Returns', desc: '30-day hassle-free returns' },
    { icon: 'quality', label: 'Premium Quality', desc: 'Handpicked by our curators' },
    { icon: 'secure', label: 'Secure Payment', desc: '100% safe & encrypted' }
  ];

  setSlide(index: number): void {
    this.currentSlide = index;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.heroSlides.length) % this.heroSlides.length;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length;
  }
}