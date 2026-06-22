-- Seed des contenus existants (à exécuter une fois dans le SQL editor Supabase).
--
-- IMPORTANT — images :
--   1. Uploade les fichiers de src/assets/projetsImg/ dans le bucket `project-images`
--      EN GARDANT LES MÊMES NOMS DE FICHIERS.
--   2. Remplace ci-dessous khztouqhnwjdpjcbqfce par la référence de ton projet Supabase
--      (find & replace). L'URL publique a la forme :
--      https://khztouqhnwjdpjcbqfce.supabase.co/storage/v1/object/public/project-images/<fichier>

-- ---------------- Projects ----------------
insert into public.projects
  (title_en, title_fr, desc_en, desc_fr, technologies, images, github_link, live_link, category, display_order)
values
  ('DEVLAB 2025', 'DEVLAB 2025',
   'Hackathon 2025 : developing an open source solution for mass payment of retirement pensions by integrating Mojaloop APIs',
   'Hackathon 2025 : développer une solution open source de paiement en masse des pensions de retraite en intégrant les API Mojaloop',
   ARRAY['Vue.js','Tailwind CSS','Framer-motion','Pinia','Node.js','Mojaloop'],
   ARRAY['https://khztouqhnwjdpjcbqfce.supabase.co/storage/v1/object/public/project-images/devlab-2025.png',
         'https://khztouqhnwjdpjcbqfce.supabase.co/storage/v1/object/public/project-images/me-devlav-2025.jpg'],
   'https://github.com/elonmelonm/devlab-2025-result', null, 'Web', 1),

  ('AI Hackathon 2025', 'Hackathon IA 2025',
   'AI Hackathon 2025: AI Challenge and land data: developing AI solutions for land management',
   'Hackathon IA 2025 : Challenge IA et données foncières : développer des solutions IA au service du foncier',
   ARRAY['React.js','Tailwind CSS','Framer-motion','FastApi'],
   ARRAY['https://khztouqhnwjdpjcbqfce.supabase.co/storage/v1/object/public/project-images/hackathon-ia-2025.png'],
   'https://github.com/elonmelonm/les_mentats-luxdev-hackaton-ia-2025',
   'https://les-mentats-luxdev-hackaton-ia-2025.vercel.app/', 'Web', 2),

  ('The French Tototte App', 'Application The French Tototte',
   'Creation of The French Tototte website during the Figma To Code challenge',
   'Création du site The French Tototte lors du défi Figma To Code',
   ARRAY['React.js','Tailwind CSS','Framer-motion','Figma'],
   ARRAY['https://khztouqhnwjdpjcbqfce.supabase.co/storage/v1/object/public/project-images/ftc-w4-elonm.png'],
   'https://github.com/elonmelonm/ftc-w4-elonm.git',
   'https://ftc-w4-elonm.vercel.app/', 'Web', 3),

  ('Monito App', 'Application Monito',
   'Creation of a Monito application during the Figma To Code challenge',
   'Création d''une application Monito lors du défi Figma To Code',
   ARRAY['React.js','Tailwind CSS','Framer-motion','Figma'],
   ARRAY['https://khztouqhnwjdpjcbqfce.supabase.co/storage/v1/object/public/project-images/ftc-w3-elonm.png'],
   'https://github.com/elonmelonm/FTC-W3-ELONM.git',
   'https://ftc-w3-elonm.vercel.app/', 'Web', 4),

  ('Spending Management Landing Page', 'Page de Destination Gestion des Dépenses',
   'Creation of a landing page for expense management during the Figma To Code challenge',
   'Création d''une page de destination pour la gestion des dépenses lors du défi Figma To Code',
   ARRAY['React.js','Tailwind CSS'],
   ARRAY['https://khztouqhnwjdpjcbqfce.supabase.co/storage/v1/object/public/project-images/ftc-w2-elonm.png'],
   'https://github.com/elonmelonm/spending-management-landing-page.git',
   'https://ftc-w2-elonm.vercel.app/', 'Web', 5),

  ('SaaS Futuristic App', 'Application SaaS Futuriste',
   'Creation of a futuristic SaaS application during the Figma To Code challenge',
   'Création d''une application SaaS futuriste lors du défi Figma To Code',
   ARRAY['React.js','Tailwind CSS'],
   ARRAY['https://khztouqhnwjdpjcbqfce.supabase.co/storage/v1/object/public/project-images/ftc-w1-elonm.png'],
   'https://github.com/elonmelonm/SaaS-Futuristic-App.git',
   'https://ftc-w1-elonm.vercel.app/', 'Web', 6),

  ('Budget Management App', 'Application de Gestion de Budget',
   'A budget management application to manage your wallet',
   'Une application de gestion de budget pour gérer votre portefeuille',
   ARRAY['Next.js','Tailwind CSS','Node.js','MySql'],
   ARRAY['https://khztouqhnwjdpjcbqfce.supabase.co/storage/v1/object/public/project-images/budget-management.png'],
   'https://github.com/elonmelonm/BudgetManagement.git',
   'https://budget-management-liard.vercel.app/', 'Web', 7),

  ('Task Management App', 'Application de Gestion de Tâches',
   'Task management application with collaborative features',
   'Application de gestion de tâches avec fonctionnalités collaboratives',
   ARRAY['React.js','Tailwind CSS','Django','PostgreSql'],
   ARRAY['https://khztouqhnwjdpjcbqfce.supabase.co/storage/v1/object/public/project-images/todoapp.png'],
   'https://github.com/elonmelonm/Todo-App.git',
   'https://elonm-todo-app.vercel.app/', 'Web', 8),

  ('Fresh Fruits', 'Fresh Fruits',
   'Landing page for selling fresh fruits',
   'Page de destination pour la vente de fruits frais',
   ARRAY['React.js','Framer-motion'],
   ARRAY['https://khztouqhnwjdpjcbqfce.supabase.co/storage/v1/object/public/project-images/freshfruits.png'],
   'https://github.com/elonmelonm/fresh-fruits.git',
   'https://fruits-selling-elm.netlify.app/', 'Web', 9),

  ('E-learning website', 'Site de E-learning',
   'Landing page for an e-learning site',
   'Page de destination pour un site de e-learning',
   ARRAY['React.js','Framer-motion'],
   ARRAY['https://khztouqhnwjdpjcbqfce.supabase.co/storage/v1/object/public/project-images/e-learning.png'],
   'https://github.com/elonmelonm/e-learning.git',
   'https://thecodingjourney-elm.netlify.app/', 'Web', 10),

  ('Smith Portfolio', 'Portfolio Smith',
   'Smith portfolio',
   'Portfolio de Smith',
   ARRAY['React.js','CSS'],
   ARRAY['https://khztouqhnwjdpjcbqfce.supabase.co/storage/v1/object/public/project-images/smithportfolio.png'],
   'https://github.com/elonmelonm/e-learning.git',
   'https://smith-portfolio-elm.netlify.app/', 'Web', 11),

  ('Construction website', 'Site de Construction',
   'Landing page for a construction site',
   'Page de destination pour un site de construction',
   ARRAY['React.js','Tailwind CSS'],
   ARRAY['https://khztouqhnwjdpjcbqfce.supabase.co/storage/v1/object/public/project-images/construction.png'],
   'https://github.com/elonmelonm/construction-website.git',
   'https://construction-site-elm.netlify.app/', 'Web', 12);

