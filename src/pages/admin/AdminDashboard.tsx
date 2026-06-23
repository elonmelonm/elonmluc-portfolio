import { useState } from 'react';
import { LogOut, FolderGit2, Briefcase, GraduationCap, Award, BarChart3, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../../components/ThemeToggle';
import ProjectsManager from '../../components/admin/ProjectsManager';
import ExperiencesManager from '../../components/admin/ExperiencesManager';
import EducationsManager from '../../components/admin/EducationsManager';
import CertificationsManager from '../../components/admin/CertificationsManager';
import SettingsManager from '../../components/admin/SettingsManager';
import StatsView from '../../components/admin/StatsView';

type Tab = 'projects' | 'experiences' | 'educations' | 'certifications' | 'cv' | 'stats';

const tabs: { id: Tab; label: string; icon: typeof FolderGit2 }[] = [
  { id: 'projects', label: 'Projets', icon: FolderGit2 },
  { id: 'experiences', label: 'Expériences', icon: Briefcase },
  { id: 'educations', label: 'Éducation', icon: GraduationCap },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'cv', label: 'CV', icon: FileText },
  { id: 'stats', label: 'Statistiques', icon: BarChart3 },
];

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('projects');

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <header className="border-b border-secondary/10 dark:border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black text-secondary dark:text-white">Espace admin</h1>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-red-500"
            >
              <LogOut size={16} /> Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
                tab === t.id
                  ? 'bg-primary text-white'
                  : 'text-gray-500 hover:text-primary bg-secondary/5 dark:bg-white/5'
              }`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        {tab === 'projects' && <ProjectsManager />}
        {tab === 'experiences' && <ExperiencesManager />}
        {tab === 'educations' && <EducationsManager />}
        {tab === 'certifications' && <CertificationsManager />}
        {tab === 'cv' && <SettingsManager />}
        {tab === 'stats' && <StatsView />}
      </div>
    </div>
  );
}
