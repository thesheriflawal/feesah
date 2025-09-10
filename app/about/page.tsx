"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Store, Heart, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function AboutPage() {
  // Image data for the swiper
  const founderImages = [
    {
      src: "/feesah-1.jpg",
      alt: "Fee Sah - Founder of Feesah Collections",
    },
    {
      src: "/feesah-2.jpg",
      alt: "Fee Sah - OAU Student and Entrepreneur",
    },
    {
      src: "/feesah-3.jpg",
      alt: "Fee Sah - Building her Business",
    },
    {
      src: "/feesah-4.jpg",
      alt: "Fee Sah - Success Story",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Meet Fee Sah
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            The inspiring story of a dedicated OAU student who built a thriving
            business empire
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image Swiper Section */}
          <div className="animate-slide-in-left">
            <Card className="overflow-hidden hover-lift">
              <CardContent className="p-0">
                <div className="relative h-96 bg-gradient-to-br from-primary/20 to-secondary/20">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                      delay: 4000,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      clickable: true,
                      bulletClass: "swiper-pagination-bullet",
                      bulletActiveClass: "swiper-pagination-bullet-active",
                    }}
                    navigation={true}
                    className="w-full h-full founder-swiper"
                  >
                    {founderImages.map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <div className="relative w-full h-full max-w-md">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="rounded-lg object-contain"
                              priority={index === 0}
                              sizes="(max-width: 768px) 100vw, 400px"
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </CardContent>
            </Card>
          </div>

          <div
            className="space-y-6 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <Badge variant="secondary" className="px-4 py-2">
                <GraduationCap className="w-4 h-4 mr-2" />
                OAU Student
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                <Store className="w-4 h-4 mr-2" />
                Entrepreneur
              </Badge>
            </div>

            <h2 className="text-3xl font-bold text-foreground">
              Nafisat Alamu (Fee Sah)
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Fee Sah is a remarkable young entrepreneur and student at Obafemi
              Awolowo University (OAU). Balancing her academic pursuits with her
              passion for business, she has successfully built Feesah
              Collections into a trusted name in quality lifestyle products.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Heart className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To provide high-quality, affordable lifestyle products that
                    enhance everyday living while building lasting relationships
                    with our customers.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Star className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To become Nigeria's leading online destination for
                    electronics, home essentials, beauty products, and
                    accessories, known for exceptional quality and customer
                    service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: "500+", label: "Happy Customers" },
            { number: "200+", label: "Products Sold" },
            { number: "50+", label: "Product Categories" },
            { number: "100%", label: "Customer Satisfaction" },
          ].map((stat, index) => (
            <Card
              key={index}
              className="text-center p-6 hover-lift animate-fade-in-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <Card
          className="p-8 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <CardContent className="p-0">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4">
                What started as a small venture to support her education has
                grown into a thriving business that serves customers across
                Nigeria. Fee Sah's journey began with a simple belief: everyone
                deserves access to quality products at fair prices.
              </p>
              <p className="mb-4">
                As a student at OAU, Fee Sah understands the needs of young
                people and families. This insight drives her careful selection
                of products that combine functionality, style, and
                affordability. From the latest electronics to essential home
                items, every product in our collection is chosen with our
                customers' needs in mind.
              </p>
              <p>
                Today, Feesah Collections continues to grow, powered by Fee
                Sah's dedication to excellence and her commitment to providing
                exceptional customer service. We're not just a business – we're
                a community of people who believe in quality, integrity, and the
                power of dreams.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom CSS for Swiper styling */}
      <style jsx global>{`
        .founder-swiper .swiper-pagination {
          bottom: 10px;
        }

        .founder-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }

        .founder-swiper .swiper-pagination-bullet-active {
          background: white;
        }

        .founder-swiper .swiper-button-next,
        .founder-swiper .swiper-button-prev {
          color: white;
          background: rgba(0, 0, 0, 0.5);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-top: -20px;
        }

        .founder-swiper .swiper-button-next:after,
        .founder-swiper .swiper-button-prev:after {
          font-size: 16px;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
