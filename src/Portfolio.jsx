import { useEffect, useState } from "react";
import Profile from "./assets/profile.jpeg";
import toast from "react-hot-toast";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaJava,
  FaPython,
  FaReact,
  FaGithub,
} from "react-icons/fa";

import { SiMysql, SiMongodb } from "react-icons/si";
function Portfolio(){
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: "",
});
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

useEffect(() => {
  fetch("http://localhost:5000/profile")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setProfile(data);
    })
    .catch((err) => console.log(err));
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    toast.success("Message Sent Successfully!");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong!");}
};

    return(
        <>
        
  <nav className="navbar">
      <h2 className="logo">Ritika</h2>
            
            
 <ul className="nav-links">
               
 <li><a href="#home">Home</a></li>
  <li><a href="#about">About</a></li>
  <li><a href="#skills">Skills</a></li>
   <li><a href="#education">Education</a></li>
  <li><a href="#projects">Projects</a></li>
  <li><a href="#contact">Contact</a></li>
</ul>
        
        </nav>
        
      {/* Hero */}
      <section className="hero" id="home">

  <div className="hero-left">
    <img src={Profile} alt="Ritika Rajput" className="profile-img" />
  </div>

  <div className="hero-right">
   <h1>Hi, I'm {profile.name}</h1>
<h2>{profile.role}</h2>
<p>{profile.about}</p>
  <div className="social-links">
  <a href="/my_resume.pdf" className="btn" download>
    Download Resume
  </a>

  <a href="mailto:ritika21520001@gmail.com" className="btn">
    Contact Me
  </a>
</div>

<div className="social-links">
  <a
    href="https://github.com/RitikaRajputRR"
    target="_blank"
    rel="noopener noreferrer"
    className="btn"
  >
    GitHub
  </a>

  <a
    href="https://www.linkedin.com/in/ritika-rajput-696400315/"
    target="_blank"
    rel="noopener noreferrer"
    className="btn"
  >
    LinkedIn
  </a>
</div>
  </div>
</section>

      {/* About */}
      <section className="about" id="about">
        <h2>About Me</h2>
        <p> Hellow, I'm Ritika Rajput, a passionate Software Developer with a strong interest in building modern, responsive, and user-friendly applications. I enjoy solving problems through code and developing clean, efficient, and scalable solutions. My primary skills include HTML, CSS, JavaScript, React.js, and Git/GitHub. I am always eager to learn new technologies, improve my development skills,
           and contribute to meaningful projects. I am currently seeking opportunities to grow as a Software Developer while creating impactful software solutions.</p>
      </section>

      {/* Skills */}
      <section className="skills"id="skills">
        <h2>Skills</h2>
        
       <div className="skills-container">

  <div className="skill-card">
    <FaHtml5 className="skill-icon html" />
    <p>HTML</p>
  </div>

  <div className="skill-card">
    <FaCss3Alt className="skill-icon css" />
    <p>CSS</p>
  </div>

  <div className="skill-card">
    <FaJs className="skill-icon js" />
    <p>JavaScript</p>
  </div>

  <div className="skill-card">
    <FaJava className="skill-icon java" />
    <p>Java</p>
  </div>

  <div className="skill-card">
    <FaPython className="skill-icon python" />
    <p>Python</p>
  </div>

  <div className="skill-card">
    <FaReact className="skill-icon react" />
    <p>React JS</p>
  </div>

  <div className="skill-card">
    <SiMysql className="skill-icon mysql" />
    <p>MySQL</p>
  </div>

  <div className="skill-card">
    <SiMongodb className="skill-icon mongo" />
    <p>MongoDB</p>
  </div>

  <div className="skill-card">
    <FaGithub className="skill-icon github" />
    <p>GitHub</p>
  </div>

  <div className="skill-card">
    💻
    <p>Responsive Design</p>
  </div>

</div>
      </section>

      {/* Projects */}
      <section className="projects" id="projects">
        <h2>Projects</h2>
        <div className="project-container">
         <div className="project-card">
            <h3>Portfolio Website</h3>
      <p>
        Personal portfolio built with React.js showcasing my skills and
        projects.
      </p>

      <button>View Project</button>
         </div>

         <div className="project-card">
         <h3>Weather App</h3>
      <p>
        Weather application using React and Weather API.
      </p>

      <button>View Project</button>
         </div>

         <div className="project-card">
          <h3>To-Do App</h3>
      <p>
        Task management application using React.js.
      </p>

      <button>View Project</button>
    </div>

    </div>


      </section>
  {/* Education */}
      <section className="education" id="education">
        <h2>Education</h2>
        
        <div className="education-card">
            <h3>Master's of Computer Application</h3>
            <p>Shri Shankaracharya Professional University bhilai,(C.G)</p>
            <span>2022-2024</span>
        </div>
      </section>

  {/* Contact */}
<section className="contact" id="contact">
  <h2>Contact Me</h2>

<form onSubmit={handleSubmit}>
  
    <input
  type="text"
  name="name"
  placeholder="Enter Your Name"
  value={formData.name}
  onChange={handleChange}
  required/>

   <input
  type="email"
  name="email"
  placeholder="Enter Your Email"
  value={formData.email}
  onChange={handleChange}
  required/>

   <textarea
  name="message"
  placeholder="Enter Your Message"
  value={formData.message}
  onChange={handleChange}
  required>

</textarea>

    <button type="submit">
      Send Message
    </button>
  </form>
</section> 
      

      {/* Footer */}
     <footer className="footer">
  <p>© 2026 Ritika Rajput | Built with React.js</p>
     </footer>
       </>
    );
}
export default Portfolio;






