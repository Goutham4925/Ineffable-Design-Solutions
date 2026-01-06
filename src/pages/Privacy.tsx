import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
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
        Privacy Policy
      </h1>

      <div className="space-y-8 text-muted-foreground text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            1. Introduction
          </h2>
          <p>
            Ineffable Design Solutions ("we", "our", "us") is committed to
            protecting your privacy. This Privacy Policy explains how we
            collect, use, and safeguard your information when you visit our
            website or use our services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            2. Information We Collect
          </h2>
          <p>
            We may collect personal information such as your name, email
            address, phone number, company name, and project details when you:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Contact us through forms or email</li>
            <li>Request a quote or consultation</li>
            <li>Communicate with our team</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            3. How We Use Your Information
          </h2>
          <p>Your information is used to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Respond to inquiries and provide services</li>
            <li>Improve our offerings and user experience</li>
            <li>Communicate project updates</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            4. Data Protection
          </h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your data from unauthorized access, disclosure, or misuse.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            5. Third-Party Sharing
          </h2>
          <p>
            We do not sell, trade, or rent your personal information. Data may be
            shared only with trusted partners when required to deliver services
            or comply with law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            6. Your Rights
          </h2>
          <p>
            You have the right to access, update, or request deletion of your
            personal data. Contact us anytime at{" "}
            <span className="text-primary">hello@ineffable.design</span>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            7. Updates to This Policy
          </h2>
          <p>
            This Privacy Policy may be updated periodically. Continued use of
            our services indicates acceptance of the revised policy.
          </p>
        </section>
      </div>
    </main>
  );
};

export default Privacy;
