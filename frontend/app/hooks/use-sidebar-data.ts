import { useState, useEffect } from 'react';
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map as MapIcon,
  PieChart,
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

export interface SidebarUser {
  name: string;
  email: string;
  avatar: string;
}

export interface SidebarCategory {
  name: string;
  logo: LucideIcon;
}

export interface SidebarItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

export interface SidebarData {
  user: SidebarUser;
  categories: SidebarCategory[];
  items: SidebarItem[];
}

// Mock data that matches your original structure
const mockSidebarData: SidebarData = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  categories: [
    {
      name: 'Main Pages',
      logo: GalleryVerticalEnd,
    },
    {
      name: 'Components',
      logo: AudioWaveform,
    },
    {
      name: 'Settings',
      logo: Command,
    },
  ],
  items: [
    {
      name: 'Page 1',
      url: '/page1',
      icon: Frame,
    },
    {
      name: 'Page 2',
      url: '/page2',
      icon: PieChart,
    },
    {
      name: 'Page 3',
      url: '/page3',
      icon: MapIcon,
    },
  ],
};

export function useSidebarData() {
  const [data, setData] = useState<SidebarData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      try {
        // In a real implementation, you would fetch from API here
        // For now, we're just using the mock data
        setData(mockSidebarData);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('An unknown error occurred')
        );
      } finally {
        setLoading(false);
      }
    }, 500); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  return { data, loading, error };
}
