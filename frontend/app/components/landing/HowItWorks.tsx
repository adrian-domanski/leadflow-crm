import { Step } from './Step';

export function HowItWorks() {
  return (
    <section className='px-6 py-24 max-w-5xl mx-auto text-center'>
      <h2 className='text-3xl font-semibold mb-12'>How it works</h2>

      <div className='grid md:grid-cols-3 gap-6'>
        <Step
          title='Find leads'
          desc='Search businesses from Google Maps in seconds'
        />
        <Step title='Organize' desc='Manage them in a simple pipeline' />
        <Step title='Close deals' desc='Reach out and track conversions' />
      </div>
    </section>
  );
}
