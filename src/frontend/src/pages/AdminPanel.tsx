import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, LogIn, LogOut, Shield, ShieldOff } from "lucide-react";
import { motion } from "motion/react";
import type { Inquiry } from "../backend";
import { Plan } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetAllInquiries, useIsCallerAdmin } from "../hooks/useQueries";

const planLabels: Record<Plan, string> = {
  [Plan.basic]: "Basic",
  [Plan.luxury]: "Luxury",
  [Plan.highGraphic]: "High Graphic",
};

const planColors: Record<Plan, string> = {
  [Plan.basic]: "bg-muted text-muted-foreground",
  [Plan.luxury]: "bg-gold/20 text-gold border-gold/40",
  [Plan.highGraphic]: "bg-primary/20 text-primary border-primary/40",
};

function InquiryCard({ inquiry, index }: { inquiry: Inquiry; index: number }) {
  const date = inquiry.submittedAt
    ? new Date(Number(inquiry.submittedAt / 1_000_000n)).toLocaleString()
    : "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="glass-card rounded-xl p-5 space-y-3"
      data-ocid={`admin.inquiry.item.${index + 1}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold text-foreground">{inquiry.name}</h4>
          <p className="text-muted-foreground text-sm">
            {inquiry.email} · {inquiry.phone}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${
              planColors[inquiry.plan as Plan] ??
              "bg-muted text-muted-foreground"
            }`}
          >
            {planLabels[inquiry.plan as Plan] ?? inquiry.plan}
          </span>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-gold text-xs font-medium uppercase tracking-wider">
            Business Type
          </span>
          <p className="text-foreground/80 mt-0.5">
            {inquiry.businessType || "—"}
          </p>
        </div>
        <div>
          <span className="text-gold text-xs font-medium uppercase tracking-wider">
            Website Vision
          </span>
          <p className="text-foreground/80 mt-0.5 line-clamp-2">
            {inquiry.websiteDescription || "—"}
          </p>
        </div>
        {inquiry.specialRequirements && (
          <div className="sm:col-span-2">
            <span className="text-gold text-xs font-medium uppercase tracking-wider">
              Special Requirements
            </span>
            <p className="text-foreground/80 mt-0.5">
              {inquiry.specialRequirements}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface AdminPanelProps {
  onBack: () => void;
}

export function AdminPanel({ onBack }: AdminPanelProps) {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const isLoggedIn = !!identity;

  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: inquiries, isLoading: inquiriesLoading } = useGetAllInquiries();

  return (
    <div
      className="min-h-screen py-8 px-4 sm:px-6"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.09 0.012 280), oklch(0.11 0.016 275))",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-muted-foreground hover:text-gold"
            data-ocid="admin.back.button"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-gold" />
            <h1 className="font-display text-2xl font-bold text-gold-gradient">
              Admin Panel
            </h1>
          </div>
        </div>

        {!isLoggedIn ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-12 text-center max-w-md mx-auto"
            data-ocid="admin.login.panel"
          >
            <Shield className="h-14 w-14 text-gold mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Admin Access
            </h2>
            <p className="text-muted-foreground mb-6">
              Log in with Internet Identity to access the admin panel.
            </p>
            <Button
              onClick={() => login()}
              disabled={loginStatus === "logging-in"}
              className="bg-gold text-background hover:bg-gold-light font-semibold gold-glow"
              data-ocid="admin.login.button"
            >
              {loginStatus === "logging-in" ? (
                "Logging in..."
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" /> Log In
                </>
              )}
            </Button>
          </motion.div>
        ) : adminLoading ? (
          <div className="space-y-4" data-ocid="admin.loading_state">
            {["sk1", "sk2", "sk3"].map((k) => (
              <Skeleton key={k} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        ) : !isAdmin ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-12 text-center max-w-md mx-auto"
            data-ocid="admin.access_denied.panel"
          >
            <ShieldOff className="h-14 w-14 text-destructive mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Access Denied
            </h2>
            <p className="text-muted-foreground mb-6">
              You don't have admin privileges.
            </p>
            <Button
              variant="outline"
              onClick={() => clear()}
              className="border-gold/40 text-gold hover:bg-gold/10"
              data-ocid="admin.logout.button"
            >
              <LogOut className="mr-2 h-4 w-4" /> Log Out
            </Button>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Badge className="bg-gold/20 text-gold border-gold/40">
                  {identity?.getPrincipal().toString().slice(0, 12)}...
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => clear()}
                className="border-border text-muted-foreground hover:text-gold hover:border-gold"
                data-ocid="admin.logout.button"
              >
                <LogOut className="mr-2 h-3.5 w-3.5" /> Log Out
              </Button>
            </div>

            <div className="glass-card rounded-xl p-4 mb-6 flex items-center justify-between">
              <span className="text-muted-foreground text-sm">
                Total Inquiries
              </span>
              <span className="font-display text-2xl font-bold text-gold-gradient">
                {inquiries?.length ?? 0}
              </span>
            </div>

            {inquiriesLoading ? (
              <div
                className="space-y-4"
                data-ocid="admin.inquiries.loading_state"
              >
                {["isk1", "isk2", "isk3", "isk4"].map((k) => (
                  <Skeleton key={k} className="h-32 w-full rounded-xl" />
                ))}
              </div>
            ) : inquiries && inquiries.length > 0 ? (
              <div className="space-y-4">
                {inquiries.map((inq, i) => (
                  <InquiryCard
                    key={inq.id.toString()}
                    inquiry={inq}
                    index={i}
                  />
                ))}
              </div>
            ) : (
              <div
                className="glass-card rounded-2xl p-12 text-center"
                data-ocid="admin.inquiries.empty_state"
              >
                <p className="text-muted-foreground">
                  No inquiries submitted yet.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
