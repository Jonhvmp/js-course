import { Variants } from 'framer-motion';

// Animações para componentes de cards
export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.320, 1]
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  }
};

// Animações para listas de produtos
export const listVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Animações para o carrinho
export const cartVariants: Variants = {
  hidden: {
    opacity: 0,
    x: '100%'
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300
    }
  },
  exit: {
    opacity: 0,
    x: '100%',
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

// Animações para items do carrinho
export const cartItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    x: 20,
    scale: 0.8,
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  }
};

// Animações para botões
export const buttonVariants: Variants = {
  idle: {
    scale: 1
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: 'easeIn'
    }
  }
};

// Animações para contador
export const counterVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300
    }
  },
  pulse: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

// Animações para modal/overlay
export const overlayVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  }
};

// Animações para badge/notification
export const badgeVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 400
    }
  },
  bounce: {
    scale: [1, 1.3, 1],
    transition: {
      duration: 0.4,
      ease: 'easeInOut'
    }
  }
};

// Animações para página
export const pageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.320, 1],
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: 'easeInOut'
    }
  }
};

// Transições personalizadas
export const springTransition = {
  type: 'spring' as const,
  damping: 25,
  stiffness: 300
};

export const smoothTransition = {
  duration: 0.3,
  ease: [0.23, 1, 0.320, 1] as const
};

export const quickTransition = {
  duration: 0.15,
  ease: 'easeOut' as const
};
