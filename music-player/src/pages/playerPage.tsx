import audioFile from '../assets/Better Call Saul Theme but only the good part.mp3';

const PlayerPage = () => {
  return (
    <>
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px"
        }}
      >

      </div>
      
      <audio controls autoPlay muted>
        <source src={audioFile} type="audio/mpeg" />
        Ez nem lejátszható a te böngésződben
      </audio>
    </>
  );
};

export default PlayerPage;
