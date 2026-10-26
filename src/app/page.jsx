'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import StripeBackground from './StripeBackground';
import { ArrowUpRight, ArrowDown, Github, Linkedin, Facebook, Instagram, Mail, MapPin, Menu, X, Code2, Database, Palette, GitBranch, ExternalLink, GraduationCap, Sparkles, Send, ChevronRight } from 'lucide-react';

// Public profile links supplied by Joey. Add an email address when available.
const profile = {
  name: 'Joey Allonar',
  initials: 'JA',
  title: 'Information Technology Student',
  location: 'Panabo City, Davao del Norte, Philippines',
  email: '',
  github: 'https://github.com/vami-allonar',
  linkedin: 'https://www.linkedin.com/in/joey-allonar-565a3038a/',
  facebook: 'https://www.facebook.com/joey.allonar.56/',
  instagram: 'https://www.instagram.com/joeyl.allonar/',
  photo: '/profile.jpg', // Optional: upload your professional portrait to public/profile.jpg
};
const navigation = ['About', 'Education', 'Skills', 'Projects', 'Profiles', 'Experience', 'Contact'];
const skills = [
  {name:'HTML & CSS',kind:'Frontend',icon:Code2},
  {name:'JavaScript',kind:'Learning & building',icon:Code2},
  {name:'Next.js & React',kind:'Web development',icon:Code2},
  {name:'Git & GitHub',kind:'Version control',icon:GitBranch},
  {name:'PostgreSQL',kind:'Database fundamentals',icon:Database},
  {name:'UI / UX Design',kind:'Design fundamentals',icon:Palette},
];
const blueWasteRepository = 'https://github.com/ivan3-5/bluewaste-system';
const projects = [
  {num:'01',name:'BlueWaste',type:'Capstone · Ongoing',description:'A smart waste-management platform concept supporting citizen reports and city-side monitoring for Panabo City.',tags:['Next.js','Express','Prisma','PostgreSQL'],github:blueWasteRepository,demo:'',image:'/projects/bluewaste.jpg',imageAlt:'BlueWaste smart waste management website for Panabo City',imageWidth:1920,imageHeight:1080},
  {num:'02',name:'FixFinder',type:'Startup concept',description:'A proposed platform connecting people who need household repairs with electricians, plumbers, carpenters and other service providers.',tags:['Product Design','UI / UX','System Analysis'],github:'',demo:'',image:'/projects/fixfinder.png',imageAlt:'FixFinder logo with a wrench inside a blue and orange location pin',imageWidth:853,imageHeight:700,logo:true},
  {num:'03',name:'Personal CV Website',type:'Personal project · 2026',description:'A responsive personal website that presents my background, technical skills, projects and professional goals.',tags:['Next.js','React','CSS','Vercel'],github:'',demo:'',image:'/projects/personal-cv.png',imageAlt:'Personal Curriculum Vitae website of Joey L. Allonar',imageWidth:1920,imageHeight:1080},
];

