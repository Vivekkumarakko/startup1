import React from 'react';
import { Zap, Mail, MessageCircle, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    platform: [
      { name: 'Problem Board', href: '#problems' },
      { name: 'How It Works', href: '#how-it-works' },
      { name: 'Success Stories', href: '#testimonials' },
      { name: 'Pricing', href: '#pricing' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Blog', href: '#blog' },
      { name: 'Press Kit', href: '#press' }
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Contact Us', href: '#contact' },
      { name: 'System Status', href: '#status' },
      { name: 'Bug Reports', href: '#bugs' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' }
    ]
  };

  const socialLinks = [
    { icon: MessageCircle, href: '#discord', name: 'Discord', color: 'hover:text-indigo-400' },
    { icon: Instagram, href: '#instagram', name: 'Instagram', color: 'hover:text-pink-400' },
    { icon: Linkedin, href: '#linkedin', name: 'LinkedIn', color: 'hover:text-blue-400' }
  ];

  return (
    <footer className="bg-[#002D62] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Zap className="h-8 w-8 text-[#DAA520]" />
                  <div className="absolute inset-0 h-8 w-8 bg-[#DAA520] opacity-20 rounded-full blur-sm"></div>
                </div>
                <span className="text-2xl font-bold">Problinx</span>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Connecting problem-solvers with real-world challenges and meaningful career opportunities. 
                Solve problems, earn tokens, get hired.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-[#DAA520]" />
                  <a href="mailto:support@problinx.com" className="text-gray-300 hover:text-white transition-colors duration-300">
                    support@problinx.com
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`p-3 bg-white/10 rounded-lg transition-all duration-300 ${social.color} hover:bg-white/20 hover:scale-110`}
                      aria-label={social.name}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Links Sections */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:col-span-3">
              {/* Platform */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#DAA520]">Platform</h3>
                <ul className="space-y-3">
                  {footerLinks.platform.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#DAA520]">Company</h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support & Legal */}
              <div className="col-span-2 lg:col-span-1 space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-[#DAA520]">Support</h3>
                  <ul className="space-y-3">
                    {footerLinks.support.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-gray-300 hover:text-white transition-colors duration-300"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-[#DAA520]">Legal</h3>
                  <ul className="space-y-3">
                    {footerLinks.legal.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Problinx. All rights reserved. Building the future of merit-based hiring.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Made with ❤️ for problem-solvers worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;