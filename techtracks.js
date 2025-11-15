// tracks.js
const TRACKS = {
  frontend: [
    { 
      name: "Maureen Amaechi", 
      expertise: "frontend", 
      bio: "React & TypeScript", 
      workdays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      image: "image/mentor 1.png"
    },
    { 
      name: "Ben Carter", 
      expertise: "frontend", 
      bio: "Vue Expert", 
      workdays: ["Wed", "Sat"],
      image: "image/mentor 2.jpg"
    }
  ],
  backend: [
    { 
      name: "David Kim", 
      expertise: "backend", 
      bio: "Node.js & GraphQL", 
      workdays: ["Mon", "Fri"],
      image: "image/mentor 3.jpg"
    }
  ],
  dataScience: [
    { 
      name: "Amechi Chidera", 
      expertise: "data", 
      bio: "ML Engineer", 
      workdays: ["Tue", "Thu"], 
      image: "image/mentor 4.jpg" 
    }
  ],
  devops: [
    { 
      name: "Jack Ryan", 
      expertise: "devops", 
      bio: "AWS & Terraform", 
      workdays: ["Mon", "Wed", "Fri"], 
      image: "image/mentor 9.jpg" 
    }
  ],
  mobile: [
    { 
      name: "Kara Evans", 
      expertise: "mobile", 
      bio: "Flutter Dev", 
      workdays: ["Sat", "Sun"], 
      image: "image/mentor 6.jpg" 
    }
  ],
  security: [
    { 
      name: "Liam Brooks", 
      expertise: "security", 
      bio: "Penetration Tester", 
      workdays: ["Mon"], 
      image: "image/mentor 7.jpg" 
    }
  ],
  cloud: [
    { 
      name: "Mia Flores", 
      expertise: "cloud", 
      bio: "Azure Architect", 
      workdays: ["Tue", "Wed", "Thu", "Fri"], 
      image: "image/mentor 8.jpg" 
    }
  ],
  ai: [
    { 
      name: "Noah Chen", 
      expertise: "ai", 
      bio: "LLM Specialist", 
      workdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], 
      image: "image/mentor 9.jpg" 
    }
  ],
  product: [
    { 
      name: "Olivia Grant", 
      expertise: "product", 
      bio: "Technical PM", 
      workdays: ["Wed", "Thu"], 
      image: "image/mentor 2.jpg" 
    }
  ],
  design: [
    { 
      name: "Paul Adams", 
      expertise: "design", 
      bio: "UX Researcher", 
      workdays: ["Fri", "Sat"], 
      image: "image/mentor 3.jpg" 
    }
  ]
};

const TRACK_LIST = Object.keys(TRACKS).map(key => ({
  id: key,
  name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
}));

window.TRACKS = TRACKS;
window.TRACK_LIST = TRACK_LIST;

console.log("tracks.js loaded:", TRACK_LIST);
