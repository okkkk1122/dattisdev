'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Send, Instagram } from 'lucide-react';

const socialLinks = [
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    href: process.env.NEXT_PUBLIC_WHATSAPP_URL || '#',
    color: 'text-green-600 hover:bg-green-50',
  },
  {
    name: 'Telegram',
    icon: Send,
    href: process.env.NEXT_PUBLIC_TELEGRAM_URL || '#',
    color: 'text-blue-500 hover:bg-blue-50',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#',
    color: 'text-pink-600 hover:bg-pink-50',
  },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center space-x-2 space-x-reverse">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-lg transition-colors ${social.color}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={social.name}
          >
            <Icon size={20} />
          </motion.a>
        );
      })}
    </div>
  );
}



