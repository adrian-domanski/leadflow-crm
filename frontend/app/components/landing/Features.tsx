import { Feature } from './Feature';

export function Features() {
  return (
    <section className='grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-24 max-w-6xl mx-auto'>
      <Feature
        title='Lead generation'
        desc='Find businesses instantly and build your pipeline'
      />
      <Feature
        title='Visual pipeline'
        desc='Track deals and move leads with ease'
      />
      <Feature
        title='Analytics'
        desc='Understand what converts and grow faster'
      />
    </section>
  );
}
