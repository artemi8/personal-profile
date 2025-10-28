const profile = {
  name: 'Alex Taylor',
  headline: 'AI Engineer',
  heroSubtitle: 'AI Engineer crafting intelligent products with 4 years of industry experience.',
  github: 'alextaylor-ai',
  strengths: ['Applied Machine Learning', 'LLM Integration', 'ML Ops & Deployment', 'Experimentation Strategy'],
};

const skillGroups = [
  {
    title: 'Machine Learning & AI',
    items: ['Deep Learning (PyTorch, TensorFlow)', 'Generative AI & LLM orchestration', 'Computer Vision & NLP pipelines', 'Recommendation systems', 'Model evaluation & bias auditing'],
  },
  {
    title: 'Data & Infrastructure',
    items: ['Python, TypeScript, Go', 'Vector databases (Pinecone, Weaviate)', 'Streaming data (Kafka, Flink)', 'Cloud ML (AWS Sagemaker, GCP Vertex)', 'Experiment tracking (MLflow, Weights & Biases)'],
  },
  {
    title: 'Product & Collaboration',
    items: ['Roadmapping & stakeholder alignment', 'Leading cross-functional pods', 'Rapid prototyping & user research', 'Mentoring engineers & researchers', 'Technical storytelling'],
  },
];

const timeline = [
  {
    role: 'Senior AI Engineer',
    company: 'Lumina Labs',
    period: '2022 — Present',
    summary:
      'Led a team of 5 to ship a retrieval-augmented assistant for enterprise knowledge, reducing support ticket resolution time by 37%.',
    tags: ['LLM pipelines', 'Vector search', 'Team leadership'],
  },
  {
    role: 'AI Engineer',
    company: 'Orbit Analytics',
    period: '2020 — 2022',
    summary:
      'Built automated anomaly detection across 2B+ sensor events per day, powering predictive maintenance for smart manufacturing clients.',
    tags: ['Streaming ML', 'MLOps', 'Edge deployment'],
  },
  {
    role: 'Research Assistant',
    company: 'University of Nottingham',
    period: '2018 — 2020',
    summary:
      'Published research on interpretable reinforcement learning for healthcare decision support systems.',
    tags: ['Research', 'RL', 'Explainability'],
  },
];

const featuredProjects = [
  {
    name: 'Aurora Dialogue Engine',
    description:
      'Composable orchestration framework for building retrieval-augmented LLM applications with evaluation-first workflows.',
    topics: ['TypeScript', 'LangChain', 'Pinecone'],
    stars: 142,
    forks: 18,
    url: 'https://github.com/alextaylor-ai/aurora-dialogue-engine',
    homepage: 'https://aurora.alextaylor.ai',
  },
  {
    name: 'Sentinel Vision',
    description: 'Real-time computer vision system that monitors safety compliance on industrial floors with privacy preserving techniques.',
    topics: ['Python', 'PyTorch', 'OpenCV'],
    stars: 96,
    forks: 11,
    url: 'https://github.com/alextaylor-ai/sentinel-vision',
  },
  {
    name: 'Eunoia Metrics',
    description: 'Lightweight observability toolkit that tracks model drift, bias, and impact metrics across ML product teams.',
    topics: ['Go', 'gRPC', 'React'],
    stars: 73,
    forks: 9,
    url: 'https://github.com/alextaylor-ai/eunoia-metrics',
  },
];

const GITHUB_USERNAME = profile.github;
const projectsGrid = document.getElementById('projectsGrid');
const githubNote = document.getElementById('githubNote');
const skillsGrid = document.getElementById('skillsGrid');
const coreStrengthsList = document.getElementById('coreStrengths');
const timelineList = document.getElementById('timelineList');
const githubLink = document.getElementById('githubLink');
const yearEl = document.getElementById('year');
const scrollTopButton = document.getElementById('scrollTop');
const themeToggle = document.getElementById('themeToggle');

