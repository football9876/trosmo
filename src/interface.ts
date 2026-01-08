export interface User {
  id?: string;
  userid?: string;
  docId?: string;
  username: string;
  password: string;
  email?: string;
  fullName?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  dateOfBirth?: string;
  gender?: string;
  role?: string;
  isBlocked?: boolean;
  isBanned?: string;
  isAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
  profileImage?: string;
  profilePic?: string;
  registrationCompleted?: boolean;
}

export interface Blog {
  id?: string;
  title: string;
  content: string;
  image?: string;
  author?: string;
  category?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  isPublished?: boolean;
}

export interface Match {
  id?: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time?: string;
  venue?: string;
  status?: 'upcoming' | 'live' | 'completed';
  competition?: string;
}

export interface Notification {
  id?: string;
  title: string;
  message: string;
  type?: 'info' | 'warning' | 'error' | 'success';
  userId?: string;
  isRead?: boolean;
  createdAt?: string;
}

export interface Gallery {
  id?: string;
  title: string;
  images: string[];
  description?: string;
  category?: string;
  createdAt?: string;
}

export interface Video {
  id?: string;
  title: string;
  url: string;
  thumbnail?: string;
  description?: string;
  category?: string;
  createdAt?: string;
}

export interface Cloth {
  id?: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
  category?: string;
  inStock?: boolean;
}

export interface FormSubmission {
  id?: string;
  formType: string;
  data: Record<string, any>;
  submittedAt?: string;
  status?: 'pending' | 'reviewed' | 'approved' | 'rejected';
}
