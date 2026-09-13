const words = [
  "OSDC",
  "PIZZA",
  "CODE",
  "MEMES",
  "LINUX",
  "LARP",
];

function TickerGroup({
  hidden = false,
}: {
  hidden?: boolean;
}) {
  return (
    <div
      className="ticker-group"
      aria-hidden={hidden}
    >
      {words.map((word) => (
        <span key={word}>
          ★ {word}
        </span>
      ))}
    </div>
  );
}

export default function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker-track">
        <TickerGroup />
        <TickerGroup hidden />
      </div>
    </div>
  );
}