const prefersLightScheme = window.matchMedia('(prefers-color-scheme: light)');

function hydrateProfile() {
  document.title = `${profile.name} | ${profile.headline}`;
  document.getElementById('heroName').textContent = profile.name;
  document.getElementById('heroSubtitle').textContent = profile.heroSubtitle;
  githubLink.href = `https://github.com/${profile.github}`;
  githubLink.textContent = `github.com/${profile.github}`;
  yearEl.textContent = new Date().getFullYear();

  coreStrengthsList.innerHTML = profile.strengths
    .map((strength) => `<li class="tag">${strength}</li>`)
    .join('');
}

function renderSkillGroups(groups) {
  skillsGrid.innerHTML = groups
    .map(
      (group) => `
        <article class="skill-card reveal">
          <h3>${group.title}</h3>
          <ul>
            ${group.items.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </article>
      `
    )
    .join('');
}

function renderTimeline(items) {
  timelineList.innerHTML = items
    .map(
      (item) => `
        <li class="timeline__item reveal">
          <span class="timeline__meta">${item.period}</span>
          <h3 class="timeline__title">${item.role} · ${item.company}</h3>
          <p class="timeline__summary">${item.summary}</p>
          <div class="timeline__tags">
            ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </li>
      `
    )
    .join('');
}

function createProjectCard(project) {
  const topics = project.topics || [];
  const homepageLink = project.homepage
    ? `<a href="${project.homepage}" target="_blank" rel="noreferrer noopener">Live demo</a>`
    : '';

  return `
    <article class="project-card reveal">
      <div>
        <h3>${project.name}</h3>
        <p>${project.description || 'A project from my GitHub showcase.'}</p>
      </div>
      <div class="project-meta">
        <span>★ ${project.stargazers_count ?? project.stars ?? 0}</span>
        <span>⑂ ${project.forks_count ?? project.forks ?? 0}</span>
        ${project.language ? `<span>${project.language}</span>` : ''}
      </div>
      <div class="project-tags">
        ${topics.map((topic) => `<span class="project-tag">${topic}</span>`).join('')}
      </div>
      <div class="project-links">
        <a href="${project.html_url ?? project.url}" target="_blank" rel="noreferrer noopener">Repository</a>
        ${homepageLink}
      </div>
    </article>
  `;
}

async function fetchProjects() {
  githubNote.textContent = 'Fetching projects from GitHub…';
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }
    const repositories = await response.json();
    const curated = repositories
      .filter((repo) => !repo.fork)
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 6);

    if (curated.length === 0) {
      projectsGrid.innerHTML = featuredProjects.map(createProjectCard).join('');
      githubNote.textContent = `No public repositories found for ${GITHUB_USERNAME}. Showing featured work.`;
      return;
    }

    projectsGrid.innerHTML = curated.map(createProjectCard).join('');
    githubNote.innerHTML = `Showing top ${curated.length} repositories for <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noreferrer noopener">@${GITHUB_USERNAME}</a>.`;
  } catch (error) {
    projectsGrid.innerHTML = featuredProjects.map(createProjectCard).join('');
    githubNote.textContent = `Using curated highlights while we reconnect to GitHub. (${error.message})`;
  }
}

function setupScrollToTop() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 420) {
      scrollTopButton.classList.add('scroll-top--visible');
    } else {
      scrollTopButton.classList.remove('scroll-top--visible');
    }
  });

  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function setupRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

function setupThemeToggle() {
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('theme');
  const initialTheme = storedTheme || (prefersLightScheme.matches ? 'light' : 'dark');

  if (initialTheme === 'light') {
    root.setAttribute('data-theme', 'light');
  }

  themeToggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });
}

hydrateProfile();
renderSkillGroups(skillGroups);
renderTimeline(timeline);
fetchProjects();
setupScrollToTop();
setupRevealAnimations();
setupThemeToggle();
