export type Channel =
  | 'phone'
  | 'sms'
  | 'whatsapp'
  | 'instagram'
  | 'facebook'
  | 'googleReview'
  | 'email';

export type BusinessType = 'restaurant' | 'bar' | 'grocery' | 'solo';
export type Tone = 'warm' | 'pro' | 'casual' | 'direct';
export type Plan = 'decouverte' | 'performance' | 'premium';
export type Language = 'fr' | 'en' | 'creole' | 'lingala' | 'soussou';

export type Provider =
  | 'facebook'
  | 'instagram'
  | 'google'
  | 'whatsapp'
  | 'twilio'
  | 'stripe'
  | 'gmail'
  | 'outlook'
  | 'calendly';

export type Business = {
  id: string;
  name: string;
  type: BusinessType;
  address: string;
  hours: Record<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun', string>;
  services: string[];
  tone: Tone;
  languages: Language[];
  connectedAccounts: Record<Provider, boolean>;
  plan: Plan;
  trialEndsAt: string;
};

export type PostStatus = 'draft' | 'queued' | 'scheduled' | 'published' | 'failed';
export type Post = {
  id: string;
  caption: string;
  imageUrl: string;
  channels: ('facebook' | 'instagram')[];
  status: PostStatus;
  scheduledAt?: string;
  publishedAt?: string;
  engagement?: { likes: number; comments: number; reach: number };
  template?: string;
};

export type Message = {
  id: string;
  from: 'customer' | 'business' | 'ai';
  text: string;
  timestamp: string;
};

export type Conversation = {
  id: string;
  channel: Channel;
  customerName: string;
  avatarSeed?: string;
  unread: number;
  lastMessage: string;
  lastTimestamp: string;
  messages: Message[];
  customerId?: string;
};

export type Call = {
  id: string;
  caller: string;
  number: string;
  durationSec: number;
  intent: string;
  handledBy: 'ai' | 'transferred';
  timestamp: string;
  transcript?: string[];
};

export type Review = {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  snippet: string;
  draftReply: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
};

export type CustomerSource = 'phone' | 'social' | 'walkIn' | 'referral' | 'import';
export type Customer = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  source: CustomerSource;
  tags: string[];
  lastContactChannel?: Channel;
  lastContactAt?: string;
  notes?: string;
  history?: { id: string; type: string; text: string; at: string }[];
};

export type Usage = {
  posts: { used: number; limit: number };
  calls: { used: number; limit: number };
  sms: { used: number; limit: number };
  ai: { used: number; limit: number };
  periodStart: string;
  periodEnd: string;
};

export type DecisionReport = {
  id: string;
  weekStart: string;
  weekEnd: string;
  trend: { summary: string; series: number[] };
  wins: string[];
  issues: string[];
  actions: { id: string; text: string; done: boolean }[];
};

export type Notification = {
  id: string;
  title: string;
  body: string;
  at: string;
  read: boolean;
  kind: 'post' | 'call' | 'review' | 'customer' | 'report';
};

export type Toast = {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'danger' | 'warning';
};
