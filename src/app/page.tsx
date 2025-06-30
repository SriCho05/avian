import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PlaneTakeoff,
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


export default function Home() {
  const services = [
    { name: "Real Estate", image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { name: "Inspection", image: "https://images.pexels.com/photos/17528340/pexels-photo-17528340/free-photo-of-drone-flying-over-solar-panels.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { name: "Agriculture", image: "https://images.pexels.com/photos/4175066/pexels-photo-4175066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { name: "Cinematography", image: "https://images.pexels.com/photos/8996614/pexels-photo-8996614.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { name: "Event Coverage", image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { name: "Surveying & Mapping", image: "https://images.pexels.com/photos/5907604/pexels-photo-5907604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <PlaneTakeoff className="h-8 w-8 text-primary" />
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
        <section className="relative w-full h-[60vh] flex items-center justify-center text-center text-white overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            src="https://videos.pexels.com/video-files/3688509/3688509-hd.mp4"
          >
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
          <div className="relative z-20 container px-4 md:px-6">
            <div className="flex flex-col justify-center space-y-4">
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
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <AnimateOnScroll className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">The Complete Drone Service Platform</h2>
                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We provide the tools and platform to elevate your drone piloting career and to find the perfect professional for your project.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-stretch gap-8 py-12 lg:grid-cols-3">
              <Card className="overflow-hidden flex flex-col">
                <Image src="https://images.pexels.com/photos/8885073/pexels-photo-8885073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Verified Professionals" width={600} height={400} className="w-full h-48 object-cover" />
                <CardHeader>
                  <CardTitle className="text-xl">Verified Professionals</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">
                    All pilots undergo a verification process, ensuring a high standard of quality and safety for all projects.
                  </p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden flex flex-col">
                <Image src="https://images.pexels.com/photos/3945659/pexels-photo-3945659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Showcase Your Gear" width={600} height={400} className="w-full h-48 object-cover" />
                <CardHeader>
                  <CardTitle className="text-xl">Showcase Your Gear</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">
                    Pilots detail their drone fleet, from models and specs to payload capabilities, attracting the right clients.
                  </p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden flex flex-col">
                <Image src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Post Jobs Easily" width={600} height={400} className="w-full h-48 object-cover" />
                <CardHeader>
                  <CardTitle className="text-xl">Post Jobs Easily</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">
                    Clients can quickly post job requirements and connect with a network of skilled pilots ready for the mission.
                  </p>
                </CardContent>
              </Card>
            </div>
          </AnimateOnScroll>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <AnimateOnScroll className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">How It Works</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Simple Steps to Success</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connecting clients with expert pilots has never been easier. Follow our straightforward process to get started.
                </p>
              </div>
              <Tabs defaultValue="pilots" className="w-full max-w-3xl pt-12">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="pilots">For Pilots</TabsTrigger>
                  <TabsTrigger value="clients">For Clients</TabsTrigger>
                </TabsList>
                <TabsContent value="pilots">
                  <div className="grid md:grid-cols-3 gap-8 pt-8">
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="bg-primary/10 p-4 rounded-full"><UserPlus className="w-10 h-10 text-primary" /></div>
                      <h3 className="font-bold text-lg">1. Create Profile</h3>
                      <p className="text-sm text-muted-foreground">Sign up and build a comprehensive profile showcasing your skills, equipment, and experience.</p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="bg-primary/10 p-4 rounded-full"><Search className="w-10 h-10 text-primary" /></div>
                      <h3 className="font-bold text-lg">2. Browse Jobs</h3>
                      <p className="text-sm text-muted-foreground">Explore a wide range of job postings from clients across various industries.</p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="bg-primary/10 p-4 rounded-full"><Award className="w-10 h-10 text-primary" /></div>
                      <h3 className="font-bold text-lg">3. Get Hired</h3>
                      <p className="text-sm text-muted-foreground">Apply for jobs, communicate with clients, and land your next aerial project.</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="clients">
                  <div className="grid md:grid-cols-3 gap-8 pt-8">
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="bg-primary/10 p-4 rounded-full"><FilePlus2 className="w-10 h-10 text-primary" /></div>
                      <h3 className="font-bold text-lg">1. Post a Job</h3>
                      <p className="text-sm text-muted-foreground">Create a detailed job posting with your project requirements, location, and budget.</p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="bg-primary/10 p-4 rounded-full"><Users className="w-10 h-10 text-primary" /></div>
                      <h3 className="font-bold text-lg">2. Find Pilots</h3>
                      <p className="text-sm text-muted-foreground">Receive applications from our network of verified and skilled drone pilots.</p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="bg-primary/10 p-4 rounded-full"><CheckCircle2 className="w-10 h-10 text-primary" /></div>
                      <h3 className="font-bold text-lg">3. Project Done</h3>
                      <p className="text-sm text-muted-foreground">Hire the perfect candidate and watch your project take flight with professional results.</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </AnimateOnScroll>
        </section>
        
        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <AnimateOnScroll className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Services</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Solutions for Every Industry</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From stunning aerial cinematography to precise industrial inspections, our pilots have the expertise you need.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {services.map((service, index) => (
                <Link key={index} href="#" className="relative block group overflow-hidden rounded-lg shadow-lg h-80">
                  <Image src={service.image} alt={service.name} fill={true} style={{objectFit: 'cover'}} className="transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="relative h-full flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-bold text-white">{service.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </AnimateOnScroll>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <AnimateOnScroll className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Trusted by Industry Leaders</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear what our clients and pilots have to say about their experience on our platform.
                </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex gap-0.5 mb-2 text-primary">
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                  </div>
                  <p className="italic">"Finding a certified pilot for our real estate shoots used to be a nightmare. Avian Pilot Portal made it incredibly simple and efficient."</p>
                  <div className="flex items-center gap-4 mt-4">
                     <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold">Jane Smith</p>
                      <p className="text-sm text-muted-foreground">CEO, Innovate Realty</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardContent className="p-0">
                   <div className="flex gap-0.5 mb-2 text-primary">
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                  </div>
                  <p className="italic">"As a freelance pilot, this platform has been a game-changer for my career. The quality of job postings is excellent."</p>
                  <div className="flex items-center gap-4 mt-4">
                     <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/150?img=8" />
                      <AvatarFallback>MD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold">Michael Davis</p>
                      <p className="text-sm text-muted-foreground">Certified Drone Pilot</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimateOnScroll>
        </section>

         <section className="w-full py-12 md:py-24 lg:py-32">
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
