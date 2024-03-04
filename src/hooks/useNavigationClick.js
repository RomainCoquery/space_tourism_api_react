import { useEffect } from 'react';

const useNavigationClick = (callback) => {
    useEffect(() => {
        const navigationSection = document.querySelector('.main');

        const handleClick = (event) => {
            if (event.target.classList.contains('button')) {
                const nameResult = event.target.dataset.name;
                callback(nameResult);
            }
        };

        navigationSection.addEventListener('click', handleClick);

        return () => {
            navigationSection.removeEventListener('click', handleClick);
        };
    }, [callback]);
};

export default useNavigationClick;