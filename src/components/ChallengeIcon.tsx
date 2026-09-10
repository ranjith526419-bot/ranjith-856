import {
  Droplets,
  Bug,
  ScanEye,
  CloudSun,
  TrendingUp,
  FlaskConical,
  Users,
  Warehouse,
  Sprout,
  LucideProps,
} from 'lucide-react';

interface ChallengeIconProps {
  name: string;
  className?: string;
  size?: number | string;
}

export function ChallengeIcon({ name, className = 'w-6 h-6', ...props }: ChallengeIconProps) {
  switch (name) {
    case 'Droplets':
      return <Droplets className={className} {...props} />;
    case 'Bug':
      return <Bug className={className} {...props} />;
    case 'ScanEye':
      return <ScanEye className={className} {...props} />;
    case 'CloudSun':
      return <CloudSun className={className} {...props} />;
    case 'TrendingUp':
      return <TrendingUp className={className} {...props} />;
    case 'FlaskConical':
      return <FlaskConical className={className} {...props} />;
    case 'Users':
      return <Users className={className} {...props} />;
    case 'Warehouse':
      return <Warehouse className={className} {...props} />;
    default:
      return <Sprout className={className} {...props} />;
  }
}