function Reveal({children,className=''}) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : {opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.1}} transition={{duration:reduced ? 0 : 0.6,ease:'easeOut'}}>{children}</motion.div>;
}
function SectionHeading({eyebrow,title,description}) {
  return <Reveal><div className="section-head"><span className="eyebrow"><span className="eyebrow-dot"/> {eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div></Reveal>;
}
function SafeLink({href,children,className='',label}) {
  return href ? <a className={className} href={href} target={href.startsWith('#')?'_self':'_blank'} rel={href.startsWith('#')?undefined:'noopener noreferrer'} aria-label={label}>{children}</a> : <span className={className+' inactive'} title="Add your profile URL in src/app/page.jsx">{children}</span>;
}
export default function Home() {
  const [menuOpen,setMenuOpen] = useState(false);
  const [active,setActive] = useState('About');
  const [portraitOK,setPortraitOK] = useState(true);
  useEffect(()=>{
    const sectionObserver = new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)setActive(entry.target.dataset.nav)})},{rootMargin:'-25% 0px -60% 0px'});
    document.querySelectorAll('[data-nav]').forEach(el=>sectionObserver.observe(el));
    return ()=>{sectionObserver.disconnect()};
  },[]);
  return <>
    <header className="site-header"><div className="shell header-inner">
      <a href="#home" className="brand" aria-label="Home"><span className="brand-symbol">J<span>.</span></span><span className="brand-word">ALLONAR<span className="muted"> / CV</span></span></a>
      <nav className={menuOpen?'nav open':'nav'} aria-label="Main navigation">{navigation.map(item=><a key={item} className={active===item?'active':''} onClick={()=>setMenuOpen(false)} href={'#'+item.toLowerCase()}>{item}</a>)}</nav>
      <a className="header-cta" href="#contact">Let’s connect <ArrowUpRight size={15}/></a>
      <button className="menu-button" aria-label={menuOpen?'Close menu':'Open menu'} aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
    </div></header>
    <main>
      <section className="hero" id="home"><StripeBackground/><div className="hero-grid shell">
        <div className="hero-copy"><div className="availability"><span className="pulse"/> OPEN TO LEARNING & OPPORTUNITIES</div>
          <div className="hero-heading"><span className="kicker">HELLO, I’M</span><h1>Joey<br/><span>Allonar<span className="hero-period">.</span></span></h1></div>
          <p className="hero-role">Information Technology Student <span className="separator">/</span> Aspiring Web Developer</p>
          <p className="hero-description">I enjoy turning ideas into practical digital experiences. I’m building my skills in web development, interface design, and system analysis—one project at a time.</p>
          <div className="hero-actions"><a className="primary-btn" href="#projects">Explore my work <ArrowUpRight size={18}/></a><a className="text-btn" href="#about">More about me <ArrowDown size={17}/></a></div>
          <div className="hero-socials"><SafeLink href={profile.github} label="GitHub"><Github size={19}/></SafeLink><SafeLink href={profile.linkedin} label="LinkedIn"><Linkedin size={19}/></SafeLink><SafeLink href={profile.facebook} label="Facebook"><Facebook size={19}/></SafeLink><SafeLink href={profile.instagram} label="Instagram"><Instagram size={19}/></SafeLink><span className="social-line"/><span>BASED IN DAVAO DEL NORTE, PH</span></div>
        </div>
        <div className="hero-art"><div className="art-corner top-left"/><div className="art-corner bottom-right"/><div className="portrait-card"><div className="portrait-glow"/>{portraitOK ? <img src={profile.photo} alt="Professional portrait of Joey Allonar" onError={()=>setPortraitOK(false)}/> : <div className="portrait-placeholder"><span>JA</span><small>ADD YOUR PORTRAIT<br/>public/profile.jpg</small></div>}<div className="portrait-bottom"><span>DEVELOPING IDEAS INTO REALITY</span><span>01 / 01</span></div></div><div className="floating-card"><span className="floating-icon"><Code2 size={22}/></span><div><strong>Building for the web</strong><span>Design · Develop · Improve</span></div></div></div>
      </div><a href="#about" className="scroll-cue">SCROLL TO EXPLORE <span>↓</span></a></section>
      <div className="marquee" aria-hidden="true"><div>CURIOUS MIND <span>✳</span> CREATIVE THINKING <span>✳</span> PROBLEM SOLVING <span>✳</span> ALWAYS LEARNING <span>✳</span> CURIOUS MIND <span>✳</span> CREATIVE THINKING <span>✳</span> PROBLEM SOLVING <span>✳</span> ALWAYS LEARNING <span>✳</span></div></div>
      <section className="section about-section" id="about" data-nav="About"><div className="shell two-column"><div><SectionHeading eyebrow="01 / INTRODUCTION" title={<>More than just<br/><em>the code.</em></>}/><Reveal><div className="about-label">THE PERSON BEHIND THE PROJECTS <span>↗</span></div></Reveal></div><Reveal><div className="about-content"><p className="about-lead">I'm a fourth-year BS Information Technology student with a growing passion for creating useful digital solutions.</p><p>I enjoy learning how websites and systems work, exploring clean interfaces, and collaborating on projects that solve everyday problems. My academic experience has introduced me to system analysis, web development, databases, and project planning.</p><p>My goal is to keep improving as a developer, contribute to a professional team, and create digital products that make a real difference.</p><div className="about-facts"><div><span>LOCATION</span><strong>Panabo City, Philippines</strong></div><div><span>FOCUS</span><strong>Web Development & UI / UX</strong></div><div><span>CURRENTLY</span><strong>Fourth-year BSIT Student</strong></div></div></div></Reveal></div></section>
      <section className="section education-section" id="education" data-nav="Education"><div className="shell"><SectionHeading eyebrow="02 / EDUCATION" title={<>Where I'm <em>learning.</em></>} description="My academic foundation and journey into technology."/><Reveal><div className="education-card"><div className="edu-icon"><GraduationCap size={30}/></div><div className="edu-content"><div className="edu-top"><span className="pill">CURRENT EDUCATION</span><span className="edu-status"><span/> IN PROGRESS</span></div><h3>Davao del Norte State College</h3><p className="edu-degree">Bachelor of Science in Information Technology</p><div className="edu-detail"><span>Panabo City, Davao del Norte</span><span>4th Year Student · 2026</span></div></div><ChevronRight className="edu-arrow" size={23}/></div></Reveal></div></section>
      <section className="section skill-section" id="skills" data-nav="Skills"><div className="shell"><SectionHeading eyebrow="03 / TOOLKIT" title={<>Skills I'm <em>building.</em></>} description="Tools and disciplines I use and continue to explore."/><div className="skill-grid">{skills.map((skill,index)=><Reveal key={skill.name}><article className="skill-card"><div className="skill-top"><span className="skill-number">0{index+1}</span><skill.icon size={27} strokeWidth={1.5}/></div><div><h3>{skill.name}</h3><p>{skill.kind}</p></div></article></Reveal>)}</div><Reveal><div className="soft-skills"><span>ALSO VALUE</span><div><span>Problem Solving</span><span>Communication</span><span>Teamwork</span><span>Adaptability</span><span>Continuous Learning</span></div></div></Reveal></div></section>
      <section className="section projects-section" id="projects" data-nav="Projects"><div className="shell"><div className="projects-heading"><SectionHeading eyebrow="04 / SELECTED WORK" title={<>Ideas into <em>projects.</em></>} description="Selected academic and personal projects that reflect what I'm learning."/><span className="project-count">03 SELECTED PROJECTS</span></div><div className="project-list">{projects.map(project=><Reveal key={project.num}><article className="project-row"><a className={'project-art project-preview'+(project.logo?' project-logo':'')} href={project.image} target="_blank" rel="noopener noreferrer" aria-label={'View full image of '+project.name}><img src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight} loading="lazy" decoding="async"/></a><div className="project-info"><div className="project-overline"><span>PROJECT {project.num}</span><span>{project.type}</span></div><h3>{project.name}<ArrowUpRight size={25}/></h3><p>{project.description}</p><div className="tech-tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div><div className="project-links"><SafeLink href={project.github}><Github size={17}/> Source code</SafeLink><SafeLink href={project.demo}><ExternalLink size={17}/> Live preview</SafeLink></div></div></article></Reveal>)}</div></div></section>
      <section className="section growth-section" id="growth"><div className="shell"><SectionHeading eyebrow="05 / LEARNING & GROWTH" title={<>Continuing to <em>grow.</em></>} description="Building my experience through coursework, personal projects, and continuous learning."/><Reveal><p className="growth-copy">My goal is to keep improving as a developer, contribute to a professional team, and create digital products that make a real difference.</p></Reveal></div></section>
      <section className="contact-section" id="contact" data-nav="Contact"><div className="shell contact-content"><Reveal><span className="eyebrow"><span className="eyebrow-dot"/> 06 / LET'S CONNECT</span><h2>Have an idea?<br/><em>Let's talk.</em></h2><p>I'm open to learning opportunities, collaborations, internships, and conversations about technology and design.</p><SafeLink href={profile.linkedin} className="contact-btn">Connect on LinkedIn <ArrowUpRight size={20}/></SafeLink><div className="contact-social"><SafeLink href={profile.github}><Github size={20}/> GitHub</SafeLink><SafeLink href={profile.linkedin}><Linkedin size={20}/> LinkedIn</SafeLink><SafeLink href={profile.facebook}><Facebook size={20}/> Facebook</SafeLink><SafeLink href={profile.instagram}><Instagram size={20}/> Instagram</SafeLink></div></Reveal><div className="contact-shape" aria-hidden="true">J<span>.</span></div></div></section>

      <section className="section profile-section" id="profiles" data-nav="Profiles"><div className="shell"><SectionHeading eyebrow="07 / GITHUB PROFILE" title={<>Explore my <em>GitHub.</em></>} description="My personal GitHub account and selected development work."/><Reveal><div className="profile-link-card"><span className="profile-link-icon"><Github size={30}/></span><div><h3>vami-allonar</h3><p>github.com/vami-allonar</p></div><SafeLink href={profile.github} className="primary-btn">View GitHub <ArrowUpRight size={18}/></SafeLink></div><div className="project-links"><SafeLink href={blueWasteRepository}><Github size={17}/> Selected repository: BlueWaste system <ArrowUpRight size={15}/></SafeLink></div></Reveal></div></section>
      <section className="section profile-section profile-section-alt" id="linkedin" data-nav="Profiles"><div className="shell"><SectionHeading eyebrow="08 / LINKEDIN PROFILE" title={<>Let's connect <em>professionally.</em></>} description="Find my professional profile on LinkedIn."/><Reveal><div className="profile-link-card"><span className="profile-link-icon"><Linkedin size={30}/></span><div><h3>Joey Allonar</h3><p>LinkedIn profile</p></div><SafeLink href={profile.linkedin} className="primary-btn">View LinkedIn <ArrowUpRight size={18}/></SafeLink></div></Reveal></div></section>
      <section className="section profile-section" id="social-media" data-nav="Profiles"><div className="shell"><SectionHeading eyebrow="09 / SOCIAL MEDIA LINKS" title={<>Find me <em>online.</em></>} description="Connect with me on my public social accounts."/><div className="social-profile-grid">{[{name:'Facebook',href:profile.facebook,icon:Facebook},{name:'Instagram',href:profile.instagram,icon:Instagram},{name:'LinkedIn',href:profile.linkedin,icon:Linkedin},{name:'GitHub',href:profile.github,icon:Github}].map(social=><Reveal key={social.name}><SafeLink href={social.href} className="social-profile-card"><social.icon size={26}/><span>{social.name}</span><ArrowUpRight size={18}/></SafeLink></Reveal>)}</div></div></section>
      <section className="section experience-section" id="experience" data-nav="Experience"><div className="shell"><SectionHeading eyebrow="10 / EXPERIENCE" title={<>Learning by <em>doing.</em></>} description="Academic work and hands-on experience while preparing for my career."/><div className="timeline"><Reveal><div className="timeline-item"><div className="timeline-date">2026 — PRESENT</div><div className="timeline-body"><span className="timeline-dot"/><h3>BlueWaste · Capstone Project · System Analyst</h3><p className="timeline-org">Academic Project / Davao del Norte State College</p><p>Participating in system planning, requirements understanding, and development coordination for the BlueWaste smart waste-management project.</p><div className="project-links"><SafeLink href={blueWasteRepository} label="View BlueWaste system repository on GitHub"><Github size={17}/> View BlueWaste repository <ArrowUpRight size={15}/></SafeLink></div></div></div></Reveal><Reveal><div className="timeline-item"><div className="timeline-date">ACADEMIC PROJECT</div><div className="timeline-body"><span className="timeline-dot"/><h3>FixFinder · Product Concept</h3><p className="timeline-org">Technopreneurship Project</p><p>Developed a service-platform concept with user roles, key features, target users, and a product pitch.</p></div></div></Reveal></div><Reveal><div className="experience-note"><Sparkles size={20}/><span>Currently building my experience through coursework, personal projects, and continuous learning.</span></div></Reveal></div></section>
    </main>
    <footer><div className="shell footer-content"><span>© {new Date().getFullYear()} JOEY ALLONAR. ALL RIGHTS RESERVED.</span><span className="built-with">Built with: Next.js, WebGL, three.js, Framer Motion</span><a href="#home">BACK TO TOP ↑</a></div></footer>
  </>;
}
