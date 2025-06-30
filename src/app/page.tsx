"use client";

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  UserPlus,
  Search,
  Award,
  FilePlus2,
  Users,
  CheckCircle2,
  Star,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from '@/components/ThemeToggle';
import { AnimateOnScroll } from '@/components/animations/AnimateOnScroll';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, useScroll, useTransform } from 'framer-motion';
import TrueFocus from './TrueFocus';
import ScrollReveal from './ScrollReveal';
import TestimonialCarousel from "@/app/TestimonialCarousel";
import SectionScrollbar from "./SectionScrollbar";


export default function Home() {
  const services = [
    { name: "Real Estate", image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { name: "Inspection", image: "https://images.pexels.com/photos/32252618/pexels-photo-32252618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { name: "Agriculture", image: "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { name: "Cinematography", image: "https://images.pexels.com/photos/16634691/pexels-photo-16634691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { name: "Event Coverage", image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { name: "Surveying & Mapping", image: "https://images.pexels.com/photos/3861803/pexels-photo-3861803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  ];

  // Parallax effect for hero section and testimonials
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 400], [0, 100]);
  const y2 = useTransform(scrollY, [0, 400], [0, 50]);
  
  // Create a ref for the testimonials section
  const testimonialsRef = useRef<HTMLElement>(null);
  
  // Get scroll progress specifically for the testimonials section
  const { scrollYProgress: testimonialsProgress } = useScroll({
    target: testimonialsRef,
    offset: ["start end", "end start"]
  });
  
  // Create parallax effect with more dramatic movement
  const testimonialsY = useTransform(testimonialsProgress, [0, 1], [200, -200]);
  const testimonialsScale = useTransform(testimonialsProgress, [0, 0.5, 1], [1.2, 1.1, 1]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Image
              src="/avian-logo-white.png"
              alt="Avian Logo"
              width={64}
              height={64}
              className="h-12 w-12"
              style={{ filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(180deg)' }}
              priority
            />
            <span className="font-headline">Avian Pilot Portal</span>
          </Link>
          <nav className="flex items-center gap-2">
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Pilot Portal</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                   <Link href="/login">Log In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register">Register</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button asChild style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
                    <span>Client Portal</span>
                 </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/client/login">Log In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/client/register">Register</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Parallax Hero Section with Animated Gradient Background */}
        <section className="relative w-full h-[60vh] flex items-center justify-center text-center text-white overflow-hidden">
          {/* Animated Gradient Background */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0 animate-gradient bg-gradient-to-tr from-blue-800 via-purple-700 to-pink-500 opacity-80"
            style={{ backgroundSize: '200% 200%', animation: 'gradientMove 10s ease-in-out infinite' }}
          />
          {/* Parallax Video */}
          <motion.video
            style={{ y: y1 }}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-60"
            src="https://videos.pexels.com/video-files/3688509/3688509-hd.mp4"
          >
            Your browser does not support the video tag.
          </motion.video>
          {/* Parallax Overlay */}
          <motion.div
            style={{ y: y2 }}
            className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"
          ></motion.div>
          {/* Animated SVG Shapes */}
          <svg className="absolute left-0 top-0 w-full h-full z-10 pointer-events-none" width="100%" height="100%" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M0,160L80,170.7C160,181,320,203,480,197.3C640,192,800,160,960,133.3C1120,107,1280,85,1360,74.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
              fill="#fff"
              fillOpacity="0.05"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </svg>
          <div className="relative z-20 container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col justify-center space-y-4"
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Your Marketplace for Professional Drone Services
                </h1>
                <p className="max-w-[600px] text-gray-200 md:text-xl mx-auto">
                  Whether you're a certified pilot looking for opportunities or a client needing aerial services, you're in the right place.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Button size="lg" asChild>
                  <Link href="/register">
                    Become a Pilot Today
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/client/register">
                    Hire a Pilot
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section with Animated Background */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          {/* Animated Blobs Background */}
          <motion.div
            aria-hidden
            className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-purple-400 opacity-20 blur-3xl animate-blob"
            animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
            transition={{ duration: 12, repeat: Infinity, repeatType: 'loop' }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-pink-400 opacity-20 blur-3xl animate-blob"
            animate={{ x: [0, -40, 0], y: [0, -40, 0] }}
            transition={{ duration: 14, repeat: Infinity, repeatType: 'loop' }}
          />
          <AnimateOnScroll className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <ScrollReveal
                  baseOpacity={0}
                  enableBlur={true}
                  baseRotation={5}
                  blurStrength={10}
                >
                  The Complete Drone Service Platform
                </ScrollReveal>
                <ScrollReveal
                  baseOpacity={0}
                  enableBlur={true}
                  baseRotation={5}
                  blurStrength={10}
                  textClassName="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[900px] mx-auto"
                >
                  We provide the tools and platform to elevate your drone piloting career and to find the perfect professional for your project.
                </ScrollReveal>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl items-stretch gap-8 py-12 lg:grid-cols-2">
              {/* For Pilots */}
              <div className="flex flex-col gap-6">
                <h3 className="text-2xl font-bold mb-2 text-primary">For Pilots</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                  >
                    <Card className="overflow-hidden flex flex-col">
                      <CardHeader>
                        <CardTitle className="text-lg">Verified Professionals</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">
                          All pilots undergo a verification process, ensuring a high standard of quality and safety for all projects.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  >
                    <Card className="overflow-hidden flex flex-col">
                      <CardHeader>
                        <CardTitle className="text-lg">Showcase Your Gear</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">
                          Pilots detail their drone fleet, from models and specs to payload capabilities, attracting the right clients.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    <Card className="overflow-hidden flex flex-col">
                      <CardHeader>
                        <CardTitle className="text-lg">Browse Jobs</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">
                          Explore a wide range of job postings from clients across various industries.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                  >
                    <Card className="overflow-hidden flex flex-col">
                      <CardHeader>
                        <CardTitle className="text-lg">Get Hired</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">
                          Apply for jobs, communicate with clients, and land your next aerial project.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
              {/* For Clients */}
              <div className="flex flex-col gap-6">
                <h3 className="text-2xl font-bold mb-2 text-accent">For Clients</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                  >
                    <Card className="overflow-hidden flex flex-col">
                      <CardHeader>
                        <CardTitle className="text-lg">Post Jobs Easily</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">
                          Clients can quickly post job requirements and connect with a network of skilled pilots ready for the mission.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  >
                    <Card className="overflow-hidden flex flex-col">
                      <CardHeader>
                        <CardTitle className="text-lg">Find Verified Pilots</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">
                          Access a pool of certified and experienced drone pilots for your project needs.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    <Card className="overflow-hidden flex flex-col">
                      <CardHeader>
                        <CardTitle className="text-lg">Review Portfolios</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">
                          Browse pilot profiles, portfolios, and previous work to find the perfect match.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                  >
                    <Card className="overflow-hidden flex flex-col">
                      <CardHeader>
                        <CardTitle className="text-lg">Seamless Communication</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">
                          Communicate directly with pilots, manage projects, and ensure successful outcomes.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </section>

        {/* Services Section with Animation */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <AnimateOnScroll className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Services</div>
                <TrueFocus 
                  sentence="Solutions for Every Industry"
                  manualMode={true}
                  blurAmount={5}
                  borderColor="red"
                  animationDuration={1}
                  pauseBetweenAnimations={1}
                />
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From stunning aerial cinematography to precise industrial inspections, our pilots have the expertise you need.
                </p>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href="#" className="relative block group overflow-hidden rounded-lg shadow-lg h-80">
                    <Image src={service.image} alt={service.name} fill={true} style={{objectFit: 'cover'}} className="transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="relative h-full flex flex-col justify-end p-6">
                      <h3 className="text-2xl font-bold text-white">{service.name}</h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimateOnScroll>
        </section>

        <section ref={testimonialsRef} id="testimonials" className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
          {/* Primary Parallax Background */}
          <motion.div
            style={{ 
              y: testimonialsY,
              scale: testimonialsScale,
              willChange: 'transform'
            }}
            className="absolute -inset-32 z-0"
          >
            <Image
              src="https://images.pexels.com/photos/220444/pexels-photo-220444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Testimonials Background"
              fill
              style={{ objectFit: 'cover' }}
              className="opacity-70"
              priority={false}
            />
          </motion.div>
          
          {/* Secondary Layer for Enhanced Parallax */}
          <motion.div
            style={{ 
              y: useTransform(testimonialsProgress, [0, 1], [100, -100]),
              willChange: 'transform'
            }}
            className="absolute inset-0 z-5"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-sky-500/20 via-transparent to-blue-600/20"></div>
          </motion.div>
          
          {/* Animated Overlay */}
          <motion.div 
            style={{
              opacity: useTransform(testimonialsProgress, [0, 0.3, 0.7, 1], [0.8, 0.5, 0.5, 0.8])
            }}
            className="absolute inset-0 bg-background/80 z-10"
          ></motion.div>
          
          <AnimateOnScroll className="relative z-20 container px-4 md:px-6">
            {/* Floating Elements for Enhanced Parallax */}
            <motion.div 
              style={{
                y: useTransform(testimonialsProgress, [0, 1], [50, -150]),
                opacity: useTransform(testimonialsProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
              }}
              className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-sm"
            ></motion.div>
            <motion.div 
              style={{
                y: useTransform(testimonialsProgress, [0, 1], [-30, 120]),
                opacity: useTransform(testimonialsProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
              }}
              className="absolute top-32 right-20 w-32 h-32 bg-blue-400/10 rounded-full blur-md"
            ></motion.div>
            <motion.div 
              style={{
                y: useTransform(testimonialsProgress, [0, 1], [80, -80]),
                opacity: useTransform(testimonialsProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
              }}
              className="absolute bottom-20 left-1/3 w-16 h-16 bg-sky-300/10 rounded-full blur-sm"
            ></motion.div>
            
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Trusted by Industry Leaders</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear what our clients and pilots have to say about their experience on our platform.
                </p>
            </div>
            <div className="mx-auto max-w-5xl py-12 flex items-center justify-center">
              <TestimonialCarousel />
            </div>
          </AnimateOnScroll>
        </section>

         <section id="ready" className="w-full py-12 md:py-24 lg:py-32">
          <AnimateOnScroll className="container flex flex-col items-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Ready to Take Flight?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Whether you're looking to hire or looking for work, join our community today and unlock new opportunities in the world of drone services.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/register">Register as a Pilot</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/client/register">Post a Job as a Client</Link>
              </Button>
            </div>
          </AnimateOnScroll>
        </section>
      </main>

      <SectionScrollbar />

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Avian Pilot Portal. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

// Add this to your global CSS (e.g., globals.css):
// @keyframes gradientMove {
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// }
// .animate-gradient { animation: gradientMove 10s ease-in-out infinite; }
// .animate-blob { animation: blobMove 20s infinite alternate; }
// @keyframes blobMove {
//   0% { transform: scale(1) translate(0, 0); }
//   100% { transform: scale(1.1) translate(30px, 30px); }
// }
