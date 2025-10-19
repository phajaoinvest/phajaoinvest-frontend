import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Phone, MessageCircle, Mail, MessageSquare, Send, Clock } from "lucide-react"
import Link from "next/link"

const contacts = [
  {
    id: "phone",
    icon: <Phone className="h-4 w-4 text-primary" />,
    title: "020 78856194",
    link: "tel:+85620555501234",
    buttonText: "Call Now",
    buttonClass:
      "w-full border bg-transparent text-white cursor-pointer hover:bg-white hover:text-primary",
  },
  {
    id: "whatsapp",
    icon: <MessageCircle className="h-4 w-4 text-primary" />,
    title: "+856 20 5555 0123",
    link: "https://wa.me/85620555501234",
    buttonText: "Chat now",
    buttonClass:
      "w-full border bg-transparent text-white cursor-pointer hover:bg-white hover:text-primary",
    target: "_blank",
  },
  {
    id: "email",
    icon: <Mail className="h-4 w-4 text-primary" />,
    title: "support@PhaJaoInvest.la",
    link: "mailto:support@PhaJaoInvest.la",
    buttonText: "Send email",
    buttonClass:
      "w-full border bg-transparent text-white cursor-pointer hover:bg-white hover:text-primary",
  },
  {
    id: "line",
    icon: <MessageSquare className="h-4 w-4 text-primary" />,
    title: "@PhaJaoInvest_support",
    link: "https://line.me/ti/p/@PhaJaoInvest_support",
    buttonText: "Add on line",
    buttonClass:
      "w-full border bg-transparent text-white cursor-pointer hover:bg-white hover:text-primary",
    target: "_blank",
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-6 sm:py-16 px-0 sm:px-4">
        <div className="container mx-auto max-w-10xl max-w-6xl p-0">
          <div className="text-center mb-8">
            <h1 className="text-xl md:text-2xl font-bold mb-2 text-primary">
              We're Here to Help
            </h1>
            <p className="text-md text-muted-foreground max-w-2xl mx-auto text-light">
              Get in touch with our expert team for any questions about our services, technical support, or investment
              guidance.
            </p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
            {contacts.map((c) => (
              <Card key={c.id} className="text-center border">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center justify-center gap-2">
                    {c.icon}
                    {c.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className={c.buttonClass} asChild>
                    <Link href={c.link} target={c.target || undefined}>
                      {c.buttonText}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form Section */}
          <div className="space-y-12">
            <Card className="border">
              <CardHeader>
                <CardTitle className="text-md flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Office Hours
                </CardTitle>
                <CardDescription>Our support team is available during these hours to assist you.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-primary/5 rounded-lg p-4 text-center border">
                    <h4 className="font-semibold mb-2 text-sm">Monday - Friday</h4>
                    <p className="text-xs font-bold text-primary">8:00 AM - 6:00 PM</p>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-4 text-center border">
                    <h4 className="font-semibold mb-2 text-sm">Saturday</h4>
                    <p className="text-lg font-bold text-primary text-xs">9:00 AM - 4:00 PM</p>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-4 text-center border">
                    <h4 className="font-semibold mb-2 text-sm">Sunday</h4>
                    <p className="text-lg font-bold text-muted-foreground text-xs">Closed</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-6 text-center">
                  All times are in GMT+7 (Vientiane Time)
                </p>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="border">
              <CardHeader>
                <CardTitle className="text-md flex items-center gap-2">
                  <Send className="h-4 w-4 text-primary" />
                  Leave Us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Enter your full name" />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter your phone number" />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What can we help you with?" />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your question or issue in detail..."
                    className="min-h-[120px]"
                  />
                </div>

                <Button className="w-auto" size="lg">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
