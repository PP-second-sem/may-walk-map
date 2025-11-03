import './Navigation.css';

const Navigation = () => {
    return (
        <nav className='nav'>
            <ul className='nav__list'>
                <li className='nav__item'>
                    <a href='#'>Главная</a>
                </li>

                <li className='nav__item'>
                    <a href='#'>О прогулке</a>
                </li>

                <li className='nav__item'>
                    <a href='#'>Архив</a>
                </li>

                <li className='nav__item'>
                    <a href='#'>Вход</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;