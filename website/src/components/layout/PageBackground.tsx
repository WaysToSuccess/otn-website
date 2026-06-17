export default function PageBackground() {
  return (
    <>
      {/* Basis-Gradient */}
      <div className="fixed inset-0 -z-10 pointer-events-none" style={{
        background: 'linear-gradient(165deg, #b8d4ff 0%, #cce0ff 20%, #ddeeff 45%, #c8dcff 70%, #a8c8f8 100%)',
      }} />

      {/* Orb oben links */}
      <div className="fixed -z-10 pointer-events-none" style={{
        width: 900, height: 900, top: -300, left: -300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,40,180,0.52) 0%, rgba(0,60,200,0.22) 38%, transparent 65%)',
        filter: 'blur(90px)',
      }} />

      {/* Orb oben rechts */}
      <div className="fixed -z-10 pointer-events-none" style={{
        width: 750, height: 750, top: -200, right: -200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,80,220,0.42) 0%, rgba(30,100,255,0.16) 42%, transparent 65%)',
        filter: 'blur(100px)',
      }} />

      {/* Orb mitte links */}
      <div className="fixed -z-10 pointer-events-none" style={{
        width: 600, height: 600, top: '35vh', left: -150,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,100,210,0.36) 0%, rgba(13,148,136,0.16) 45%, transparent 65%)',
        filter: 'blur(85px)',
      }} />

      {/* Orb mitte rechts */}
      <div className="fixed -z-10 pointer-events-none" style={{
        width: 650, height: 650, top: '42vh', right: -150,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(20,60,210,0.38) 0%, rgba(0,90,255,0.14) 42%, transparent 65%)',
        filter: 'blur(95px)',
      }} />

      {/* Orb unten mitte */}
      <div className="fixed -z-10 pointer-events-none" style={{
        width: 800, height: 800, bottom: -250, left: '15vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,50,190,0.46) 0%, rgba(0,120,220,0.18) 42%, transparent 65%)',
        filter: 'blur(100px)',
      }} />

      {/* Orb unten rechts */}
      <div className="fixed -z-10 pointer-events-none" style={{
        width: 500, height: 500, bottom: -100, right: -80,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(13,148,136,0.30) 0%, rgba(0,80,200,0.12) 45%, transparent 65%)',
        filter: 'blur(75px)',
      }} />

      {/* Zentraler weicher Glow */}
      <div className="fixed -z-10 pointer-events-none" style={{
        width: 1000, height: 600, top: '20vh', left: '5vw',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(0,70,220,0.12) 0%, transparent 65%)',
        filter: 'blur(140px)',
      }} />
    </>
  )
}
