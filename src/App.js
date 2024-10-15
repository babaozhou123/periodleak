import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

const generateRandomDate = () => {
  const today = new Date();
  const randomDaysAgo = Math.floor(Math.random() * 28) + 1;
  const randomDate = new Date(today.getTime() - randomDaysAgo * 24 * 60 * 60 * 1000);
  return randomDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const viscosityOptions = [
  "Gloopy", "Slimy", "Goopy", "Chunky", "Stringy", "Sticky", "Gummy", "Syrupy", "Gelatinous", "Oozy"
];

const smellOptions = [
  "Funky", "Ripe", "Pungent", "Musty", "Sour", "Tangy", "Earthy", "Rank", "Stinky", "like a gym sock"
];

const soundOptions = [
  "Squelch", "Slurp", "Splat", "Squish", "Glug", "Slosh", "Gurgle", "Schlop", "Sploosh", "Flapping"
];

const flowOptions = [
  "Shot", "Gushed", "Splodged", "Surged", "Oozed", "Cannonballed", "Dribbled", "Sloshed", "Flooded", "Globbed"
];

const y2kBackgrounds = [
  "url('https://cdn.pixabay.com/photo/2023/08/07/08/35/broccoli-8174625_1280.jpg')",
  "url('https://cdn.pixabay.com/photo/2024/02/10/15/03/heart-8564951_1280.png')",
  "url('https://cdn.pixabay.com/photo/2017/01/11/19/56/cheese-1972744_1280.jpghttps://cdn.pixabay.com/photo/2017/01/11/19/56/cheese-1972744_1280.jpg')",
  "url('https://cdn.pixabay.com/photo/2017/08/02/21/23/aquarium-2573541_1280.jpg')",
  "url('https://cdn.pixabay.com/photo/2015/05/31/13/37/bread-791801_1280.jpg')"
];

const getRandomOption = (options) => options[Math.floor(Math.random() * options.length)];

const PeriodMadlibForm = () => {
  const [lastPeriodDate, setLastPeriodDate] = useState(generateRandomDate());
  const [viscosity, setViscosity] = useState(getRandomOption(viscosityOptions));
  const [smell, setSmell] = useState(getRandomOption(smellOptions));
  const [sound, setSound] = useState(getRandomOption(soundOptions));
  const [flow, setFlow] = useState(getRandomOption(flowOptions));
  const [showPreview, setShowPreview] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const formRef = useRef(null);
  const resultRef = useRef(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = y2kBackgrounds[Math.floor(Math.random() * y2kBackgrounds.length)].replace(/url\(['"](.+)['"]\)/, '$1');
    img.onload = () => setBackgroundImage(img);
  }, []);

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',
  };
  
  const inputStyle = {
    width: '100%',
    marginBottom: '10px',
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!viscosity || !smell || !sound || !flow) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 820);
      return;
    }
    setShowPreview(true);
  };

  const shareToInstagram = async () => {
    if (resultRef.current && backgroundImage) {
      try {
        const canvas = await html2canvas(resultRef.current, {
          width: 1080,
          height: 1920,
          scale: 2,
          useCORS: true,
          onclone: (clonedDoc) => {
            const clonedElement = clonedDoc.getElementById('instagram-share');
            clonedElement.style.display = 'block';
            clonedElement.style.width = '1080px';
            clonedElement.style.height = '1920px';
          }
        });
        
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        const file = new File([blob], 'period-madlib.png', { type: 'image/png' });
        
        if (navigator.share) {
          await navigator.share({
            files: [file],
            title: 'My Period for JD Vance',
            text: 'Enjoy, you little freak!'
          });
        } else {
          // Fallback for browsers that don't support sharing files
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'period-madlib.png';
          link.click();
          URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const emailToJD = () => {
    const subject = encodeURIComponent("My Period Details for JD Vance");
    const body = encodeURIComponent(`Dear JD,

My last period might have been on ${lastPeriodDate}. It was ${viscosity.toLowerCase()} and smelled ${smell.toLowerCase()}. When the blood ${flow.toLowerCase()} out, it made a ${sound.toLowerCase()} sound. Enjoy, you little freak.`);

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const containerStyle = {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundImage: backgroundImage ? `url(${backgroundImage.src})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontFamily: "'Comic Neue', 'Comic Sans MS', 'Chalkboard SE', sans-serif",
    boxSizing: 'border-box',
    overflowX: 'hidden',
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '100%',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
  };

  const renderIntro = () => (
    <div style={cardStyle}>
      <h2 className="text-3xl font-bold text-pink-500 mb-4 text-center">JD Vance wants your blood.</h2>
      <p className="text-purple-700 mb-6 text-sm sm:text-base">
        Senator Vance fought against federal <a 
        href="https://talkingpointsmemo.com/edblog/jd-vance-menstrual-surveillance-hawk"
        style={{
          textDecoration: 'underline',
          cursor: 'pointer'
        }}
      >privacy protections for your period data.</a> <br></br><br></br>The letter he signed said that cops need to access reproductive healthcare records to predict who might be trying to leave red states to get abortions. 
        <br></br><br></br>Cops don't become cops because they're good at math or data science. <br></br><br></br><b>Nice try JD, don't be shy, you want the bloody details for yourself, don't you?</b> </p>
      <button 
        onClick={() => setShowIntro(false)} 
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
      >
        give the dirty boy what he wants
      </button>
    </div>
  );

  const renderForm = () => (
    <div style={cardStyle} className={`transition-all duration-300 ${isShaking ? 'animate-shake' : ''}`}>
      <h2 className="text-3xl font-bold text-pink-500 mb-4 text-center">Dear JD,</h2>
      <p className="text-purple-600 mb-6 text-center">I heard how badly you want to know about my period.</p>
      <form onSubmit={handleSubmit} style={formStyle}>
  <p className="text-purple-700 text-sm sm:text-base">
    My last period might have been on{' '}
    <input type="text" value={lastPeriodDate} readOnly style={inputStyle} />
    . It was{' '}
    <select
      value={viscosity}
      onChange={(e) => setViscosity(e.target.value)}
      style={inputStyle}
    >
      {viscosityOptions.map((option) => (
        <option key={option} value={option}>{option.toLowerCase()}</option>
      ))}
    </select>
    {' '}and smelled{' '}
    <select
      value={smell}
      onChange={(e) => setSmell(e.target.value)}
      style={inputStyle}
    >
      {smellOptions.map((option) => (
        <option key={option} value={option}>{option.toLowerCase()}</option>
      ))}
    </select>
    . When the blood{' '}
    <select
      value={flow}
      onChange={(e) => setFlow(e.target.value)}
      style={inputStyle}
    >
      {flowOptions.map((option) => (
        <option key={option} value={option}>{option.toLowerCase()}</option>
      ))}
    </select>
    {' '}out, it made a{' '}
    <select
      value={sound}
      onChange={(e) => setSound(e.target.value)}
      style={inputStyle}
    >
      {soundOptions.map((option) => (
        <option key={option} value={option}>{option.toLowerCase()}</option>
      ))}
    </select>
    {' '}sound.
  </p>
  <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300">
    Send this to JD
  </button>
</form>
    </div>
  );

  const renderPreview = () => (
    <div style={cardStyle}>
      <h2 className="text-3xl font-bold text-pink-500 mb-4 text-center">Dear JD,</h2>
      <p className="text-purple-700 mb-6 text-sm sm:text-base">
        I heard how bad you wanted to know about my period. It might have started on {lastPeriodDate}. It was {viscosity.toLowerCase()} and smelled {smell.toLowerCase()}. 
        When the blood {flow.toLowerCase()} out, it made a {sound.toLowerCase()} sound. 
        <br></br>
        <br></br>Enjoy, you little freak.
      </p>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <button onClick={shareToInstagram} className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300">
          Tag @jdvance on IG
        </button>
        <button onClick={emailToJD} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300">
          Email him
        </button>
      </div>
      <button 
        onClick={() => setShowPreview(false)} 
        className="w-full mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
      >
        Go Back
      </button>
    </div>
  );

  return (
    <div style={containerStyle}>
      {showIntro ? renderIntro() : (showPreview ? renderPreview() : renderForm())}
      
      <div 
        id="instagram-share"
        ref={resultRef}
        style={{
          width: '1080px',
          height: '1920px',
          backgroundImage: backgroundImage ? `url(${backgroundImage.src})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'none',
          position: 'fixed',
          left: '-9999px',
          fontFamily: "'Comic Sans MS', cursive",
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          boxSizing: 'border-box',
        }}>
          <h2 style={{
            fontSize: '80px',
            fontWeight: 'bold',
            color: '#D53F8C',
            marginBottom: '40px',
            textAlign: 'center',
          }}>Dear JD,</h2>
          <p style={{
            fontSize: '48px',
            color: '#553C9A',
            textAlign: 'center',
            lineHeight: 1.4,
          }}>
            I heard how badly you want to know about mhy period. My last period might have started on {lastPeriodDate}. It was {viscosity.toLowerCase()} and smelled {smell.toLowerCase()}. 
            When the blood {flow.toLowerCase()} out, it made a {sound.toLowerCase()} sound. Enjoy, you little freak.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PeriodMadlibForm;