import React, {useEffect, useRef, useState} from "react";
import {createRoot} from "react-dom/client";
import {motion, useScroll, useTransform, useSpring} from "framer-motion";
import {ArrowUpRight, Github, Linkedin, Mail, Download, ChevronDown, ShieldCheck, Database, Server, Code2, GitBranch, Layers3, Send, Menu, X} from "lucide-react";
import "./styles.css";

const skills = {
  Backend: [
    ["Java","Core backend development"],
    ["Spring Boot","Production-style REST services"],
    ["Spring MVC","Layered web architecture"],
    ["Spring Security","JWT auth and RBAC"],
    ["JWT","Stateless authentication"],
    ["Hibernate","ORM and persistence"],
    ["Spring Data JPA","Repository/data access"],
    ["REST APIs","Service communication"],
    ["Servlets","Java web fundamentals"],
    ["Dependency Injection / IoC","Maintainable application design"]
  ],
  Database: [["MySQL","Relational application data"],["MongoDB","NoSQL database fundamentals"]],
  Frontend: [["React","Interactive frontend interfaces"],["JavaScript","Application logic"],["HTML","Semantic structure"],["Tailwind CSS","Utility-first UI styling"],["Bootstrap","Responsive UI components"]],
  "Tools & Workflow": [["Git","Version control"],["GitHub","Source collaboration"],["IntelliJ IDEA","Java development"],["Postman","API testing"],["Hoppscotch","API testing"],["Maven","Build and dependency management"],["Docker","Container fundamentals"],["Netlify","Frontend deployment"],["Render","Backend deployment"]]
};

const experience = [
  ["2026–2028","MCA","Dr. D. Y. Patil Vidyapeeth, Centre for Online Learning, Pimpri, Pune","In progress"],
  ["2023–2026","BCA","GH Raisoni University, Amravati","CGPA 8.81"],
  ["May 2025","AINCAT 2025","Naukri Campus","Certification"],
  ["March 2025","Hackathon Participation","GH Raisoni University","Certificate"],
];

const nav = ["Home","About","Skills","Projects","Experience","Contact"];

function Reveal({children, className=""}) {
  return <motion.div className={className} initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.16}} transition={{duration:.75,ease:[.16,1,.3,1]}}>{children}</motion.div>
}

function SectionTitle({eyebrow,title,desc}) {
  return <div className="section-title"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{desc && <p>{desc}</p>}</div>
}

