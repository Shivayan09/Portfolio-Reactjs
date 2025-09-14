export default function ScrollSnapShowcase() {
  const projects = ["Project 1", "Project 2", "Project 3"];
  
  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll">
      {projects.map((p, i) => (
        <div
          key={i}
          className="h-screen flex items-center justify-center bg-gray-900 text-white text-5xl snap-center"
        >
          {p}
        </div>
      ))}
    </div>
  );
}
