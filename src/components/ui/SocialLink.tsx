import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Instagram, MessageCircle, ArrowUpRight } from 'lucide-react';

interface SocialLinkProps {
  id: string;
  name: string;
  url: string;
}

export const SocialLink: React.FC<SocialLinkProps> = ({ id, name, url }) => {
  const getIcon = () => {
    switch (id) {
      case 'github':
        return <Github size={16} strokeWidth={1.5} className="text-neutral-700" />;
      case 'linkedin':
        return <Linkedin size={16} strokeWidth={1.5} className="text-neutral-700" />;
      case 'instagram':
        return <Instagram size={16} strokeWidth={1.5} className="text-neutral-700" />;
      case 'whatsapp':
        return <MessageCircle size={16} strokeWidth={1.5} className="text-neutral-700" />;
      default:
        return null;
    }
  };

  return (
    <motion.a
      id={`social-link-${id}`}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between py-2 border-b border-neutral-200/60 hover:border-neutral-800 transition-colors duration-300 w-44 md:w-52"
      initial="initial"
      whileHover="hover"
    >
      <div className="flex items-center gap-3">
        {getIcon()}
        <span className="text-sm text-neutral-600 group-hover:text-neutral-900 font-sans tracking-wide transition-colors duration-300">
          {name}
        </span>
      </div>
      <motion.div
        variants={{
          initial: { x: 0, y: 0 },
          hover: { x: 3, y: -3 },
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 15 }}
      >
        <ArrowUpRight size={14} strokeWidth={1.5} className="text-neutral-400 group-hover:text-neutral-800 transition-colors duration-300" />
      </motion.div>
    </motion.a>
  );
};
