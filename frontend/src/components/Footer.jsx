import React from 'react';
import { Github, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    const subject = encodeURIComponent(`Message from ${name} via my Notes App`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    window.location.href = `mailto:hafizismail298@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <footer className="w-full bg-base-300 text-white py-8 border-t border-neutral-800">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left mb-8">
          {/* Section 1 (Left): my Notes + Social Icons */}
          <div>
            <h3 className="text-3xl font-bold text-lime-400 mb-4">my Notes</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">Effortless note-taking with a modern, clean, and responsive interface. Built with the MERN stack for a delightful user experience.</p>
            {/* Social Icons */}
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://github.com/MLAPrince" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-lime-400 transition-colors duration-200">
                <Github className="w-7 h-7" />
              </a>
              <a href="https://www.linkedin.com/in/mohiudeen-52bb35175" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-lime-400 transition-colors duration-200">
                <Linkedin className="w-7 h-7" />
              </a>
            </div>
          </div>

          {/* Section 2 (Middle): My Projects */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">My Projects</h3>
            <ul className="space-y-3">
              <li><a href="https://mohiuddin-portfolio1.netlify.app" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-lime-400 transition-colors duration-200">Portfolio</a></li>
              <li><a href="https://mlapass.netlify.app" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-lime-400 transition-colors duration-200">MLA Pass (Password Manager)</a></li>
              <li><a href="https://mla-spotify-clone.netlify.app" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-lime-400 transition-colors duration-200">My Spotify Clone</a></li>
              <li><a href="https://mla-todo-app.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-lime-400 transition-colors duration-200">My Todo App</a></li>
            </ul>
          </div>

          {/* Section 3 (Right): Contact Form */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Me</h3>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="mb-4">
                <input type="text" name="name" placeholder="Your Name" className="input input-bordered w-full bg-base-500 text-white border-neutral-700 focus:border-lime-400" required />
              </div>
              <div className="mb-4">
                <input type="email" name="email" placeholder="Your Email" className="input input-bordered w-full bg-base-500 text-white border-neutral-700 focus:border-lime-400" required />
              </div>
              <div className="mb-4">
                <textarea name="message" placeholder="Your Message" className="textarea textarea-bordered w-full bg-base-500 text-white border-neutral-700 focus:border-lime-400 h-24" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full bg-lime-600 hover:bg-lime-700 text-white border-none">Send Message</button>
            </form>
            <p className="text-gray-500 text-xs mt-2">Note: This form will open your email client to send the message.</p>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-neutral-800 pt-7">
          <div className="text-center text-gray-500 text-sm">
            my Notes &copy; {currentYear} Made with <Heart className="inline-block w-4 h-4 text-red-500 mx-1" /> by Muhammad Mohiuddin. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;