-- ---------------- Experiences ----------------
insert into public.experiences
  (period_en, period_fr, title_en, title_fr, company, desc_en, desc_fr, display_order)
values
  ('May - Today 2025', 'Mai - Aujourd''hui 2025',
   'Full Stack Mobile Developer', 'Développeur Mobile Full Stack', 'Marktech',
   'Full Stack Mobile developer at Marktech', 'Développeur Mobile Full Stack chez Marktech', 1),

  ('February - April 2025', 'Février - Avril 2025',
   'Full Stack Web Developer', 'Développeur Web Full Stack', '10-20 Technologies',
   'Web developer consultant at 10-20 Technologies', 'Consultant développeur web chez 10-20 Technologies', 2),

  ('September - December 2024', 'Septembre - Décembre 2024',
   'Full Stack Developer Training', 'Formation Développeur Full Stack', 'Holding Bourjon Investment',
   'TechSeed Academy Training financed by the Labourd Foundation', 'Formation TechSeed Academy financée par la Fondation Labourd', 3),

  ('August 2024', 'Août 2024',
   'Web development intern', 'Stagiaire en développement web', '3d tech africa',
   'Intern at 3d tech africa in frontend development', 'Stagiaire chez 3d tech africa en développement frontend', 4),

  ('Frebruary - May 2023', 'Février - Mai 2023',
   'Web development intern', 'Stagiaire en développement web', 'TPAPY EDUCATIONAL CONSULT',
   'Academic internship in Web development', 'Stage académique en développement Web', 5);

-- ---------------- Educations ----------------
insert into public.educations
  (period, title_en, title_fr, company, desc_en, desc_fr, display_order)
values
  ('2020-2023', 'Bachelor degree', 'Licence', 'Les Cours SONOU Institute',
   'Bachelor degree cycle in Software computer science', 'Cycle de licence en informatique logicielle', 1),

  ('2020', 'Bac', 'Bac', '',
   'Baccalaureate exam', 'Examen du baccalauréat', 2);
