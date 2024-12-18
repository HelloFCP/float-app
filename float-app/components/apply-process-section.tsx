import { UserCircle, FileText, CheckCircle } from 'lucide-react'

const steps = [
  {
    title: "Sign Up",
    description: "Create your account in seconds. It's quick, easy, and secure.",
    icon: UserCircle,
  },
  {
    title: "Apply",
    description: "Fill out our streamlined application with your aircraft details and financing needs.",
    icon: FileText,
  },
  {
    title: "Get Approved",
    description: "Receive approval within 24 hours. We work fast to get you flying sooner.",
    icon: CheckCircle,
  },
]

export function ApplyProcessSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Apply in Minutes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our streamlined process gets you from application to approval in as little as 24 hours.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-2xl font-bold mb-4">Step {index + 1}</div>
              <div className="w-20 h-20 rounded-full bg-[#564cf9] flex items-center justify-center mb-4">
                <step.icon className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

