document.addEventListener("DOMContentLoaded", () => {
  function loadHTML(id, file) {
    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error("Could not load " + file);
        return response.text();
      })
      .then(data => {
        document.getElementById(id).innerHTML = data;

        // reattach menu toggle if header is loaded
        if (id === "header") {
          const menuBtn = document.getElementById("menu-btn");
          const mobileMenu = document.getElementById("mobile-menu");
          menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
          });
        }
      })
      .catch(err => console.error(err));
  }

  loadHTML("header", "header.html");
  loadHTML("footer", "footer.html");
});

// Data for projects
const projects = [
  {
    name: "QuizApp",
    description: "QuizApp is a feature-rich quiz platform developed with React, Firebase, and Vite. It enables users to authenticate, create quizzes, and participate in real-time with an integrated leaderboard system. The application also generates completion certificates, ensuring both engagement and achievement tracking, while Firebase Firestore provides secure data handling and scalability.",
    img: "HomePage.png",
    tech: ["React.js", "Firebase", "Vite"],
    link: "https://mansikanchan2003.github.io/quizz-app/"
  },
  {
    name: "BuzzBot",
    description: "BuzzBot is an AI-powered chatbot integrated into a React-based chat application. It leverages the OpenAI API to provide natural language responses, while React Context API efficiently manages chatbot state and message flow. The chatbot delivers an intuitive and interactive user experience with real-time rendering and seamless handling of asynchronous API calls.",
    img: "Buzzbot.png",
    tech: ["React.js", "OpenAI API"],
    link: "https://github.com/mansikanchan2003/buzzbot"
  },
  {
    name: "BuzzChat",
    description: "BuzzChat is a real-time chat application built with Java and Firebase, featuring secure authentication and cloud-based messaging. It allows users to log in, update their profiles, and share media files using Firebase Storage. With RecyclerView and custom adapters, the app ensures smooth and dynamic chat rendering while maintaining a clean and responsive user interface.",
    img: "BuzzChat.png",
    tech: ["Java", "Android Studio", "Firebase"],
    link: "https://github.com/mansikanchan2003/BuzzChat2"
  }
];

// Data for skills
const skills = [
  "Java (Advanced)",
  "React.js",
  "JavaScript",
  "HTML/CSS",
  "Data Structures & Algorithms",
  "API Integration (Firebase)",
  "Problem Solving & Debugging",
  "Clean Code Practices",
  "Software Development Life Cycle (SDLC)",
  "C++ (Intermediate)",
  "Python (Basic)",
  "Git & GitHub",
  "Android Studio",
  "Spring Boot"
];

// Render projects dynamically
const projectsContainer = document.getElementById('projects-container');
projects.forEach((project, index) => {
  const projectWrapper = document.createElement('div');
  projectWrapper.className = "relative flex flex-col md:flex-row items-center gap-6";

  // Image (outside card, positioned in front)
  const imgEl = document.createElement('img');
  imgEl.src = project.img;
  imgEl.alt = `${project.name} Screenshot`;
  imgEl.className = "w-full md:w-1/2 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 z-10";

  // Card
  const projectEl = document.createElement('div');
  projectEl.className = "electric-card bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col justify-between w-full md:w-1/2 relative z-0";
  projectEl.innerHTML = `
    <h3 class="text-2xl font-semibold mb-3 text-indigo-400">${project.name}</h3>
    <p class="text-gray-300 mb-4 flex-grow">${project.description}</p>
    <strong class="text-indigo-300">Technologies:</strong>
    <ul class="flex flex-wrap gap-2 mt-2 mb-4">
      ${project.tech.map(t => `<li class="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">${t}</li>`).join('')}
    </ul>
    <a href="${project.link}" target="_blank" rel="noopener" class="btn-primary self-start">View Project</a>
  `;

  // Alternate layout (zig-zag style like the example site)
  if (index % 2 === 0) {
    projectWrapper.appendChild(imgEl);
    projectWrapper.appendChild(projectEl);
  } else {
    projectWrapper.appendChild(projectEl);
    projectWrapper.appendChild(imgEl);
  }

  projectsContainer.appendChild(projectWrapper);
});

// Render skills dynamically
const skillsContainer = document.getElementById('skills-container');
skills.forEach(skill => {
  const skillEl = document.createElement('span');
  skillEl.className = "bg-indigo-700 text-indigo-100 px-4 py-2 rounded-full text-sm font-medium shadow-sm";
  skillEl.textContent = skill;
  skillsContainer.appendChild(skillEl);
});


// Intersection Observer for fade-in sections
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  observer.observe(section);
});
