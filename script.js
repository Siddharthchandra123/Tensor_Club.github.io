document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // God-Level Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing if you only want it to happen once
                // observer.unobserve(entry.target);
            } else {
                // Optional: remove class to animate out when scrolling back up
                // entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));

    // Neural Sandbox Terminal Logic
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutputContainer = document.getElementById('terminal-output-container');
    const terminalBody = document.getElementById('terminal-body');

    if (terminalInput) {
        terminalBody.addEventListener('click', () => {
            terminalInput.focus();
        });

        const commands = {
            help: `Available commands:
  <span class="highlight">about</span>   - Learn about the Tensor neural network
  <span class="highlight">join</span>    - How to become a node in our network
  <span class="highlight">matrix</span>  - Initialize visual protocols
  <span class="highlight">tensor</span>  - Core directives
  <span class="highlight">whoami</span>  - User identification
  <span class="highlight">clear</span>   - Clear terminal output`,
            about: "Tensor is the premier hub for tech enthusiasts, developers, and visionaries. We are the builders of tomorrow.",
            join: "Recruitment protocols are currently <span class='highlight'>ACTIVE</span>. Attend our upcoming sessions.",
            matrix: "Wake up, Neo... \nThe Matrix has you... \nFollow the white rabbit.",
            tensor: `<span class="ascii-art">
  _______ ______ _   _  _____  ____  _____  
 |__   __|  ____| \\ | |/ ____|/ __ \\|  __ \\ 
    | |  | |__  |  \\| | (___ | |  | | |__) |
    | |  |  __| | . \` |\\___ \\| |  | |  _  / 
    | |  | |____| |\\  |____) | |__| | | \\ \\ 
    |_|  |______|_| \\_|_____/ \\____/|_|  \\_\\
</span>`,
            whoami: "guest@tensor: unauthenticated user with curious intentions."
        };

        terminalInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                const command = this.value.trim().toLowerCase();

                // Echo command
                const echo = document.createElement('p');
                echo.className = 'terminal-output';
                echo.innerHTML = `<span class="prompt">guest@tensor:~$</span> ${this.value}`;
                terminalOutputContainer.appendChild(echo);

                // Handle command
                if (command === 'clear') {
                    terminalOutputContainer.innerHTML = '';
                } else if (command !== '') {
                    const response = document.createElement('p');
                    response.className = 'terminal-output';
                    if (commands[command]) {
                        response.innerHTML = commands[command].replace(/\\n/g, '<br>');
                    } else {
                        response.innerHTML = `<span class="error">Command not found: ${command}. Type 'help' for available commands.</span>`;
                    }
                    terminalOutputContainer.appendChild(response);
                }

                // Reset and scroll
                this.value = '';
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
    }
});
