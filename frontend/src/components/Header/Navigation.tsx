import './Navigation.css';

const Navigation = () => {
    const menuItems = {
        'about': [
            { label: 'Участникам', href: '#' },
            { label: 'Место старта', href: '#' },
            { label: 'Описание маршрутов', href: '#' },
            { label: 'Выдача карт', href: '#' },
            { label: 'Правила пожарной безопасности в лесу', href: '#' },
            { label: 'Частые вопросы', href: '#' },
            { label: 'Советы в дорогу участникам прогулки', href: '#' },
            { label: 'Организаторы', href: '#' },
        ],
        'archive': [
            { label: 'Маршруты', href: '#' },
            { label: 'Статистика прогулки', href: '#' },
            { label: 'Места', href: '#' },
            { label: 'Фалеристика', href: '#' },
            { label: 'Архив отзывов', href: '#' },
        ]
    };

    return (
        <nav className='nav'>
            <ul className='nav__list'>
                <li className='nav__item'>
                    <a href='https://mayprogulka.ru/'>Главная</a>
                </li>

                <li className='nav__item nav__item--dropdown'>
                    <a href='#'>О прогулке</a>
                    <div className="dropdown-menu">
                        <ul className="dropdown-list">
                            {menuItems.about.map((item, index) => (
                                <li key={index} className="dropdown-item">
                                    <a href={item.href}>{item.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </li>

                <li className='nav__item nav__item--dropdown'>
                    <a href='#'>Архив</a>
                    <div className="dropdown-menu">
                        <ul className="dropdown-list">
                            {menuItems.archive.map((item, index) => (
                                <li key={index} className="dropdown-item">
                                    <a href={item.href}>{item.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </li>

                <li className='nav__item'>
                    <a href='#'>Вход</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;