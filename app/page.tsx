import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { title, subtitle } from "@/components/primitives";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { FaCalculator, FaChartLine, FaBook, FaRobot } from "react-icons/fa";

export default function Home() {
  const features = [
    {
      title: "Tax Simulation",
      description: "Get instant tax assessments with our AI-powered calculator that considers all deductions and exemptions.",
      icon: <FaCalculator className="w-6 h-6" />,
      href: "/Tax-Simulation"
    },
    {
      title: "Advanced Calculator",
      description: "Strategic tax planning tools to help you maximize savings and minimize tax liability year-round.",
      icon: <FaChartLine className="w-6 h-6" />,
      href: "/Advanced-calculator"
    },
    {
      title: "Tax Rules",
      description: "Stay informed with real-time updates on tax laws, deadlines, and compliance requirements.",
      icon: <FaBook className="w-6 h-6" />,
      href: "/Tax-Rules"
    },
    {
      title: "AI Suggestions",
      description: "Receive personalized tax optimization strategies and compliance guidance from our AI system.",
      icon: <FaRobot className="w-6 h-6" />,
      href: "/AI-Suggestions"
    }
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-4xl text-center justify-center">
        <h1 className={title({ color: "violet" })}>Professional Tax Solutions&nbsp;</h1>
        <h1 className={title()}>
          Powered by&nbsp;
          <span className={title({ color: "violet" })}>Advanced AI</span>
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Maximize your tax savings with expert guidance and cutting-edge technology
        </h2>
      </div>

      <div className="flex gap-3 mt-8">
        <Link
          href="/How-to-apply"
          className={buttonStyles({ color: "primary", radius: "full", variant: "shadow", size: "lg" })}
        >
          Get Started
        </Link>
        <Link
          href="/Tax-Rules"
          className={buttonStyles({ variant: "bordered", radius: "full", size: "lg" })}
        >
          Learn More
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-6xl px-4">
        {features.map((feature, index) => (
          <Link href={feature.href} key={index} className="w-full">
            <Card className="hover:scale-105 transition-transform duration-200">
              <CardHeader className="flex gap-3 items-center">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {feature.icon}
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{feature.title}</p>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-default-500">{feature.description}</p>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className={title({ size: "sm" })}>Why Trust Our Tax Platform?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-6xl px-4">
          <div className="p-6 rounded-lg bg-default-50">
            <h3 className="text-lg font-semibold mb-2">100% Accuracy Guaranteed</h3>
            <p className="text-default-500">Our tax calculations are backed by advanced algorithms and updated tax regulations.</p>
          </div>
          <div className="p-6 rounded-lg bg-default-50">
            <h3 className="text-lg font-semibold mb-2">Smart Tax Optimization</h3>
            <p className="text-default-500">AI-driven insights to identify all possible deductions and tax-saving opportunities.</p>
          </div>
          <div className="p-6 rounded-lg bg-default-50">
            <h3 className="text-lg font-semibold mb-2">Compliance Assured</h3>
            <p className="text-default-500">Stay compliant with automatic updates to tax laws and regulations.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
