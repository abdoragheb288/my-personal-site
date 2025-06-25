async function loadPortfolioData() {
  const response = await fetch('json.json');
  const data = await response.json();
  return data;
}

function renderHero(data) {
  const hero = document.getElementById('hero');
  hero.innerHTML = `
    <div style="max-width:800px;margin:auto;padding:2rem 1rem;">
      <h1>${data.website_name}</h1>
      <p>${data.introduction}</p>
    </div>
  `;
}

function renderAbout(data) {
  const about = document.getElementById('about');
  const exp = data.portfolio_and_experience;
  about.innerHTML = `
    <h2>About</h2>
    <p><strong></strong> ${exp.design_philosophy}</p>
    <p><strong>Areas of Work:</strong> ${exp.areas_of_work.join(', ')}</p>
    <p><strong>Technical Skills:</strong> ${exp.technical_skills.join(', ')}</p>
    <div>
      <strong>Experience:</strong>
      <ul>
        <li>${exp.experience.students_mentored}</li>
        <li>${exp.experience.mentor_sessions_conducted}</li>
        <li>${exp.experience.feedback_provided}</li>
      </ul>
    </div>
    <p><strong>Collaborations:</strong> ${exp.collaborations}</p>
  `;
}

function renderPortfolio(data) {
  const portfolio = document.getElementById('portfolio');
  // بيانات مشاريع وهمية (معروضة بشكل زجاجي)
  const projects = [
    {
      title: "E-Commerce Store",
      description: "A modern online shop built with ReactJS and Tailwind, featuring product filtering and secure checkout.",
      link: "https://example.com/ecommerce"
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio website to showcase web development and UI/UX design projects.",
      link: "https://example.com/portfolio"
    },
    {
      title: "Dashboard Analytics",
      description: "Interactive dashboard for business analytics with real-time charts and user management.",
      link: "https://example.com/dashboard"
    },
    {
      title: "Blog Platform",
      description: "A blogging platform with user authentication, post creation, and comment functionality.",
      link: "https://example.com/blog"
    }
  ];

  portfolio.innerHTML = `
    <h2>Recent Work</h2>
    <div class="projects-grid">
      ${projects.map(project => `
        <div class="project-card">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <a href="${project.link}" target="_blank" rel="noopener">View Project</a>
        </div>
      `).join('')}
    </div>
  `;
}

function renderStartups(data) {
  const startups = document.getElementById('startups');
  startups.innerHTML = `
    <h2>Startup Projects</h2>
    <p>${data.portfolio_and_experience.startup_projects_overview}</p>
    <p>List of projects categorized by status. (Add project data in JSON for full implementation.)</p>
  `;
}

function renderTestimonials(data) {
  const testimonials = document.getElementById('testimonials');
  testimonials.innerHTML = `
    <h2>Testimonials</h2>
    <p>Feedback from people he has worked with. (Add testimonials in JSON for full implementation.)</p>
  `;
}

function renderContact(data) {
  const contact = document.getElementById('contact');
  contact.innerHTML = `
    <h2>Contact</h2>
    <p>For potential collaborations, please <a href="mailto:abdoragheb288@gmail.com">get in touch</a>.</p>
  `;
}

function setYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

window.addEventListener('DOMContentLoaded', async () => {
  const data = await loadPortfolioData();
  renderHero(data);
  renderAbout(data);
  renderPortfolio(data);
  renderStartups(data);
  renderTestimonials(data);
  renderContact(data);
  setYear();
});
