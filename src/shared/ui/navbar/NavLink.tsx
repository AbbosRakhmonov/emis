import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  inset: boolean;
}

export function NavLink({ children, href, icon, inset }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <ListItem disablePadding>
      <ListItemButton
        sx={{ pl: inset ? 4 : 2 }}
        selected={isActive}
        component={Link}
        href={href}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>{icon}</ListItemIcon>
        <ListItemText primary={children} />
      </ListItemButton>
    </ListItem>
  );
}
