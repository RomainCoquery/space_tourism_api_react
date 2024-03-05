import { useState, useEffect } from 'react';

const useHamburgerClick = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleHamburgerClick = () => {
            const hamburger = document.getElementById('hamburger');
            const menu = document.getElementById('menu');

            setIsOpen(prevIsOpen => !prevIsOpen);

            if (hamburger) {
                hamburger.classList.toggle('open', !isOpen);
            }

            if (menu) {
                menu.classList.toggle('overlay', !isOpen);
            }
        };

        const hamburger = document.getElementById('hamburger');

        if (hamburger) {
            hamburger.addEventListener('click', handleHamburgerClick);
        }

        return () => {
            if (hamburger) {
                hamburger.removeEventListener('click', handleHamburgerClick);
            }
        };
    }, [isOpen]);

    return isOpen;
};

export default useHamburgerClick;