function App(){
  const [active,setActive]=useState("Home"), [menu,setMenu]=useState(false), [sound,setSound]=useState(false), [sent,setSent]=useState(false);
  const audioRef=useRef(null);
  const playTone=(frequency=520)=>{ if(!sound) return; const C=window.AudioContext||window.webkitAudioContext; if(!C) return; audioRef.current ||= new C(); const c=audioRef.current; if(c.state === "suspended") c.resume(); const o=c.createOscillator(),g=c.createGain(); o.type="sine"; o.frequency.value=frequency; g.gain.setValueAtTime(.018,c.currentTime); g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.09); o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+.09); };
  const {scrollYProgress}=useScroll();
  const progress=useSpring(scrollYProgress,{stiffness:120,damping:18});
  const heroY=useTransform(scrollYProgress,[0,.3],[0,-80]);

  useEffect(()=>{
    const interactive=[...document.querySelectorAll("button, a")];
    const onClick=()=>playTone(560);
    const onHover=()=>playTone(390);
    interactive.forEach(el=>{el.addEventListener("click",onClick);el.addEventListener("mouseenter",onHover)});
    return ()=>interactive.forEach(el=>{el.removeEventListener("click",onClick);el.removeEventListener("mouseenter",onHover)});
  },[sound]);

  useEffect(()=>{
    const els=nav.map(n=>document.getElementById(n.toLowerCase())).filter(Boolean);
    const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting && setActive(e.target.id[0].toUpperCase()+e.target.id.slice(1))),{rootMargin:"-35% 0px -55% 0px"});
    els.forEach(e=>io.observe(e)); return ()=>io.disconnect();
  },[]);

  const go=(id)=>{setMenu(false);document.getElementById(id.toLowerCase())?.scrollIntoView({behavior:"smooth",block:"start"})};

  return <div className="app">
    <motion.div className="scroll-progress" style={{scaleX:progress}}/>
    <div className="noise"/>
    <div className="ambient ambient-a"/><div className="ambient ambient-b"/>
    <nav className="nav">
      <button className="brand" onClick={()=>go("Home")}>RM<span>.</span></button>
      <div className={"nav-links "+(menu?"open":"")}>{nav.map(n=><button key={n} className={active===n?"active":""} onClick={()=>go(n)}>{n}</button>)}</div>
      <button className="menu" onClick={()=>setMenu(!menu)} aria-label="Toggle navigation">{menu?<X/>:<Menu/>}</button>
    </nav>

    <main>
      <section id="home" className="hero section">
        <motion.div className="hero-grid" style={{y:heroY}}/><div className="hero-symbols"><span>✦</span><span>⌘</span><span>{ }</span><span>↗</span><span>◈</span></div>
        <div className="hero-content">
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.4}} className="status"><i/> Available for opportunities</motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:.4,duration:.8,ease:[.16,1,.3,1]}}>ROHIT<br/><span>MUTHAL</span></motion.h1>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.65,duration:.7}} className="role"><span/> <strong>Software Developer</strong><small>Specializing in Java Backend Development</small></motion.div>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.85,duration:.7}}>I build secure, scalable REST APIs and production-style backend systems with Java and Spring Boot — with a focus on clean architecture, security, and reliability.</motion.p>
          <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:1.05,duration:.7}} className="hero-actions">
            <button className="btn primary" onClick={()=>go("Projects")}>View Projects <ArrowUpRight size={17}/></button>
            <button className="btn ghost" onClick={()=>go("Contact")}>Contact Me <Mail size={16}/></button>
            <a className="btn text" href="/rohit-muthal-resume.pdf"><Download size={16}/> Resume</a>
          </motion.div>
        </div>
        <div className="hero-meta"><span>PUNE, INDIA</span><span>JAVA · SPRING · REST</span><span>SCROLL ↓</span></div>
      </section>

      <section id="about" className="section about">
        <SectionTitle eyebrow="01 / ABOUT" title="Software Developer with a growth mindset." desc="I focus on building useful software, learning new technologies, adapting to AI, and improving every detail of the experience."/>
        <div className="about-grid">
          {[
            ["Introduction","I am a software developer focused on building practical, reliable applications and continuously improving my engineering fundamentals."],
            ["Learning mindset","I enjoy learning new technologies, adapting to modern tools, and exploring how AI can make software smarter and more useful."],
            ["Design principles","I care about clean architecture, readable code, responsive interfaces, thoughtful UX, and small details that make products feel polished."],
            ["Current focus","My current focus is software development with Java, Spring Boot, databases, frontend integration, AI learning, and stronger design principles."]
          ].map(([a,b],i)=><Reveal key={a}><article className="info-card"><span>0{i+1}</span><h3>{a}</h3><p>{b}</p></article></Reveal>)}
        </div>
      </section>

      <section id="skills" className="section">
        <SectionTitle eyebrow="02 / STACK" title="Tools I actually use." desc="No fake percentages. No inflated buzzword list. Just the stack represented by the source brief."/>
        <div className="skill-groups">{Object.entries(skills).map(([group,items])=><Reveal key={group}><div className="skill-group"><h3>{group}</h3><div className="skill-list">{items.map(([name,desc])=><motion.div whileHover={{y:-5,rotateX:2,rotateY:-2}} transition={{type:"spring",stiffness:120,damping:18}} className="skill-card" key={name}><div className="skill-icon">{group==="Backend"?<Server size={17}/>:group==="Database"?<Database size={17}/>:group==="Frontend"?<Code2 size={17}/>:<GitBranch size={17}/>}</div><div><strong>{name}</strong><small>{desc}</small></div></motion.div>)}</div></div></Reveal>)}</div>
        <div className="also"><span>Also familiar with</span> Python · SQL · Power BI · Excel</div>
      </section>

      <section id="projects" className="section projects">
        <SectionTitle eyebrow="03 / PROJECTS" title="One project. Deeply understood." desc="A backend-focused case study instead of a gallery of shallow cards."/>
        <Reveal><article className="project-card">
          <div className="project-top"><span className="project-number">01</span><span className="project-label">FEATURED SYSTEM</span></div>
          <div className="project-main"><div><h3>AI-EMS</h3><h4>Employee Management System</h4><p>A role-based employee management platform built with Java and Spring Boot, using a layered Controller → Service → Repository → Database architecture.</p><div className="badges">{["Java","Spring Boot","Spring Security","JWT","Hibernate","JPA","MySQL","React","Tailwind CSS","Maven","REST APIs","MongoDB","Bootstrap"].map(x=><span key={x}>{x}</span>)}</div></div><div className="project-side"><div className="metric"><strong>3</strong><span>roles</span></div><div className="metric"><strong>10</strong><span>modules</span></div><a href="https://github.com/RohitMuthal7" target="_blank" rel="noreferrer" className="btn primary">GitHub <Github size={16}/></a></div></div>
          <div className="feature-row">{["Employee · Department · Attendance","Leave · Holiday · Payroll","Profile · Notification · Dashboard","Reporting + secure role access"].map((x,i)=><div key={x}><span>0{i+1}</span>{x}</div>)}</div>
        </article></Reveal>
      </section>

      <section className="section showcase">
        <SectionTitle eyebrow="04 / SYSTEM" title="How AI-EMS is structured." desc="The architecture is the story — not decoration."/>
        <div className="architecture">
          {["Controller","Service","Repository","Database"].map((x,i)=><React.Fragment key={x}><motion.div className="arch-node" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.15}}><span>0{i+1}</span><Layers3 size={20}/><strong>{x}</strong><small>{i===0?"HTTP endpoints":i===1?"Business logic":i===2?"Data access":"MySQL"}</small></motion.div>{i<3&&<motion.div className="arch-line" initial={{scaleX:0}} whileInView={{scaleX:1}} viewport={{once:true}} transition={{delay:.2+i*.15,duration:.5}}/>}</React.Fragment>)}
        </div>
        <div className="security-strip"><ShieldCheck size={24}/><div><strong>Security is part of the architecture.</strong><span>BCrypt password hashing · JWT authentication · input validation · global exception handling</span></div></div>
      </section>

      <section id="experience" className="section timeline-section">
        <SectionTitle eyebrow="05 / JOURNEY" title="Education & milestones."/>
        <div className="timeline">{experience.map(([date,title,org,note],i)=><Reveal key={title+date}><div className="timeline-item"><div className="timeline-dot"/><time>{date}</time><div><h3>{title}</h3><p>{org}</p><span>{note}</span></div></div></Reveal>)}</div>
      </section>

      <section className="section workflow">
        <SectionTitle eyebrow="06 / WORKFLOW" title="From code to application." desc="A practical toolchain from coding to deployment, including Netlify and Render."/>
        <div className="flow">{["IntelliJ IDEA","Git / GitHub","Maven Build","Spring Boot","MySQL / MongoDB","REST API","Netlify / Render"].map((x,i)=><React.Fragment key={x}><div className="flow-node"><span>{String(i+1).padStart(2,"0")}</span>{x}</div>{i<6&&<div className="flow-arrow">→</div>}</React.Fragment>)}</div>
      </section>

      <section id="contact" className="section contact">
        <div className="contact-copy"><span className="eyebrow">07 / CONTACT</span><h2>Let's build<br/><em>something great.</em></h2><p>Have a backend problem worth solving? Let's talk.</p><div className="contact-links"><a href="mailto:muthalrohit07@gmail.com"><Mail size={17}/> muthalrohit07@gmail.com</a><a href="https://github.com/RohitMuthal7" target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a><a href="https://www.linkedin.com/in/rohit-muthal" target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn</a></div></div>
        <form className="contact-form" onSubmit={e=>{e.preventDefault();const f=e.currentTarget;const subject="Portfolio Contact from "+f.name.value;const body=`Name: ${f.name.value}\nEmail: ${f.email.value}\n\nMessage:\n${f.message.value}`;window.location.href="mailto:muthalrohit07@gmail.com?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);setSent(true);f.reset()}}><label>Name<input required name="name" placeholder="Your name"/></label><label>Email<input required type="email" name="email" placeholder="you@example.com"/></label><label>Message<textarea required name="message" rows="5" placeholder="Tell me what you're building..."/></label><button className="btn primary" type="submit">{sent?"Email Draft Opened":"Send Message"} <Send size={16}/></button><small>Clicking send opens your email app with the complete form details.</small></form>
      </section>
    </main>
    <footer><span>ROHIT MUTHAL © 2026</span><span>SOFTWARE DEVELOPER · JAVA BACKEND SPECIALIST</span><button onClick={()=>{setSound(!sound); if(!sound) setTimeout(()=>playTone(660),0)}} className="sound" aria-label="Toggle interface sound">{sound?"SOUND ON":"SOUND OFF"}</button></footer>
  </div>
}
createRoot(document.getElementById("root")).render(<App/>);