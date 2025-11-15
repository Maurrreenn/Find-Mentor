// tracks.js
const TRACKS = {
  frontend: [
    { name: "Alice Wong", expertise: "frontend", bio: "React & TypeScript", availability: "available" },
    { name: "Ben Carter", expertise: "frontend", bio: "Vue Expert", availability: "busy" }
  ],
  backend: [
    { name: "David Kim", expertise: "backend", bio: "Node.js & GraphQL", availability: "available" }
  ],
  dataScience: [
    { name: "Grace Liu", expertise: "data", bio: "ML Engineer", availability: "available" }
  ],
  devops: [
    { name: "Jack Ryan", expertise: "devops", bio: "AWS & Terraform", availability: "available" }
  ],
  mobile: [
    { name: "Kara Evans", expertise: "mobile", bio: "Flutter Dev", availability: "available" }
  ],
  security: [
    { name: "Liam Brooks", expertise: "security", bio: "Penetration Tester", availability: "busy" }
  ],
  cloud: [
    { name: "Mia Flores", expertise: "cloud", bio: "Azure Architect", availability: "available" }
  ],
  ai: [
    { name: "Noah Chen", expertise: "ai", bio: "LLM Specialist", availability: "available" }
  ],
  product: [
    { name: "Olivia Grant", expertise: "product", bio: "Technical PM", availability: "available" }
  ],
  design: [
    { name: "Paul Adams", expertise: "design", bio: "UX Researcher", availability: "busy" }
  ]
};

const TRACK_LIST = Object.keys(TRACKS).map(key => ({
  id: key,
  name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
}));

window.TRACKS = TRACKS;
window.TRACK_LIST = TRACK_LIST;
