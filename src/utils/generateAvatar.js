const bgColors = [
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#34495e",
  "#16a085",
  "#27ae60",
  "#2980b9",
  "#8e44ad",
  "#2c3e50",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#95a5a6",
  "#f39c12",
  "#d35400",
  "#c0392b",
  "#bdc3c7",
  "#7f8c8d",
];

export function generateAvatarByName(name, className) {
  const nameSplits = name.split(" ");
  const representativeName =
    nameSplits[0].charAt(0).toUpperCase() +
    nameSplits[nameSplits.length - 1].charAt(0).toUpperCase();
  const colorIndex = representativeName.charCodeAt(0) % bgColors.length;
  return (
    <div
      className={`avatar ${className}`}
      style={{ background: bgColors[colorIndex] }}
    >
      {representativeName}
    </div>
  );
}
