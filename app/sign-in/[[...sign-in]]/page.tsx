import { SignIn } from "@clerk/nextjs";
import Header from "../../../components/marketing/Header";
import Footer from "../../../components/marketing/Footer";
import { COLORS, FONT_FAMILY } from "../../../lib/design-tokens";

export default function SignInPage() {
  return (
    <main style={{ backgroundColor: COLORS.paper, minHeight: "100vh" }} className="flex flex-col items-center">
      <Header alwaysSolid />

      <section
        className="w-full max-w-md px-6 flex flex-col items-center"
        style={{ paddingTop: "140px", paddingBottom: "100px" }}
      >
        <span className="text-xs uppercase tracking-wide block mb-2" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted }}>
          Welcome back
        </span>
        <h1 className="text-2xl mb-8 text-center" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
          Log in to your account
        </h1>
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          appearance={{
            variables: {
              colorPrimary: COLORS.ink,
              colorText: COLORS.ink,
              colorBackground: "#FFFFFF",
              borderRadius: "2px",
              fontFamily: FONT_FAMILY.body,
            },
            elements: {
              card: { boxShadow: "none", border: `1px solid ${COLORS.hairline}` },
            },
          }}
        />
      </section>

      <Footer />
    </main>
  );
}
