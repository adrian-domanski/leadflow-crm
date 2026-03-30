export function Step({ title, desc }: { title: string; desc: string }) {
  return (
    <div className='border rounded-2xl p-6 bg-card hover:shadow-md transition'>
      <h3 className='font-semibold text-lg'>{title}</h3>
      <p className='text-sm text-muted-foreground mt-2'>{desc}</p>
    </div>
  );
}
