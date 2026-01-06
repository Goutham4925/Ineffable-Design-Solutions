import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <main className="container-wide pt-32 pb-24 max-w-4xl">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-10 text-primary">
        Terms of Service
      </h1>

      <div className="space-y-8 text-muted-foreground text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the services of Ineffable Design Solutions,
            you agree to be bound by these Terms of Service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            2. Services
          </h2>
          <p>
            We provide digital services including software development, web
            design, branding, UI/UX, and AI solutions. Service scope is defined
            per project agreement.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            3. Intellectual Property
          </h2>
          <p>
            All designs, code, concepts, and deliverables remain the property
            of Ineffable Design Solutions unless explicitly transferred via
            written agreement.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            4. Client Responsibilities
          </h2>
          <p>
            Clients agree to provide accurate information, timely feedback, and
            required assets to ensure project success.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            5. Payment & Billing
          </h2>
          <p>
            Payments, milestones, and refund policies are governed by individual
            contracts or proposals agreed upon before project initiation.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            6. Limitation of Liability
          </h2>
          <p>
            Ineffable Design Solutions shall not be liable for indirect,
            incidental, or consequential damages arising from service use.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            7. Termination
          </h2>
          <p>
            We reserve the right to suspend or terminate services if these terms
            are violated or in case of misuse.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            8. Changes to Terms
          </h2>
          <p>
            These Terms may be updated at any time. Continued usage implies
            acceptance of the latest version.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            9. Contact
          </h2>
          <p>
            For questions regarding these Terms, contact us at{" "}
            <span className="text-primary">hello@ineffable.design</span>.
          </p>
        </section>
      </div>
    </main>
  );
};

export default Terms;
