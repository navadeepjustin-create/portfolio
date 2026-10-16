import React, { useState } from 'react';
import {
  Mail,
  Copy,
  Check,
  Send,
  AlertCircle,
  MapPin,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { EMAIL_ADDRESS } from '../data/socials';
import { SocialLinks } from '../components/SocialLinks';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const { contact } = portfolioData;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FormErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [mailtoTriggered, setMailtoTriggered] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeEmail = EMAIL_ADDRESS.trim() || contact.email.trim();
  const hasRealEmail = activeEmail.length > 0;

  const contactEndpoint = (import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined)?.trim();
  const contactKey = (import.meta.env.VITE_CONTACT_FORM_KEY as string | undefined)?.trim();

  // Validate form fields
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = 'Please provide your full name (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = 'Please provide a valid email address (e.g., alex@company.com).';
    }

    if (!subject.trim() || subject.trim().length < 2) {
      newErrors.subject = 'Please specify a subject for your message.';
    }

    if (!message.trim() || message.trim().length < 10) {
      newErrors.message = 'Please write a message with at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const handleCopyEmail = () => {
    if (hasRealEmail) {
      navigator.clipboard.writeText(activeEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    setMailtoTriggered(false);

    // Case 1: Real configured delivery endpoint (e.g. Web3Forms / Formspree / Serverless)
    if (contactEndpoint) {
      try {
        const payload: Record<string, string> = {
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        };

        if (contactKey) {
          payload.access_key = contactKey;
        }

        const res = await fetch(contactEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          setSubmitSuccess(true);
          setName('');
          setEmail('');
          setSubject('');
          setMessage('');
          setTouched({});
        } else {
          const data = await res.json().catch(() => null);
          throw new Error(data?.message || `Endpoint returned status ${res.status}`);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Network delivery error occurred.';
        setSubmitError(`${msg}. You can still dispatch directly via email below.`);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Case 2: No backend service configured yet.
    // Transparent, genuine fallback using prefilled mailto without claiming fake transmission.
    setTimeout(() => {
      setIsSubmitting(false);
      setMailtoTriggered(true);

      const mailSubject = encodeURIComponent(subject.trim() || 'Portfolio Project Inquiry');
      const mailBody = encodeURIComponent(
        `Hi Navadeep,\n\n${message.trim()}\n\nFrom: ${name.trim()} (${email.trim()})`
      );

      const targetDestination = hasRealEmail ? activeEmail : '';
      window.location.href = `mailto:${targetDestination}?subject=${mailSubject}&body=${mailBody}`;
    }, 400);
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 bg-[#111111] text-[#F5F5F0] bg-grid-dark relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Tag */}
        <div className="flex items-center justify-between pb-6 border-b border-[#2B2B2B]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#D1FF00] bg-[#D1FF00]/10 border border-[#D1FF00]/30 px-2 py-0.5">
              06 // CONTACT
            </span>
            <span className="font-mono text-xs text-[#777777] uppercase tracking-wider">
              LET'S TALK
            </span>
          </div>
          <span className="font-mono text-xs text-[#777777] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#D1FF00]" /> {contact.location}
          </span>
        </div>

        {/* Oversized Headline */}
        <div className="mt-12 space-y-4 max-w-4xl">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.03em] uppercase leading-[0.95] text-[#F5F5F0]">
            HAVE AN IDEA? <br />
            <span className="text-[#D1FF00]">LET'S BUILD IT.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#AAAAAA] max-w-2xl leading-relaxed font-sans">
            Have a project in mind, want to collaborate, or just want to talk technology? Send me a message.
          </p>
        </div>

        {/* Content Grid: Social Channels & Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 items-start">
          {/* Left Column: Direct Channels & Verified Social Media */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-mono text-xs text-[#777777] uppercase tracking-widest block mb-2">
                DIRECT CONTACT & NETWORKS
              </span>
              <p className="text-xs text-[#888888] font-mono leading-relaxed">
                Connect directly through verified profiles or initiate a project conversation.
              </p>
            </div>

            {/* Direct Email Card */}
            <div className="p-6 bg-[#171717] border border-[#2B2B2B] hover:border-[#D1FF00] transition-colors space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#777777] uppercase">EMAIL ADDRESS</span>
                <span className="w-2 h-2 bg-[#D1FF00] rounded-none animate-pulse" />
              </div>

              <div>
                <p className="font-mono text-sm sm:text-base text-[#F5F5F0] font-semibold break-all">
                  {hasRealEmail ? activeEmail : 'Add in src/data/socials.ts'}
                </p>
                {!hasRealEmail && (
                  <p className="text-[11px] font-mono text-[#D1FF00] mt-1">
                    Set EMAIL_ADDRESS in src/data/socials.ts
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {hasRealEmail ? (
                  <>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      data-cursor-label="COPY"
                      className="px-3.5 py-2 bg-[#222222] border border-[#333333] hover:border-[#D1FF00] hover:text-[#D1FF00] text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-[#D1FF00]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copied ? 'Copied' : 'Copy Email'}</span>
                    </button>

                    <a
                      href={`mailto:${activeEmail}`}
                      data-cursor-label="EMAIL ↗"
                      className="px-3.5 py-2 bg-[#D1FF00] text-[#111111] hover:bg-[#bce600] text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open Mail Client</span>
                    </a>
                  </>
                ) : (
                  <span className="font-mono text-xs text-[#777777] px-3 py-1.5 bg-[#202020] border border-[#333333]">
                    EMAIL PENDING CONFIGURATION
                  </span>
                )}
              </div>
            </div>

            {/* Social Channels with Configuration Awareness */}
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#777777] uppercase tracking-widest block">
                Social Profiles & Destinations
              </span>
              <SocialLinks variant="contact" showUnconfigured={true} />
            </div>
          </div>

          {/* Right Column: Clean, Validated Contact Form */}
          <div className="lg:col-span-7 bg-[#171717] border border-[#2B2B2B] p-6 sm:p-9 shadow-2xl relative">
            <div className="pb-4 border-b border-[#262626] mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-mono text-xs text-[#D1FF00] uppercase tracking-wider flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" /> Start A Conversation
              </span>
              <span className="font-mono text-[10px] text-[#777777]">
                {contactEndpoint ? 'DIRECT ENDPOINT DELIVERY' : 'TRANSPARENT CLIENT SUBMISSION'}
              </span>
            </div>

            {submitSuccess ? (
              <div className="p-8 bg-[#1B2612] border border-[#D1FF00]/40 text-center space-y-4 animate-in fade-in">
                <div className="w-12 h-12 bg-[#D1FF00] text-[#111111] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-bold uppercase text-[#F5F5F0]">
                  Message Successfully Dispatched!
                </h3>
                <p className="text-sm text-[#CCCCCC] font-sans max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Your message has been routed to Navadeep. You should receive a response shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="px-5 py-2.5 bg-[#D1FF00] text-[#111111] font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#bce600] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="font-mono text-xs text-[#AAAAAA] uppercase flex items-center justify-between"
                    >
                      <span>Full Name *</span>
                      {touched.name && errors.name && (
                        <span className="text-[10px] text-[#FF5555] lowercase font-normal">
                          required
                        </span>
                      )}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onBlur={() => handleBlur('name')}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) validate();
                      }}
                      placeholder="Alex Mercer"
                      aria-invalid={Boolean(touched.name && errors.name)}
                      className={`w-full px-3.5 py-3 bg-[#111111] border text-[#F5F5F0] text-xs font-mono outline-none transition-colors ${
                        touched.name && errors.name
                          ? 'border-[#FF5555] focus:border-[#FF5555]'
                          : 'border-[#333333] focus:border-[#D1FF00]'
                      }`}
                    />
                    {touched.name && errors.name && (
                      <p className="font-mono text-[10px] text-[#FF5555]">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="font-mono text-xs text-[#AAAAAA] uppercase flex items-center justify-between"
                    >
                      <span>Email Address *</span>
                      {touched.email && errors.email && (
                        <span className="text-[10px] text-[#FF5555] lowercase font-normal">
                          invalid
                        </span>
                      )}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onBlur={() => handleBlur('email')}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) validate();
                      }}
                      placeholder="alex@domain.com"
                      aria-invalid={Boolean(touched.email && errors.email)}
                      className={`w-full px-3.5 py-3 bg-[#111111] border text-[#F5F5F0] text-xs font-mono outline-none transition-colors ${
                        touched.email && errors.email
                          ? 'border-[#FF5555] focus:border-[#FF5555]'
                          : 'border-[#333333] focus:border-[#D1FF00]'
                      }`}
                    />
                    {touched.email && errors.email && (
                      <p className="font-mono text-[10px] text-[#FF5555]">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="font-mono text-xs text-[#AAAAAA] uppercase flex items-center justify-between"
                  >
                    <span>Subject *</span>
                    {touched.subject && errors.subject && (
                      <span className="text-[10px] text-[#FF5555] lowercase font-normal">
                        required
                      </span>
                    )}
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={subject}
                    onBlur={() => handleBlur('subject')}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      if (errors.subject) validate();
                    }}
                    placeholder="AI/ML Project Collaboration or Inquiry"
                    aria-invalid={Boolean(touched.subject && errors.subject)}
                    className={`w-full px-3.5 py-3 bg-[#111111] border text-[#F5F5F0] text-xs font-mono outline-none transition-colors ${
                      touched.subject && errors.subject
                        ? 'border-[#FF5555] focus:border-[#FF5555]'
                        : 'border-[#333333] focus:border-[#D1FF00]'
                    }`}
                  />
                  {touched.subject && errors.subject && (
                    <p className="font-mono text-[10px] text-[#FF5555]">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="font-mono text-xs text-[#AAAAAA] uppercase flex items-center justify-between"
                  >
                    <span>Message *</span>
                    {touched.message && errors.message && (
                      <span className="text-[10px] text-[#FF5555] lowercase font-normal">
                        min 10 characters
                      </span>
                    )}
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onBlur={() => handleBlur('message')}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) validate();
                    }}
                    placeholder="Describe your project, question, or technology discussion topic..."
                    aria-invalid={Boolean(touched.message && errors.message)}
                    className={`w-full px-3.5 py-3 bg-[#111111] border text-[#F5F5F0] text-xs font-mono outline-none transition-colors resize-none ${
                      touched.message && errors.message
                        ? 'border-[#FF5555] focus:border-[#FF5555]'
                        : 'border-[#333333] focus:border-[#D1FF00]'
                    }`}
                  />
                  {touched.message && errors.message && (
                    <p className="font-mono text-[10px] text-[#FF5555]">{errors.message}</p>
                  )}
                </div>

                {/* Delivery Notice / Transparency Box */}
                <div className="p-3.5 bg-[#121212] border border-[#262626] flex items-start gap-2.5 text-[11px] text-[#888888] font-mono leading-relaxed">
                  <AlertCircle className="w-4 h-4 text-[#D1FF00] shrink-0 mt-0.5" />
                  <div>
                    {contactEndpoint ? (
                      <span>
                        <strong className="text-[#F5F5F0]">Serverless Delivery:</strong> Your message will be securely transmitted directly to Navadeep’s inbox via the configured delivery service.
                      </span>
                    ) : (
                      <span>
                        <strong className="text-[#F5F5F0]">Direct Client Dispatch:</strong> Clicking Send opens your email client prefilled with your message. (To configure direct serverless delivery, see <code className="text-[#D1FF00]">.env.example</code>).
                      </span>
                    )}
                  </div>
                </div>

                {submitError && (
                  <div className="p-3 bg-[#2A1111] border border-[#FF5555]/50 text-xs font-mono text-[#FF8888]">
                    {submitError}
                  </div>
                )}

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-cursor-label="SEND"
                  className="w-full py-4 bg-[#D1FF00] text-[#111111] hover:bg-[#bce600] disabled:bg-[#444444] disabled:text-[#888888] font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>DISPATCHING MESSAGE...</span>
                    </>
                  ) : (
                    <>
                      <span>{contactEndpoint ? 'SEND MESSAGE' : 'SEND MESSAGE VIA EMAIL CLIENT'}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {mailtoTriggered && (
                  <div className="p-3 bg-[#1A1A1A] border border-[#333333] text-center font-mono text-xs text-[#D1FF00] space-y-1">
                    <p className="font-semibold">✓ Mail client opened with your message prefilled.</p>
                    <p className="text-[10px] text-[#888888]">
                      If your mail client did not open automatically, copy your message text and send to {activeEmail || 'Navadeep'}.
                    </p>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Footer Signature */}
        <div className="mt-24 pt-8 border-t border-[#262626] flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-[#777777]">
          <div className="flex items-center gap-3">
            <span className="font-display text-lg font-bold text-[#F5F5F0] tracking-tight">
              NAVADEEP
            </span>
            <span className="text-[#333333]">/</span>
            <span>AIML STUDENT & DEVELOPER</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#hero"
              data-cursor-label="TOP ↑"
              className="hover:text-[#D1FF00] transition-colors"
            >
              BACK TO TOP ↑
            </a>
            <span className="text-[#333333]">·</span>
            <span>HYDERABAD, INDIA</span>
            <span className="text-[#333333]">·</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
