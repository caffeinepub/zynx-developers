import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitInquiry } from "@/hooks/useQueries";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Plan } from "../backend";

interface InquiryFormProps {
  selectedPlan?: string;
}

export function InquiryForm({ selectedPlan }: InquiryFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState(selectedPlan || "");
  const [websiteDescription, setWebsiteDescription] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useSubmitInquiry();

  useEffect(() => {
    if (selectedPlan) setPlan(selectedPlan);
  }, [selectedPlan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitMutation.mutateAsync({
        id: 0n,
        submittedAt: 0n,
        name,
        email,
        phone,
        plan: plan as Plan,
        websiteDescription,
        businessType,
        specialRequirements,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (submitted) {
    return (
      <section id="inquiry" className="py-24 px-4 sm:px-6">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-12 text-center"
            data-ocid="inquiry.success_state"
          >
            <CheckCircle2 className="h-16 w-16 text-gold mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">
              Inquiry Submitted!
            </h3>
            <p className="text-muted-foreground mb-6">
              Thank you, {name}! I'll get back to you within 24 hours.
            </p>
            <Button
              onClick={() => setSubmitted(false)}
              variant="outline"
              className="border-gold/40 text-gold hover:bg-gold/10"
            >
              Submit Another Inquiry
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="inquiry"
      className="py-24 px-4 sm:px-6"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.11 0.016 275), oklch(0.09 0.012 280))",
      }}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-3 block">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-gold-gradient mb-4">
            Start Your Project
          </h2>
          <p className="text-muted-foreground text-lg">
            Tell me about your dream website and I'll make it happen.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="glass-card rounded-2xl p-6 sm:p-8 space-y-5"
          data-ocid="inquiry.modal"
        >
          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-foreground/80">
                Full Name *
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
                className="bg-muted/50 border-border focus:border-gold"
                data-ocid="inquiry.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-foreground/80">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="bg-muted/50 border-border focus:border-gold"
                data-ocid="inquiry.input"
              />
            </div>
          </div>

          {/* Phone + Plan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-foreground/80">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                required
                className="bg-muted/50 border-border focus:border-gold"
                data-ocid="inquiry.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="plan" className="text-foreground/80">
                Select Plan *
              </Label>
              <Select value={plan} onValueChange={setPlan} required>
                <SelectTrigger
                  className="bg-muted/50 border-border focus:border-gold"
                  data-ocid="inquiry.select"
                >
                  <SelectValue placeholder="Choose a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Plan.basic}>
                    Basic & Clean — ₹4,500
                  </SelectItem>
                  <SelectItem value={Plan.luxury}>
                    Large Business Luxury — ₹7,500
                  </SelectItem>
                  <SelectItem value={Plan.highGraphic}>
                    High Graphic + MP4 Videos — ₹11,500
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Business Type */}
          <div className="space-y-1.5">
            <Label htmlFor="businessType" className="text-foreground/80">
              Business Type *
            </Label>
            <Input
              id="businessType"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              placeholder="e.g. Restaurant, E-commerce, Photography, etc."
              required
              className="bg-muted/50 border-border focus:border-gold"
              data-ocid="inquiry.input"
            />
          </div>

          {/* Website Description */}
          <div className="space-y-1.5">
            <Label htmlFor="websiteDescription" className="text-foreground/80">
              Website Vision *
            </Label>
            <Textarea
              id="websiteDescription"
              value={websiteDescription}
              onChange={(e) => setWebsiteDescription(e.target.value)}
              placeholder="Describe how you want your website to look and feel..."
              required
              rows={4}
              className="bg-muted/50 border-border focus:border-gold resize-none"
              data-ocid="inquiry.textarea"
            />
          </div>

          {/* Special Requirements */}
          <div className="space-y-1.5">
            <Label htmlFor="specialRequirements" className="text-foreground/80">
              Special Requirements
            </Label>
            <Textarea
              id="specialRequirements"
              value={specialRequirements}
              onChange={(e) => setSpecialRequirements(e.target.value)}
              placeholder="Any specific features, integrations, or special needs..."
              rows={3}
              className="bg-muted/50 border-border focus:border-gold resize-none"
              data-ocid="inquiry.textarea"
            />
          </div>

          {/* Error */}
          {submitMutation.isError && (
            <p
              className="text-destructive text-sm"
              data-ocid="inquiry.error_state"
            >
              Something went wrong. Please try again.
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={submitMutation.isPending}
            className="w-full bg-gold text-background hover:bg-gold-light font-semibold gold-glow transition-all duration-300 hover:scale-[1.02] py-3"
            data-ocid="inquiry.submit_button"
          >
            {submitMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" /> Send My Inquiry
              </>
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
